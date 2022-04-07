import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setResendPasswordResetCodeSuccess} from '../user.slice';

export const resendEmailResetVerifyCodeApi = async (email: string) => {
  return API_CLIENT.post('/users/resend-reset-password-verify-code', {email});
};

export function resendEmailResetVerifyCode(email: string): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    dispatch(setResendPasswordResetCodeSuccess(false));

    resendEmailResetVerifyCodeApi(email)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const {data, ok} = response;
        if (data && ok) {
          dispatch(setResendPasswordResetCodeSuccess(true));
        } else if (!ok) {
          dispatch(showGenericErrorDialog('Could not resend code. Retry?'));
          if (data) {
            console.error('Error', data);
          } else if (!data) {
            console.error('Error. Cannot resend code.');
          }
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
