import { configureStore } from "@reduxjs/toolkit";
import { contactsApi, filterReducer } from "./contacts/contactsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "./auth/auth-reducer";
import { authSlice } from "./auth/auth-slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    [authApi.reducerPath]: authApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

    contactsApi.middleware,
    authApi.middleware,
  ],
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
