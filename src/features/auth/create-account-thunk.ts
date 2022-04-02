import {FieldValues} from 'react-hook-form';
import API_CLIENT from '../../api/api-client';
import {AppThunk} from '../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../ui/ui.slice';
import {setCurrentUserToken, setSignupSuccess} from './user.slice';
import DEVICE_STORAGE from '../../api/device-storage';
import {ApiResponse} from 'apisauce';

const createAccount = async (formData: FieldValues) => {
  console.log('Form Data', formData);
  const {email, password, username} = formData;
  return API_CLIENT.post('/users/create-account', {email, password, username});
};

export function createAccountThunk(formData: FieldValues): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    createAccount(formData)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const {data, ok} = response;
        if (data && ok) {
          DEVICE_STORAGE.STORE_TOKEN(data).then(() => {
            dispatch(setCurrentUserToken(data));
            dispatch(setSignupSuccess(true));
            return;
          });
        } else if (!ok && data) {
          return showGenericErrorDialog('An internal error occured!');
        } else {
          dispatch(showGenericErrorDialog("Can't create account. Retry?"));
          throw new Error('Cannot create account');
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
