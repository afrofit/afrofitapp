import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setUserPerformanceData} from '../slices/activity.slice';

const saveUserOverallActivityApi = performanceData =>
  API_CLIENT.post('/performance/save-user-performance-data', {
    performanceData,
  });

export function saveUserOverallActivity(payload): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    saveUserOverallActivityApi(payload)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then(response => {
        // console.log("Save Performance Data", response.data);
        const {data, ok} = response;

        if (data && ok) {
          const {
            bodyMoves,
            caloriesBurned,
            totalTimeDancedInMilliseconds,
            totalDaysActive,
          } = data;
          return dispatch(
            setUserPerformanceData({
              bodyMoves,
              caloriesBurned,
              totalTimeDancedInMilliseconds,
              totalDaysActive,
            }),
          );
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
