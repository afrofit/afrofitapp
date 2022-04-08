import Purchases from 'react-native-purchases';

export const checkSubscriptionStatus = async (): Promise<boolean> => {
  try {
    const purchaserInfo = await Purchases.getPurchaserInfo();
    console.log('PurchaseInfo', purchaserInfo);
    if (typeof purchaserInfo.entitlements.active.premium !== 'undefined') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
