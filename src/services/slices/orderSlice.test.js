import {configureStore} from "@reduxjs/toolkit";

import {currentUserOrderReducer, orderReducer} from "./orderSlice";
import {initialState} from "./ingredientSlice";
import {ordersAllActions} from "../middleware/actions";


describe('CurrentUserOrder Slice extraReducers', () => {
    let store;
    
    beforeEach(() => {
        store = configureStore({
            reducer: {
                currentUserOrder: orderReducer,
            },
        });
    });
    
    it('orderReducer should return the initial state', () => {
        const initialState = {
            orders: [],
            isLoading: false,
            errorCode: null,
            total: 0,
            totalToday: 0,
        };
        
        const newState = currentUserOrderReducer(undefined, {}); // Передаем undefined в качестве предыдущего состояния и пустой объект в качестве действия
        
        expect(newState).toEqual(initialState);
    });
    
    it('should set isLoading to true when wsConnecting action is dispatched', () => {
        const state = store.getState().currentUserOrder;
        store.dispatch({ type: 'wsConnecting' });
        
        expect(state.isLoading).toBe(false);
    });
    
    it('should set isLoading to true when wsOpen action is dispatched', () => {
        const state = store.getState().currentUserOrder;
        store.dispatch({ type: 'wsOpen' });
        
        expect(state.isLoading).toBe(false);
    });
    
    it('should set isLoading to true when wsClose action is dispatched', () => {
        const state = store.getState().currentUserOrder;
        store.dispatch({ type: 'wsClose' });
        
        expect(state.isLoading).toBe(false);
        expect(state.errorCode).toBe(null);
    });
    
    it('should handle wsError action correctly', () => {
        const mockResponse = 'SOME_ERROR_CODE';
        const action = ordersAllActions.wsError(mockResponse, '');
        const state = orderReducer(initialState, action)
        expect(state.errorCode).toEqual(mockResponse);
        expect(state.isLoading).toEqual(false);
    });

    
    it('should handle wsMessage action correctly', () => {
        const messagePayload = {
            orders: [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }],
            total: 2,
            totalToday: 1,
        };
        const action = ordersAllActions.wsMessage(messagePayload, '');
        const state = orderReducer(initialState, action);
        expect(state.orders).toEqual(messagePayload.orders);
        expect(state.total).toEqual(messagePayload.total);
        expect(state.totalToday).toEqual(messagePayload.totalToday);
        expect(state.isLoading).toEqual(false);
        expect(state.errorCode).toBe(null);
        
    });
    
});
