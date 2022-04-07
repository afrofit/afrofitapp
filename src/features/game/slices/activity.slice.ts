import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../../store/store';
import {
  ActivityState,
  DailyActivityType,
  UserStatsType,
} from '../types/activity.types';

const initialState: ActivityState = {
  dailyActivity: {
    caloriesBurned: 0,
    bodyMoves: 0,
  },
  userStats: {
    totalCaloriesBurned: 0,
    totalBodyMoves: 70,
    totalTimeDancedInMilliseconds: 0,
    totalDaysActive: 0,
  },
  contentUpdated: false,
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    setUserDailyActivity(state, action: PayloadAction<DailyActivityType>) {
      state.dailyActivity = action.payload;
    },
    updateUserDailyActivity(state, action: PayloadAction<DailyActivityType>) {
      const {caloriesBurned, bodyMoves} = action.payload;
      state.dailyActivity = {
        caloriesBurned: (state.dailyActivity.caloriesBurned += caloriesBurned),
        bodyMoves: (state.dailyActivity.bodyMoves += bodyMoves),
      };
    },
    setContentUpdated(state, action: PayloadAction<boolean>) {
      state.contentUpdated = action.payload;
    },
    setUserPerformanceData(state, action: PayloadAction<UserStatsType>) {
      state.userStats = action.payload;
    },
    resetUserDailyActivity(state) {
      state.dailyActivity = initialState.dailyActivity;
    },
    resetUserPerformance(state) {
      state.userStats = initialState.userStats;
    },
  },
});

export const {
  setUserDailyActivity,
  updateUserDailyActivity,
  setUserPerformanceData,
  resetUserDailyActivity,
  setContentUpdated,
} = performanceSlice.actions;

/**Selectors */
export const selectDailyActivity = (state: RootState) =>
  state.activity.dailyActivity;
export const selectPerformanceData = (state: RootState) =>
  state.activity.userStats;
export const selectContentUpdated = (state: RootState) =>
  state.activity.contentUpdated;

/**Reducer */
export default performanceSlice.reducer;
