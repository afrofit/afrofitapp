import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {setContentUpdated} from '../../game/slices/activity.slice';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {MarathonDataType, UserMarathonTypes} from '../types/marathon.types';

const saveMarathonDataApi = (marathonData: MarathonDataType) =>
  API_CLIENT.post('/marathon/save-user-marathon-activity', {marathonData});

export function saveMarathonData(data: MarathonDataType): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    saveMarathonDataApi(data)
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        // const {data, ok} = response;
        const data: UserMarathonTypes = response.data;
        const ok: boolean = response.ok;

        if (data && ok) {
          return dispatch(setContentUpdated(true));
        } else if (!ok && data) {
          return showGenericErrorDialog('An internal error occured!');
        } else {
          dispatch(showGenericErrorDialog("Can't update marathon scores."));
          throw new Error('Cannot update marathon scoress.');
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
