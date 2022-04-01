import {FieldValues} from 'react-hook-form';
import API_CLIENT from '../../api/api-client';
import {AppThunk} from '../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../ui/ui.slice';
import {setCurrentUserToken, setVerifySuccess} from './user.slice';
import DEVICE_STORAGE from '../../api/device-storage';
import {ApiResponse} from 'apisauce';

const verifyUser = async (formData: FieldValues) => {
  console.log('Form Data', formData);
  const {code} = formData;
  return API_CLIENT.put('/users/verify-signup-code', {code: +code});
};

export function verifyUserThunk(formData: FieldValues): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    verifyUser(formData)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const {data, ok} = response;
        if (data && ok) {
          DEVICE_STORAGE.STORE_TOKEN(data).then(() => {
            dispatch(setCurrentUserToken(data));
            return dispatch(setVerifySuccess(true));
          });
        } else if (!ok && data) {
          showGenericErrorDialog('An internal error occured!');
        } else {
          dispatch(
            showGenericErrorDialog('There is a problem with you code. Retry?'),
          );
          throw new Error('Cannot create account');
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
