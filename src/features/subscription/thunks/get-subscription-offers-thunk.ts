import Purchases, {PurchasesOfferings} from 'react-native-purchases';
import API_CLIENT from '../../../api/api-client';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
} from '../../ui/ui.slice';
import {setOffer} from '../subscription.slice';

export const getStories = () => API_CLIENT.get('/content/get-stories');

type OfferingsType = PurchasesOfferings | null;

const fetchSubscriptionOfferings = async (): Promise<OfferingsType> => {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function getSubscriptionOfferings(): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    fetchSubscriptionOfferings()
      .then((offerings: OfferingsType) => {
        // console.log('Subscription Response', offerings);
        dispatch(finishedRequest());

        if (!offerings) {
          return showGenericErrorDialog("Couldn't fetch offerings!");
        } else if (offerings) {
          const current = offerings.current;
          if (current) {
            return dispatch(setOffer(current));
          }
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
