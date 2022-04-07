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
  const {code} = formData;
  return API_CLIENT.put('/users/verify-signup-code', {code: +code});
};

export function verifyUserThunk(formData: FieldValues): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    dispatch(setVerifySuccess(false));
    verifyUser(formData)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const {data, ok} = response;
        if (data && ok) {
          DEVICE_STORAGE.STORE_TOKEN(data).then(() => {
            // dispatch(setCurrentUserToken(data));
            dispatch(setVerifySuccess(true));
            return;
          });
        } else if (!ok) {
          dispatch(showGenericErrorDialog('Invalid code. Retry?'));
          if (data) {
            console.error('Error', data);
          } else if (!data) {
            console.error('An internal error occured!');
          }
        } else {
          throw new Error('Cannot verify code.');
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
