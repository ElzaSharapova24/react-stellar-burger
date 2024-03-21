import { configureStore } from "@reduxjs/toolkit";
import {
    checkUserAuth,
    registerUser,
    routerReducers,
    logoutUser,
    authCheck,
    loginUser,
    updateUser,
    initialState
} from "./routerSlice";

describe("Reducers", () => {
    let store;
    
    beforeEach(() => {
        store = configureStore({
            reducer: {
                user: routerReducers,
            },
        });
    });
    
    it("should handle authCheck action", () => {
        const action = {type: authCheck.type };
        
        const result = routerReducers(initialState, action)
        expect(result.isAuthChecked).toEqual(true);
    });
    
    it("should handle checkUserAuth.fulfilled action", async () => {
        const mockUserData = { email: 'test@gmail.com', name: "User" };
        const action = checkUserAuth.fulfilled(mockUserData, '');
        const state = routerReducers(initialState, action);
        expect(state.authData).toBe(mockUserData)
        expect(state.loading).toBe(false)
        expect(state.error).toBe(null)
    });
    
    it("should handle registerUser.fulfilled action", async () => {
        const mockResponse = {
            accessToken: "mockAccessToken",
            refreshToken: "mockRefreshToken",
            email: 'test@gmail.com',
            name: "User",
        };
        const action = registerUser.fulfilled(mockResponse, '');
        const state = routerReducers(initialState, action);
        expect(state.authData).toEqual(mockResponse);
        expect(state.loading).toEqual(false);
        expect(state.error).toBe(null);
    });
    
    it("should handle loginUser.fulfilled action", async () => {
        const mockResponse = {
            accessToken: "mockAccessToken",
            refreshToken: "mockRefreshToken",
            email: 'test@gmail.com',
            name: "User",
        };
        const action = loginUser.fulfilled(mockResponse, '');
        const state = routerReducers(initialState, action);
        expect(state.authData).toEqual(mockResponse);
        expect(state.loading).toEqual(false);
        expect(state.error).toBe(null);
    });
    
    it("should handle logoutUser.fulfilled action", () => {
        store.dispatch(logoutUser.fulfilled());
        const { authData, loading, error } = store.getState().user;
        expect(authData).toBe(null);
        expect(loading).toEqual(false);
        expect(error).toBe(null);
    });
    
    it("should handle updateUser.fulfilled action", () => {
        const mockUserData = {
            name: "User",
            email: "test@gmail.com"
        };
        const action = updateUser.fulfilled(mockUserData, '');
        const state = routerReducers(initialState, action);
        expect(state.authData).toBe(mockUserData)
        expect(state.loading).toBe(false)
        expect(state.error).toBe(null)
        
    });
    
});
