import {combineReducers} from '@reduxjs/toolkit';
import uiReducer from '../features/ui/ui.slice';
import userReducer from '../features/auth/user.slice';

export const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
});
