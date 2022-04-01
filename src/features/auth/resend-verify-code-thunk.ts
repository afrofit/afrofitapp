import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../api/api-client';
import DEVICE_STORAGE from '../../api/device-storage';
import {AppThunk} from '../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../ui/ui.slice';
import {setResendVerifyCodeSuccess} from './user.slice';

const resendVerificationCode = async () => {
  const storedUser = await DEVICE_STORAGE.GET_STORED_USER();
  let email: string;
  email = storedUser ? storedUser.email : 'oooo@oooo.oooo';

  console.log('Called', email);

  return await API_CLIENT.post('/users/resend-verify-code', {
    email,
  });
};

export function resendUserVerificationCode(): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    dispatch(setResendVerifyCodeSuccess(false));
    resendVerificationCode()
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const {data, ok} = response;
        console.log(data, ok);
        if (data && ok) {
          dispatch(setResendVerifyCodeSuccess(true));
        } else if (!ok && data) {
          return showGenericErrorDialog('An internal error occured!');
        } else {
          dispatch(
            showGenericErrorDialog('There was an error resending code. Retry?'),
          );
          throw new Error('There was an error resending code.');
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog('Sorry. An unexpected error occured.'));
        console.error(error);
      });
  };
}
