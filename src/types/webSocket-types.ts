import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import { WebSocketOrdersAllDto} from "./api-types";

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
    wsMessage: ActionCreatorWithPayload<WebSocketOrdersAllDto>,
    wsError:ActionCreatorWithPayload<any>,
}
