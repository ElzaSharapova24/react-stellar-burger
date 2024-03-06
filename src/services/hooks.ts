import {
  TypedUseSelectorHook,
  useDispatch as useDispatchRedux,
  useSelector as useSelectorRedux,
} from "react-redux";
import {AsyncThunkPayloadCreator} from "@reduxjs/toolkit";
import { store } from "./store";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {ErrorResponse} from "../types/api-types";

export type RootStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchRedux<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootStore> = useSelectorRedux;

export function PayloadCreator<TResponse, TRequest>(func : (payload: TRequest) => Promise<TResponse | ErrorResponse>)
    : AsyncThunkPayloadCreator<TResponse, TRequest, AsyncThunkConfig>{
    return func as unknown as AsyncThunkPayloadCreator<TResponse, TRequest, AsyncThunkConfig>;
}
