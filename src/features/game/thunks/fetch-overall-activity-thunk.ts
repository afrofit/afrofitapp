import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setUserPerformanceData} from '../slices/activity.slice';
import {UserStatsType} from '../types/activity.types';

const fetchUserOverallActivityApi = () =>
  API_CLIENT.get('/performance/get-user-performance-data');

export function fetchUserOverallActivity(): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());

    fetchUserOverallActivityApi()
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        // console.log('Performance Data', response.data);
        const data: UserStatsType = response.data;
        const ok: boolean = response.ok;

        if (data && ok) {
          return dispatch(setUserPerformanceData(response.data));
        } else if (!ok) {
          dispatch(
            showGenericErrorDialog("Can't fetch your overall activity data."),
          );
          if (data) {
            console.error('Error!', data);
          } else if (!data) {
            console.error('Cannot fetch your overall activity data.');
          }
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
