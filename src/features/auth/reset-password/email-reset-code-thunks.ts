import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import DEVICE_STORAGE from '../../../api/device-storage';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setCurrentUserResetToken, setEmailResetSuccess} from '../user.slice';

export const emailPasswordResetCodeApi = (email: string) =>
  API_CLIENT.post('/users/send-reset-code', {email});

export function emailPasswordResetCode(email: string): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    dispatch(setEmailResetSuccess(false));
    emailPasswordResetCodeApi(email)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const {data, ok} = response;
        if (data && ok) {
          dispatch(setEmailResetSuccess(true));
          DEVICE_STORAGE.STORE_RESET_TOKEN(data).then(() => {
            dispatch(setCurrentUserResetToken(data));
          });
        } else if (!ok) {
          dispatch(showGenericErrorDialog('Could not verify you. Retry?'));
          if (data) {
            console.error('Error', data);
          } else if (!data) {
            console.error('Error. Cannot verify you.');
          }
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error.message);
      });
  };
}
