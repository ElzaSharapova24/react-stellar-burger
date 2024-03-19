import {TWsActions} from "../../types/webSocket-types";
import {Middleware, MiddlewareAPI} from "@reduxjs/toolkit";
import {refreshTokenUserRequest} from "../../utils/api";
import {checkResponse} from "../../utils/utils";
import {RootStore, AppDispatch} from "../hooks";


export const socketMiddleware: (wsActions: TWsActions, prefix: string) => Middleware = (wsActions, prefix: string) => {
    return (store: MiddlewareAPI<AppDispatch, RootStore>) => {
        let socket: WebSocket | null = null;
        let reconnectTimer: number = 0;
        let isConnected: boolean = false;
        let wsUrl: string = '';
        let withTokenRefresh: boolean = false;

        return next => action => {
            const type = (action as any).type as string;
            if (!type.startsWith(prefix)){
                next(action);
                return;
            }
            const {dispatch} = store;
            const {wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsMessage, wsError} = wsActions;

            if (wsConnect.match(action)) {
                wsUrl = action.payload.wsUrl;
                withTokenRefresh = action.payload.withTokenRefresh;
                socket = new WebSocket(`${wsUrl}`);
                isConnected = true;
                dispatch(wsConnecting());
            }

            if (socket) {

                socket.onopen = () => {
                    console.log('socket.onopen')
                    dispatch(wsOpen());
                };

                socket.onerror = event => {
                    console.log('socket.onerror', event)
                };

                socket.onclose = event => {
                    console.log('socket.onclose')
                   if (event.code !== 1000) {
                       console.log('socket.onclose error', event);
                       dispatch(wsError(event.code.toString()))
                   }

                    if (event.code === 1000) {
                        console.log('socket.onclose success', event);
                    }

                   if (isConnected && event.code !== 1000) {
                       reconnectTimer = window.setTimeout(() => {
                           dispatch(wsConnect({wsUrl, withTokenRefresh}))
                       }, 3000)
                   }
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    if (withTokenRefresh && parsedData.message === 'Invalid or missing token') {
                        refreshTokenUserRequest().then(checkResponse)
                            .then(token => {
                                const newWsUrl = new URL(wsUrl);
                                // @ts-ignore
                                newWsUrl.searchParams.set('token', token.accessToken.replace('Bearer ', ''))
                                dispatch(wsConnect({wsUrl, withTokenRefresh}))
                            })
                            .catch(error => {
                                dispatch(wsError((error.code || error.statusCode).toString()))
                            })

                        dispatch(wsClose())
                        return;
                    }

                    dispatch(wsMessage(parsedData));
                }

                if (wsDisconnect.match(action) && socket) {
                    clearTimeout(reconnectTimer);
                    isConnected = false;
                    reconnectTimer = 0;
                    socket.close(1000, 'Работа закончена')

                    dispatch(wsClose());
                }
            }

            next(action);
        };
    }
};
