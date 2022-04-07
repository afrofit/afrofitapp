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
import {
  setConfirmPasswordResetCodeSuccess,
  setCurrentUserResetToken,
} from '../user.slice';

export const verifyPasswordResetCodeApi = async (code: number) => {
  const AUTH_RESET_TOKEN = await DEVICE_STORAGE.GET_RESET_TOKEN();

  return await API_CLIENT.put(
    '/users/verify-password-reset-code',
    {code},
    {headers: {'x-auth-reset-token': AUTH_RESET_TOKEN}},
  );
};

export function verifyPasswordResetCode(code: number): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    dispatch(setConfirmPasswordResetCodeSuccess(false));

    verifyPasswordResetCodeApi(code)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const {data, ok} = response;
        if (data && ok) {
          dispatch(setConfirmPasswordResetCodeSuccess(true));
          DEVICE_STORAGE.STORE_RESET_TOKEN(data).then(() => {
            dispatch(setCurrentUserResetToken(data));
          });
        } else if (!ok) {
          dispatch(showGenericErrorDialog('Could not verify code. Retry?'));
          if (data) {
            console.error('Error', data);
          } else if (!data) {
            console.error('Error. Cannot verify code.');
          }
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
