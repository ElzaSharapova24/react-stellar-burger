import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./rootReducers";
import {socketMiddleware} from "./middleware/middleware";
import { enableMapSet } from 'immer';
import {wsClose, wsConnect, wsConnecting, wsDisconnect, wsError, wsMessage, wsOpen} from "./middleware/actions";

const wsActions = {
    wsConnect,
    wsDisconnect,
    wsConnecting,
    wsOpen,
    wsClose,
    wsMessage,
    wsError
}
const webSocketMiddleware = socketMiddleware(wsActions);

enableMapSet();

export const store = configureStore({
    reducer: rootReducers,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}).concat(webSocketMiddleware)
});
