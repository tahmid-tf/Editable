import { configureStore, createSelector } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import apiService from 'app/store/apiService';
import { appReducer } from './lazyLoadedSlices';
import { dynamicMiddleware } from './middleware';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const middlewares = [apiService.middleware, dynamicMiddleware];
const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2,
	whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, appReducer);
export const makeStore = (preloadedState) => {
	const store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
		preloadedState
	});
	// configure listeners using the provided defaults
	// optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
	setupListeners(store.dispatch);
	return store;
};
export const store = makeStore();
export const persistor = persistStore(store);
export const createAppSelector = createSelector.withTypes();
export default store;
