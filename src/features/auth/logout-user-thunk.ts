import {FieldValues} from 'react-hook-form';
import API_CLIENT from '../../api/api-client';
import {AppThunk} from '../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../ui/ui.slice';
import {unsetCurrentUser} from './user.slice';
import DEVICE_STORAGE from '../../api/device-storage';

export function logoutUserThunk(): AppThunk {
  return dispatch => {
    dispatch(hideGenericErrorDialog());

    DEVICE_STORAGE.REMOVE_TOKEN()
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      })
      .then(() => {
        DEVICE_STORAGE.REMOVE_RESET_TOKEN;
      })
      .then(() => {
        dispatch(unsetCurrentUser());
      });
  };
}
