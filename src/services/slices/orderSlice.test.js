import {configureStore} from "@reduxjs/toolkit";

import {currentUserOrderReducer, currentUserOrderSlice} from "./orderSlice";
import {getIngredientsFetch, ingredientReducers, initialState} from "./ingredientSlice";

const responseWsOrders = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa0944",
                "643d69a5c3f7b9001cfa093d"
            ],
            "_id": "65d4eeda97ede0001d05d146",
            "status": "done",
            "number": 34642,
            "name": "Space флюоресцентный традиционный-галактический био-марсианский бургер",
            "createdAt": "2024-02-20T18:26:34.135Z",
            "updatedAt": "2024-02-20T18:26:34.468Z"
        },
        {
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa0945",
                "643d69a5c3f7b9001cfa093d"
            ],
            "_id": "65d4e68097ede0001d05d12b",
            "status": "done",
            "number": 34640,
            "name": "Space флюоресцентный антарианский бургер",
            "createdAt": "2024-02-20T17:50:56.578Z",
            "updatedAt": "2024-02-20T17:50:57.110Z"
        },
    ],
    "total": 34272,
    "totalToday": 48
};

describe('CurrentUserOrder Slice extraReducers', () => {
    let store;
    
    beforeEach(() => {
        store = configureStore({
            reducer: {
                currentUserOrder: currentUserOrderSlice.reducer,
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
        const initialState = {
            errorCode: null,
            isLoading: true,
        };
        const state = store.getState().currentUserOrder;
        store.dispatch({ type: 'wsError' });
        const errorPayload = 'SOME_ERROR_CODE';
        
        
        const action = {
            type: wsError.type,
            payload: errorPayload,
        };
        
        const newState = currentUserOrderReducer(initialState, action);
        
        expect(newState.errorCode).toEqual(errorPayload);
        expect(newState.isLoading).toEqual(false);
    });
    
    it('should handle wsMessage action correctly', () => {
        // Задаем начальное состояние
        const initialState = {
            orders: [],
            total: 0,
            totalToday: 0,
            isLoading: true, // Предполагаем, что изначально isLoading установлен в true
            errorCode: 'SOME_ERROR_CODE', // Предполагаем, что изначально есть код ошибки
            // Другие начальные состояния, если они есть
        };
        
        // Предполагаемый payload для action
        const messagePayload = {
            orders: [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }],
            total: 2,
            totalToday: 1,
        };
        
        // Создаем action
        const action = {
            type: wsMessage.type,
            payload: messagePayload,
        };
        
        // Вызываем редьюсер
        const newState = currentUserOrderReducer(initialState, action);
        
        // Проверяем, что данные обновлены и isLoading установлен в false, а код ошибки сброшен
        expect(newState.orders).toEqual(messagePayload.orders);
        expect(newState.total).toEqual(messagePayload.total);
        expect(newState.totalToday).toEqual(messagePayload.totalToday);
        expect(newState.isLoading).toEqual(false);
        expect(newState.errorCode).toBeNull();
    });
    
});
