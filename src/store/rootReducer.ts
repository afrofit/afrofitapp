import {combineReducers} from '@reduxjs/toolkit';
import uiReducer from '../features/ui/ui.slice';
import userReducer from '../features/auth/user.slice';
import contentReducer from '../features/game/slices/content.slice';
import subscriptionReducer from '../features/subscription/subscription.slice';

export const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  content: contentReducer,
  subscription: subscriptionReducer,
});
