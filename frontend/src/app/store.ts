import storage from "redux-persist/lib/storage";
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore} from 'redux-persist';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {usersReducer} from "../features/users/usersSlice.ts";
import { threadsReducer } from "../features/threads/threadsSlice.ts";

const userPersistConfig = {
  key: 'shop:users',
  storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  threads: threadsReducer,
  users: persistReducer(userPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;