import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  PurchasesOffering,
  PurchasesOfferings,
  PurchasesPackage,
} from 'react-native-purchases';

import {RootState} from '../../store/store';

export interface SubscriptionState {
  offer: PurchasesOffering | null;
}

const initialState: SubscriptionState = {
  offer: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setOffer(state, action: PayloadAction<PurchasesOffering>) {
      state.offer = action.payload;
    },
    resetOffer(state) {
      state.offer = initialState.offer;
    },
  },
});

export const {setOffer, resetOffer} = subscriptionSlice.actions;

export const selectOffer = (state: RootState) => state.subscription.offer;

export default subscriptionSlice.reducer;
