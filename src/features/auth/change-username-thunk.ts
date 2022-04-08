import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../api/api-client';
import DEVICE_STORAGE from '../../api/device-storage';
import {AppThunk} from '../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
  setIsSubmitting,
} from '../ui/ui.slice';
import {
  setChangeUsernameSuccess,
  setCurrentUser,
  setCurrentUserToken,
} from './user.slice';

export const changeUsernameApi = async (username: string) =>
  API_CLIENT.post('/users/change-username', {username});

export function changeUsername(username: string): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    dispatch(setChangeUsernameSuccess(false));
    changeUsernameApi(username)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const {data, ok} = response;
        if (data && ok) {
          DEVICE_STORAGE.STORE_TOKEN(data).then(() => {
            DEVICE_STORAGE.GET_STORED_USER().then(response => {
              if (response) {
                dispatch(setCurrentUser(response));
                return dispatch(setChangeUsernameSuccess(true));
              }
              dispatch(showGenericErrorDialog('Error changing username.'));
            });
            return;
          });
        } else if (!ok) {
          dispatch(showGenericErrorDialog('Error changing username.'));
          if (data) {
            console.error('Error', data);
          } else if (!data) {
            console.error('Error changing username');
          }
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog('Sorry. An unexpected error occured.'));
        console.error(error);
      });
  };
}
