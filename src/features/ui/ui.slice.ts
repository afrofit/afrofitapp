import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../store/store';

export interface UIState {
  requestsLoading: number;
  showGenericErrorDialog: string;
  showSubscribeDialog: boolean;
  isSubmitting: boolean;
}

const initialState: UIState = {
  requestsLoading: 0,
  showGenericErrorDialog: '',
  showSubscribeDialog: false,
  isSubmitting: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    newRequest(state) {
      state.requestsLoading = state.requestsLoading + 1;
    },
    finishedRequest(state) {
      state.requestsLoading = state.requestsLoading - 1;
    },
    showGenericErrorDialog(state, action: PayloadAction<string>) {
      state.showGenericErrorDialog = action.payload;
    },
    hideGenericErrorDialog(state) {
      state.showGenericErrorDialog = '';
    },
    showSubscribeDialog(state, action: PayloadAction<boolean>) {
      state.showSubscribeDialog = action.payload;
    },
    setIsSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload;
    },
  },
});

export const {
  newRequest,
  finishedRequest,
  showGenericErrorDialog,
  hideGenericErrorDialog,
  showSubscribeDialog,
  setIsSubmitting,
} = uiSlice.actions;

export const selectUiIsLoading = (state: RootState) =>
  state.ui.requestsLoading > 0;

export const selectShowGenericErrorDialog = (state: RootState) =>
  state.ui.showGenericErrorDialog;

export const selectShowSubscribeDialog = (state: RootState) =>
  state.ui.showSubscribeDialog;

export const selectSubmitting = (state: RootState) => state.ui.isSubmitting;

export default uiSlice.reducer;
