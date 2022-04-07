import API_CLIENT from "../../../api/api-client";
import { AppThunk } from "../../../store/store";
import { newRequest, hideGenericErrorDialog, finishedRequest, showGenericErrorDialog } from "../../ui/ui.slice";
import { setContentUpdated } from "../slices/activity.slice";
import { updateCurrentStory, updateCurrentChapters } from "../slices/content.slice";

const resetStoryActivityApi = (resetContentData) =>
	API_CLIENT.post("/performance/reset-story-content-activity", {
		resetContentData,
	});

export function resetStoryActivity(payload): AppThunk {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
			.resetStoryActivityApi(payload)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;

				if (data && ok) {
					dispatch(updateCurrentStory(data.story));
					dispatch(updateCurrentChapters(data.chapters));
					return dispatch(setContentUpdated(true));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't reset this story."));
					throw new Error("Cannot reset this story.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

