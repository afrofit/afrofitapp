import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setUserDailyActivity} from '../slices/activity.slice';

export type DailyActivityData = {
  caloriesBurned: number;
  bodyMoves: number;
};

type DailyActivityResponseType = {
  daily: DailyActivityData;
};

const saveUserDailyActivityApi = (dailyActivityData: DailyActivityData) =>
  API_CLIENT.post('/performance/save-user-daily-activity', {
    dailyActivityData,
  });

export function saveUserDailyActivity(
  dailyActivityData: DailyActivityData,
): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    saveUserDailyActivityApi(dailyActivityData)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        console.log('Save Daily Data', response.data);
        // const {data, ok} = response;
        const data: DailyActivityResponseType = response.data;
        const {ok}: {ok: boolean} = response;

        if (data && ok) {
          const {bodyMoves, caloriesBurned} = data.daily;
          console.log('Deconstructed!', bodyMoves, caloriesBurned);
          return dispatch(setUserDailyActivity({bodyMoves, caloriesBurned}));
        } else if (!ok) {
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
