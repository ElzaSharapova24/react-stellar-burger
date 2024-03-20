import { configureStore } from "@reduxjs/toolkit";
import { routerSlice, initialState, checkUserAuth, loginUser } from "./routerSlice";

describe("Router slice tests", () => {
    let store;
    
    beforeEach(() => {
        store = configureStore({
            reducer: { user: routerSlice.reducer },
        });
    });
    
    it("should have correct initial state", () => {
        expect(store.getState().user).toEqual(initialState);
    });
    
    it("should handle checkUserAuth fulfilled", async () => {
        await store.dispatch(checkUserAuth());
        const { user } = store.getState();
        expect(user.loading).toEqual(false);
        expect(user.error).toBeNull();
        // Add more assertions as per your logic
    });
    
    it("should handle loginUser fulfilled", async () => {
        const loginData = { username: "testuser", password: "testpassword" }; // Change as needed
        await store.dispatch(loginUser(loginData));
        const { user } = store.getState();
        expect(user.loading).toEqual(false);
        expect(user.error).toBeNull();
        // Add more assertions as per your logic
    });
    
});
