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
import {setChangePasswordSuccess, setCurrentUserToken} from '../user.slice';

export const setNewPassword = async (password: string) =>
  API_CLIENT.post('/users/set-new-password', {password});

export function changeUserPassword(password: string): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    dispatch(setChangePasswordSuccess(false));

    setNewPassword(password)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const {data, ok} = response;
        if (data && ok) {
          dispatch(setChangePasswordSuccess(true));
          DEVICE_STORAGE.STORE_TOKEN(data).then(() => {
            dispatch(setCurrentUserToken(data));
          });
        } else if (!ok) {
          dispatch(
            showGenericErrorDialog("Can't change account password. Retry?"),
          );
          if (data) {
            console.error('Error', data);
          } else if (!data) {
            console.error('Error. Cannot change account password.');
          }
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
