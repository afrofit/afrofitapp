import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {UserMarathonTypes} from './types/marathon.types';

export type MarathonState = {
  topPerformers: UserMarathonTypes[];
  userMarathonScore: UserMarathonTypes | null;
  currentUserIndex: number | null;
  currentUserLeagueCode: number;
};

const initialState: MarathonState = {
  topPerformers: [],
  userMarathonScore: null,
  currentUserIndex: null,
  currentUserLeagueCode: 1,
};

const marathonSlice = createSlice({
  name: 'marathon',
  initialState,
  reducers: {
    setTopPerformers(state, action: PayloadAction<UserMarathonTypes[]>) {
      state.topPerformers = action.payload;
    },
    setUserMarathonScore(state, action: PayloadAction<UserMarathonTypes>) {
      state.userMarathonScore = action.payload;
    },
    unsetUserMarathonScore(state) {
      state.userMarathonScore = null;
    },
    unsetTopPerformeers(state) {
      state.topPerformers = [];
    },
    setCurrentUserIndex(state, action: PayloadAction<number | null>) {
      state.currentUserIndex = action.payload;
    },
    setCurrentUserLeagueCode(state, action: PayloadAction<number>) {
      state.currentUserLeagueCode = action.payload;
    },
  },
});

/** Actions */
export const {
  setTopPerformers,
  unsetTopPerformeers,
  unsetUserMarathonScore,
  setUserMarathonScore,
  setCurrentUserIndex,
  setCurrentUserLeagueCode,
} = marathonSlice.actions;

/** Selectors */
export const getTopPerformers = (state: RootState) =>
  state.marathon.topPerformers;
export const getUserMarathonScore = (state: RootState) =>
  state.marathon.userMarathonScore;
export const getUserMarathonIndex = (state: RootState) =>
  state.marathon.currentUserIndex;
export const getUserMarathonLeague = (state: RootState) =>
  state.marathon.currentUserLeagueCode;

/** Reducer */
export default marathonSlice.reducer;
