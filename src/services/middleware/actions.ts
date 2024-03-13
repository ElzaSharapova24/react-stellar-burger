import {createAction} from "@reduxjs/toolkit";
import {TWsActions, wsPayloadConnect} from "../../types/webSocket-types";
import { WebSocketOrdersAllDto} from "../../types/api-types";

export const ordersAllPrefix = "ORDERS_ALL_";
export const currentUserOrdersPrefix = 'ORDERS_CURRENT_';

export const ordersAllActions : TWsActions = {
    wsConnect: createAction<wsPayloadConnect>(ordersAllPrefix + 'CONNECT'),
    wsDisconnect: createAction<any>(ordersAllPrefix + 'DISCONNECT'),
    wsConnecting: createAction<any>(ordersAllPrefix + 'CONNECTING'),
    wsOpen: createAction<any>(ordersAllPrefix + 'OPEN'),
    wsClose: createAction<any>(ordersAllPrefix + 'CLOSE'),
    wsMessage: createAction<WebSocketOrdersAllDto>(ordersAllPrefix + 'MESSAGE'),
    wsError: createAction<string | null>(ordersAllPrefix + 'ERROR'),
}

export const currentUserOrdersActions : TWsActions = {
    wsConnect: createAction<wsPayloadConnect>(currentUserOrdersPrefix + 'CONNECT'),
    wsDisconnect: createAction<any>(currentUserOrdersPrefix + 'DISCONNECT'),
    wsConnecting: createAction<any>(currentUserOrdersPrefix + 'CONNECTING'),
    wsOpen: createAction<any>(currentUserOrdersPrefix + 'OPEN'),
    wsClose: createAction<any>(currentUserOrdersPrefix + 'CLOSE'),
    wsMessage: createAction<WebSocketOrdersAllDto>(currentUserOrdersPrefix + 'MESSAGE'),
    wsError: createAction<string | null>(currentUserOrdersPrefix + 'ERROR'),
}
