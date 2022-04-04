export type DailyActivityType = {caloriesBurned: number; bodyMoves: number};

export type UserStatsType = {
  totalCaloriesBurned: number;
  totalBodyMoves: number;
  totalTimeDancedInMilliseconds: number;
  totalDaysActive: number;
};

export interface ActivityState {
  dailyActivity: DailyActivityType;
  userStats: UserStatsType;
  contentUpdated: boolean;
}
