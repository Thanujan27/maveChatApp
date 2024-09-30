import { useDispatch as useReduxDispatch } from 'react-redux';
import { useSelector as useReduxSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducers';
import { persistStore } from 'redux-persist';

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
const useSelector = useReduxSelector;

const useDispatch = () => useReduxDispatch<AppDispatch>();

const { dispatch } = store;
export { useDispatch, useSelector, store, dispatch, persistor };
