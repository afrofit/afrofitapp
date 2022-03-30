import {configureStore, Action} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {rootReducer} from './rootReducer';

const STORE = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof STORE.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default STORE;
