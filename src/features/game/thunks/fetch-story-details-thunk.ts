import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import {ChapterType} from '../../../models/Chapter';
import {StoryType} from '../../../models/Story';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {resetUserDailyActivity} from '../slices/activity.slice';
import {setCurrentChapters, setCurrentStory} from '../slices/content.slice';

export type StoryChapterExpandedType = {
  chapters: ChapterType[];
  story: StoryType;
};

const fetchStoryDetailsApi = (storyId: string) =>
  API_CLIENT.get(`/content/get-story-detail/${storyId}`);

export function fetchStoryDetails(storyId: string): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    fetchStoryDetailsApi(storyId)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const data: StoryChapterExpandedType = response.data;
        const {ok}: {ok: boolean} = response;

        if (data && ok) {
          const {story, chapters} = data;
          const sortedChapters = chapters.sort((a, b) =>
            a.chapterOrder < b.chapterOrder
              ? -1
              : Number(a.chapterOrder > b.chapterOrder),
          );
          dispatch(setCurrentStory(story));
          return dispatch(setCurrentChapters(sortedChapters));
        } else if (!ok) {
          dispatch(resetUserDailyActivity());
          dispatch(showGenericErrorDialog("Can't fetch this story details."));
          if (data) {
            console.error('An error occured!', data);
          } else if (!data) {
            console.error('Cannot fetch this story details.');
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
