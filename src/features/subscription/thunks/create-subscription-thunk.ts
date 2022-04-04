import Purchases, {PurchasesPackage} from 'react-native-purchases';
import {AppThunk} from '../../../store/store';
import {
  newRequest,
  hideGenericErrorDialog,
  finishedRequest,
  showGenericErrorDialog,
  showSubscribeDialog,
} from '../../ui/ui.slice';

export function createSubscription(pack: PurchasesPackage): AppThunk {
  return dispatch => {
    dispatch(newRequest());
    dispatch(hideGenericErrorDialog());
    Purchases.purchasePackage(pack)
      .then(({purchaserInfo}) => {
        dispatch(finishedRequest());
        return purchaserInfo;
      })
      .then(purchaserInfo => {
        if (purchaserInfo.entitlements.active.premium) {
          // unlock content here
          dispatch(showSubscribeDialog(false));
        } else {
          return dispatch(
            showGenericErrorDialog('There was an error creating subscription.'),
          );
        }
      })
      .catch(error => {
        dispatch(showGenericErrorDialog(error.message));
        console.error(error);
      });
  };
}
