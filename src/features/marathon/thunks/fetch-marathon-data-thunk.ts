import {ApiResponse} from 'apisauce';
import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setUserMarathonScore, setTopPerformers} from '../marathon.slice';
import {UserMarathonTypes} from '../types/marathon.types';

const fetchMarathonDataApi = () =>
  API_CLIENT.get('/marathon/get-current-marathon-data');

export function fetchMarathonData(): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    fetchMarathonDataApi()
      .then(response => {
        dispatch(finishedRequest());
        return response;
      })
      .then((response: ApiResponse<any>) => {
        const {data, ok} = response;

        if (data && ok) {
          const score: UserMarathonTypes = data.score;
          const listings: UserMarathonTypes[] = data.listings;
          console.log('Score & Listings', score, listings);
          dispatch(setUserMarathonScore(score));
          return dispatch(setTopPerformers(listings));
        } else if (!ok && data) {
          return showGenericErrorDialog('An internal error occured!');
        } else {
          dispatch(showGenericErrorDialog("Can't fetch marathon data."));
          throw new Error('Cannot fetch marathon data.');
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
