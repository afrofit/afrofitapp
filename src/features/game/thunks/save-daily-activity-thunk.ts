import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setUserDailyActivity} from '../slices/activity.slice';

const saveUserDailyActivityApi = dailyActivityData =>
  API_CLIENT.post('/performance/save-user-daily-activity', {
    dailyActivityData,
  });

export function saveUserDailyActivity(payload): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    saveUserDailyActivityApi(payload)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then(response => {
        // console.log("Save Daily Data", response.data);
        const {data, ok} = response;

        if (data && ok) {
          const {bodyMoves, caloriesBurned} = data;
          return dispatch(setUserDailyActivity({bodyMoves, caloriesBurned}));
        } else if (!ok && data) {
          throw new Error(data);
        } else {
          dispatch(showGenericErrorDialog("Can't save your daily activity."));
          throw new Error('Error. Cannot log in.');
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
