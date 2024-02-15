import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/authslice";
import storage from "./customStorage";
import { persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["token", "user"],
};
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthSlice),
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
