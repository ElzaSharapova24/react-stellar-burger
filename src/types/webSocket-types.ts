import {
    wsClose,
    wsConnect,
    wsConnecting,
    wsDisconnect,
    wsError,
    wsMessage,
    wsOpen
} from "../services/middleware/actions";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {CreateOrderResponse} from "./api-types";

export type wsPayloadConnect = {
    wsUrl: string,
    withTokenRefresh: boolean,
}

export type TWsActions = {
    wsConnect: ActionCreatorWithPayload<wsPayloadConnect>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsConnecting: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsClose: ActionCreatorWithoutPayload,
    wsMessage: ActionCreatorWithPayload<CreateOrderResponse>,
    wsError:ActionCreatorWithPayload<any>,
}
