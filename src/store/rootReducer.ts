import {combineReducers} from '@reduxjs/toolkit';
import uiReducer from '../features/ui/ui.slice';

export const rootReducer = combineReducers({
  ui: uiReducer,
});
