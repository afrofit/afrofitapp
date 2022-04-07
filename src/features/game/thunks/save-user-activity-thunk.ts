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
  setUserPerformanceData,
  setContentUpdated,
} from '../slices/activity.slice';
import {
  updateCurrentStory,
  updateCurrentChapters,
  updateCurrentChapter,
} from '../slices/content.slice';


const saveUserContentPlayedActivity = contentPlayedData =>
  apiClient.post('/performance/save-user-content-played', {
    contentPlayedData,
  });

export function storeUserContentActivityData(payload): AppThunk {
  return dispatch => {
    console.log('Chapter Order Number', payload.chapterOrderNumber);
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    saveUserContentPlayedActivity(payload)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then(response => {
        const {data, ok} = response;

        if (data && ok) {
          dispatch(updateCurrentStory(data.story));
          dispatch(updateCurrentChapters(data.chapter));
          return dispatch(setContentUpdated(true));
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

export function saveUserActivityData(payload): AppThunk {
  return dispatch => {
    saveUserActivity(payload)
      .then(response => {
        // console.log("Activity response from Thunk", res);
        const {chapter, daily, story, performance} = response;
        // console.log("Story from Thunk", story);
        console.log('For upstreaming...');
        const {
          totalCaloriesBurned,
          totalBodyMoves,
          totalTimeDancedInMilliseconds,
          totalDaysActive,
        } = performance;
        const {bodyMoves, caloriesBurned} = daily;
        dispatch(updateCurrentChapters(payload));
        dispatch(
          initializeTotalUserActivity({
            totalCaloriesBurned,
            totalBodyMoves,
            totalTimeDancedInMilliseconds,
            totalDaysActive,
          }),
        );
        dispatch(
          setUserDailyActivity({
            bodyMoves,
            caloriesBurned,
          }),
        );
        return dispatch(updateCurrentChapter(chapter));
      })
      .catch(error => console.error(error));
  };
}
`