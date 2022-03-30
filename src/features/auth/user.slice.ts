import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';

import {RootState} from '../../store/store';

export interface UserState {
  currentUser: User | null;
  currentUserToken: string | null;
  currentUserResetToken?: string | null;
  signupSuccess: boolean;
  verifySuccess: boolean;
  loginSuccess: boolean;
  changePasswordSuccess: boolean;
  confirmPasswordResetCodeSuccess: boolean;
  resendPasswordResetCodeSuccess: boolean;
  changeUsernameSuccess: boolean;
  resetEmailSuccess: boolean;
}

const initialState: UserState = {
  currentUser: null,
  currentUserToken: null,
  currentUserResetToken: null,
  signupSuccess: false,
  verifySuccess: false,
  loginSuccess: false,
  changePasswordSuccess: false,
  confirmPasswordResetCodeSuccess: false,
  resendPasswordResetCodeSuccess: false,
  changeUsernameSuccess: false,
  resetEmailSuccess: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    setCurrentUserToken(state, action: PayloadAction<string>) {
      state.currentUserToken = action.payload;
    },
    setCurrentUserResetToken(state, action: PayloadAction<string>) {
      state.currentUserResetToken = action.payload;
    },
    unsetCurrentUser(state) {
      state.currentUser = null;
    },
    setSignupSuccess(state, action: PayloadAction<boolean>) {
      state.signupSuccess = action.payload;
    },
    setVerifySuccess(state, action: PayloadAction<boolean>) {
      state.signupSuccess = action.payload;
    },
    setLoginSuccess(state, action: PayloadAction<boolean>) {
      state.signupSuccess = action.payload;
    },
    setChangePasswordSuccess(state, action: PayloadAction<boolean>) {
      state.signupSuccess = action.payload;
    },
    setConfirmPasswordResetCodeSuccess(state, action: PayloadAction<boolean>) {
      state.signupSuccess = action.payload;
    },
    setResendPasswordResetCodeSuccess(state, action: PayloadAction<boolean>) {
      state.signupSuccess = action.payload;
    },
    setChangeUsernameSuccess(state, action: PayloadAction<boolean>) {
      state.signupSuccess = action.payload;
    },
    setEmailResetSuccess(state, action: PayloadAction<boolean>) {
      state.signupSuccess = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  setCurrentUserToken,
  setCurrentUserResetToken,
  unsetCurrentUser,
  setSignupSuccess,
} = userSlice.actions;

export const getCurrentUser = (state: RootState) => state.user.currentUser;

export const getCurrentUserToken = (state: RootState) =>
  state.user.currentUserToken;

export const getCurrentUserResetToken = (state: RootState) =>
  state.user.currentUserResetToken;

export const getSignupSuccess = (state: RootState) => state.user.signupSuccess;
export const getVerifySuccess = (state: RootState) => state.user.verifySuccess;
export const getLoginSuccess = (state: RootState) => state.user.loginSuccess;
export const getChangePasswordSuccess = (state: RootState) =>
  state.user.changePasswordSuccess;
export const getConfirmPasswordResetCodeSuccess = (state: RootState) =>
  state.user.confirmPasswordResetCodeSuccess;
export const getResendPasswordResetCodeSuccess = (state: RootState) =>
  state.user.resendPasswordResetCodeSuccess;
export const getChangeUsernameSuccess = (state: RootState) =>
  state.user.changeUsernameSuccess;
export const getEmailResetSuccess = (state: RootState) =>
  state.user.resetEmailSuccess;

export default userSlice.reducer;
