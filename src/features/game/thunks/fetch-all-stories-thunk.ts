import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import {StoryType} from '../../../models/Story';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setStories} from '../slices/content.slice';

export const getStories = () => API_CLIENT.get('/content/get-stories');

export function fetchAllStories(): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    getStories()
      .then((response: ApiResponse<any>) => {
        const data: StoryType[] = response.data;
        const ok: boolean = response.ok;
        dispatch(finishedRequest());
        if (data && ok) {
          const sortedStories = data.sort((a: StoryType, b: StoryType) =>
            a.storyOrderNumber < b.storyOrderNumber
              ? -1
              : Number(a.storyOrderNumber > b.storyOrderNumber),
          );

          return dispatch(setStories(sortedStories));
        } else if (!ok) {
          if (data) {
            console.error('ErrorData', data);
            return showGenericErrorDialog('An internal error occured!');
          } else if (!data) {
            dispatch(showGenericErrorDialog("Can't get stories. Retry?"));
            console.error('Cannot fetch stories.');
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
