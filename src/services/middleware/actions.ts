import {createAction} from "@reduxjs/toolkit";
import {wsPayloadConnect} from "../../types/webSocket-types";
import { WebSocketOrdersAllDto} from "../../types/api-types";

export const wsConnect = createAction<wsPayloadConnect>('CONNECT')
export const wsDisconnect = createAction('DISCONNECT')
export const wsConnecting = createAction('CONNECTING')
export const wsOpen = createAction('OPEN')
export const wsClose = createAction('CLOSE')
export const wsMessage = createAction<WebSocketOrdersAllDto>('MESSAGE')
export const wsError= createAction<string | null>('ERROR')
