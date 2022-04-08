import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {UserMarathonTypes} from './types/marathon.types';

export type LeagueNames = 'Super' | 'Superstar' | 'Rookie' | 'Peak' | 'Core';

export type LeagueArrayType = {
  [key in LeagueNames]: UserMarathonTypes[];
};

export type MarathonState = {
  topPerformers: LeagueArrayType;
  userMarathonScore: UserMarathonTypes | null;
  currentUserIndex: number | null;
  currentUserLeagueCode: number;
};

const initialState: MarathonState = {
  topPerformers: {
    Superstar: [],
    Peak: [],
    Super: [],
    Core: [],
    Rookie: [],
  },
  userMarathonScore: null,
  currentUserIndex: null,
  currentUserLeagueCode: 1,
};

const marathonSlice = createSlice({
  name: 'marathon',
  initialState,
  reducers: {
    setTopPerformers(state, action: PayloadAction<UserMarathonTypes[]>) {
      const topPerfomersArray = action.payload;

      state.topPerformers.Superstar = topPerfomersArray.slice(0, 5) || [];
      state.topPerformers.Peak = topPerfomersArray.slice(5, 15) || [];
      state.topPerformers.Super = topPerfomersArray.slice(15, 30) || [];
      state.topPerformers.Core = topPerfomersArray.slice(30, 50) || [];
      state.topPerformers.Rookie = topPerfomersArray.slice(50, 75) || [];
    },
    setUserMarathonScore(state, action: PayloadAction<UserMarathonTypes>) {
      state.userMarathonScore = action.payload;
    },
    unsetUserMarathonScore(state) {
      state.userMarathonScore = null;
    },
    unsetTopPerformeers(state) {
      state.topPerformers = initialState.topPerformers;
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
export const getTopPerformers = (state: RootState) => [
  ...state.marathon.topPerformers.Rookie,
  ...state.marathon.topPerformers.Core,
  ...state.marathon.topPerformers.Super,
  ...state.marathon.topPerformers.Peak,
  ...state.marathon.topPerformers.Superstar,
];

export const getActiveLeague = (state: RootState) => {
  const {userMarathonScore} = state.marathon;
  const {currentUserIndex} = state.marathon;
  console.log('Thunky User Index', currentUserIndex);
  if (currentUserIndex !== null) {
    if (currentUserIndex >= 0 && currentUserIndex <= 75) {
      if (currentUserIndex < 5) {
        return {
          name: 'Superstar',
          leagueCode: 1,
          array: state.marathon.topPerformers.Superstar,
        };
      } else if (currentUserIndex > 5 && currentUserIndex < 15) {
        return {
          name: 'Peak',
          leagueCode: 2,
          array: state.marathon.topPerformers.Peak,
        };
      } else if (currentUserIndex > 15 && currentUserIndex < 30) {
        return {
          name: 'Super',
          leagueCode: 3,
          array: state.marathon.topPerformers.Super,
        };
      } else if (currentUserIndex > 30 && currentUserIndex < 50) {
        return {
          name: 'Core',
          leagueCode: 4,
          array: state.marathon.topPerformers.Core,
        };
      } else if (currentUserIndex > 50) {
        return {
          name: 'Rookie',
          leagueCode: 5,
          array: state.marathon.topPerformers.Rookie,
        };
      }
    } else {
      return {
        name: 'Rookie',
        leagueCode: 5,
        array: {
          ...state.marathon.topPerformers.Rookie.slice(0, 25),
          userMarathonScore,
        },
      };
    }
  }
  return null;
};

export const getUserMarathonScore = (state: RootState) =>
  state.marathon.userMarathonScore;

export const getUserMarathonIndex = (state: RootState) =>
  state.marathon.currentUserIndex;

export const getUserMarathonLeague = (state: RootState) =>
  state.marathon.currentUserLeagueCode;

/** Reducer */
export default marathonSlice.reducer;
