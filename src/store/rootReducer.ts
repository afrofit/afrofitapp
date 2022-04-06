import {combineReducers} from '@reduxjs/toolkit';
import uiReducer from '../features/ui/ui.slice';
import userReducer from '../features/auth/user.slice';
import contentReducer from '../features/game/slices/content.slice';
import subscriptionReducer from '../features/subscription/subscription.slice';
import performanceReducer from '../features/game/slices/activity.slice';
import marathonReducer from '../features/marathon/marathon.slice';

export const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  content: contentReducer,
  subscription: subscriptionReducer,
  activity: performanceReducer,
  marathon: marathonReducer,
});
