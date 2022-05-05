import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setContentUpdated} from '../slices/activity.slice';
import {setCurrentChapters, setCurrentStory} from '../slices/content.slice';
import {StoryChapterExpandedType} from './fetch-story-details-thunk';

const resetStoryActivityApi = (resetContentData: {contentStoryId: string}) =>
  API_CLIENT.post('/performance/reset-story-content-activity', {
    resetContentData,
  });

export function resetStoryActivity(payload: {
  contentStoryId: string;
}): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    resetStoryActivityApi(payload)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const data: StoryChapterExpandedType = response.data;
        const {ok}: {ok: boolean} = response;

        if (data && ok) {
          dispatch(setCurrentStory(data.story));
          dispatch(setCurrentChapters(data.chapters));
          return dispatch(setContentUpdated(true));
        } else if (!ok) {
          dispatch(
            showGenericErrorDialog("Can't reset details for this story."),
          );
          if (data) {
            console.error('An error occured!', data);
          } else if (!data) {
            console.error('Cannot reset the details for this story.');
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
