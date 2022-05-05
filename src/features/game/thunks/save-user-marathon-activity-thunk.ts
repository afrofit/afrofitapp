import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setUserPerformanceData} from '../slices/activity.slice';

const saveUserMarathonActivityApi = marathonData =>
  API_CLIENT.post('/marathon/save-user-marathon-activity', {marathonData});

export function saveUserMarathonData(marathonData) {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    activityApi
      .saveUserMarathonActivityApi(data)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then(response => {
        const {data, ok} = response;

        if (data && ok) {
          return dispatch(setContentUpdated(true));
        } else if (!ok && data) {
          throw new Error(data);
        } else {
          dispatch(showGenericErrorDialog("Can't update marathon scores."));
          throw new Error('Cannot update marathon scoress.');
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
