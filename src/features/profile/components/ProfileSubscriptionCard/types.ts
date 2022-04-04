import {PurchasesEntitlementInfo} from 'react-native-purchases';

export type ExpandedPurchasesEntitlementInfoType = PurchasesEntitlementInfo & {
  ownershipType?: string;
};
