import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {
  setUserDailyActivity,
  resetUserDailyActivity,
} from '../slices/activity.slice';
import {DailyActivityType} from '../types/activity.types';

const fetchUserDailyActivityApi = () =>
  API_CLIENT.get('/performance/get-user-daily-activity');

export function fetchUserDailyActivity(): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    fetchUserDailyActivityApi()
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const data: DailyActivityType = response.data;
        const ok: boolean = response.ok;
        // console.log('Daily Data', response.data);

        if (data && ok) {
          const {bodyMoves, caloriesBurned} = data;
          // console.log('Daily Activity Data', bodyMoves, caloriesBurned);
          return dispatch(
            setUserDailyActivity({
              bodyMoves,
              caloriesBurned,
            }),
          );
        } else if (!ok) {
          dispatch(resetUserDailyActivity());
          dispatch(showGenericErrorDialog("Can't save your daily activity."));
          if (data) {
            console.error('An error occured!', data);
          } else if (!data) {
            console.error('Cannot save your daily activity.');
            return;
          }
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
