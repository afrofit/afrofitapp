import {ApiResponse} from 'apisauce';
import {FieldValues} from 'react-hook-form';
import API_CLIENT from '../../api/api-client';
import DEVICE_STORAGE from '../../api/device-storage';
import {AppThunk} from '../../store/store';
import {
  finishedRequest,
  hideGenericErrorDialog,
  newRequest,
  showGenericErrorDialog,
} from '../ui/ui.slice';
import {setChangeUsernameSuccess, setCurrentUser} from './user.slice';

type FormData = FieldValues;

export const logInApi = async (formData: FormData) => {
  const {email, password} = formData;
  return await API_CLIENT.post('/users/login', {email, password});
};

export function logIn(formData: FormData): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    logInApi(formData)
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
              dispatch(showGenericErrorDialog('Error logging you in.'));
            });
            return;
          });
        } else if (!ok) {
          dispatch(showGenericErrorDialog("Can't log you in. Retry?"));

          if (data) {
            console.error('Error', data);
          } else if (!data) {
            console.error('There was an error signing you in.');
          }
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
