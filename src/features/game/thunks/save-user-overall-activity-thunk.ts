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
        } else if (!ok) {
          dispatch(showGenericErrorDialog("Can't save your overall activity."));
          if (data) {
            console.error('An error occured!', data);
          } else if (!data) {
            console.error('Cannot save your overall activity.');
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
// export function saveUserActivityData(payload): AppThunk {
//   return dispatch => {
//     saveUserActivity(payload)
//       .then(response => {
//         // console.log("Activity response from Thunk", res);
//         const {chapter, daily, story, performance} = response;
//         // console.log("Story from Thunk", story);
//         console.log('For upstreaming...');
//         const {
//           totalCaloriesBurned,
//           totalBodyMoves,
//           totalTimeDancedInMilliseconds,
//           totalDaysActive,
//         } = performance;
//         const {bodyMoves, caloriesBurned} = daily;
//         dispatch(updateCurrentChapters(payload));
//         dispatch(
//           initializeTotalUserActivity({
//             totalCaloriesBurned,
//             totalBodyMoves,
//             totalTimeDancedInMilliseconds,
//             totalDaysActive,
//           }),
//         );
//         dispatch(
//           setUserDailyActivity({
//             bodyMoves,
//             caloriesBurned,
//           }),
//         );
//         return dispatch(updateCurrentChapter(chapter));
//       })
//       .catch(error => {
//         dispatch(showGenericErrorDialog(error.message));
//         console.error(error);
//       });
//   };
// }
