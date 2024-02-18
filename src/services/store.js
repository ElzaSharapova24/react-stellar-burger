import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./rootReducers";

export const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
