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

const saveUserGameActivityApi = gamePlayData =>
  API_CLIENT.post('/performance/save-user-content-played', {
    gamePlayData,
  });

export function saveUserGameActivity(gamePlayData): AppThunk {
  return dispatch => {
    console.log('Chapter Order Number', payload.chapterOrderNumber);
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    saveUserGameActivityApi(payload)
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
        } else if (!ok) {
          dispatch(showGenericErrorDialog("Can't save your game activity."));
          if (data) {
            console.error('An error occured!', data);
          } else if (!data) {
            console.error('Cannot save your game activity.');
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
