import { configureStore, createSelector } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import apiService from "app/store/apiService";
import { rootReducer } from "./lazyLoadedSlices";
import { dynamicMiddleware } from "./middleware";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import { persistReducer, persistStore } from "redux-persist";

const middlewares = [apiService.middleware, dynamicMiddleware];
//
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
    preloadedState,
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
