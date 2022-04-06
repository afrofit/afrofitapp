import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setUserMarathonScore} from '../marathon.slice';
import {UserMarathonTypes} from '../types/marathon.types';

const initializeCurrentUserMarathonData = () =>
  API_CLIENT.get('/marathon/initialize-user-marathon-activity');

export function initializeUserMarathonScore(): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    initializeCurrentUserMarathonData()
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const data: UserMarathonTypes = response.data;
        const ok: boolean = response.ok;

        if (data && ok) {
          // console.log("Marathon Initialized?", data);
          return dispatch(setUserMarathonScore(data));
        } else if (!ok && data) {
          return showGenericErrorDialog('An internal error occured!');
        } else {
          dispatch(showGenericErrorDialog("Can't initialize marathon data."));
          throw new Error('Cannot initialize marathon data.');
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
