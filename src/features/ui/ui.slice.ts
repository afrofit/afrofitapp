import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../store/store';

export interface UIState {
  requestsLoading: number;
  showGenericErrorDialog: boolean;
}

const initialState = {
  requestsLoading: 0,
  showGenericErrorDialog: false,
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
    showGenericErrorDialog(state, action: PayloadAction<boolean>) {
      state.showGenericErrorDialog = action.payload;
    },
    hideGenericErrorDialog(state) {
      state.showGenericErrorDialog = false;
    },
  },
});

export const {
  newRequest,
  finishedRequest,
  showGenericErrorDialog,
  hideGenericErrorDialog,
} = uiSlice.actions;

export const selectUiIsLoading = (state: RootState) =>
  state.ui.requestsLoading > 0;

export const selectShowGenericErrorDialog = (state: RootState) =>
  state.ui.showGenericErrorDialog;

export default uiSlice.reducer;
