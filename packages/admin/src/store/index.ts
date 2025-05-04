import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './appSlice';
import { authSlice } from './authSlice';
import counterReducer from './counterSlice';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'],
};
const rootReducer = combineReducers({
  app: appReducer,
  counter: counterReducer,
  [authSlice.reducerPath]: authSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          // 如果需要，可以在这里配置要忽略的 action 类型
          ignoredActions: ['persist/PERSIST'],
        },
      }).concat(authSlice.middleware),
    // devTools: true,
  });
  const persistor = persistStore(store);
  return { store, persistor };
};
