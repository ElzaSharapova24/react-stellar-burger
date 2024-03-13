import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./rootReducers";
import {socketMiddleware} from "./middleware/middleware";
import { enableMapSet } from 'immer';
import {
    currentUserOrdersActions, currentUserOrdersPrefix,
    ordersAllActions, ordersAllPrefix,
} from "./middleware/actions";

const ordersAllMiddleware = socketMiddleware(ordersAllActions, ordersAllPrefix);
const currentUserOrdersMiddleware = socketMiddleware(currentUserOrdersActions, currentUserOrdersPrefix);

enableMapSet();

export const store = configureStore({
    reducer: rootReducers,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,})
        .concat(ordersAllMiddleware, currentUserOrdersMiddleware)
});
