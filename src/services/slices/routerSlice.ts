import {
    createSlice,
    SerializedError,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import {
    getUserRequest,
    loginRequest,
    logoutUserRequest,
    registerRequest,
    updateUserRequest,
} from "../../utils/api";
import { checkResponse } from "../../utils/utils";
import {
    isActionPending,
    isActionRejected, RejectedAction,
} from "../../utils/redux";
import { deleteCookie, setCookie } from "../../utils/cookie";
import {
    UserDto,
    UserLoginDto,
    UserRegisterDto,
} from "../../types/slice-types";
import { GetUserResponse, UserRefreshToken, UserResponseToken} from "../../types/api-types";
import {PayloadCreator} from "../hooks";

export const sliceName = "user";

export interface TUserState {
    isAuthChecked: boolean;
    authData: GetUserResponse | null;
    loading: boolean;
    error: SerializedError | null | unknown;
}

export const initialState: TUserState = {
    isAuthChecked: false,
    authData: null,
    loading: false,
    error: null
};

export const checkUserAuth = createAsyncThunk<GetUserResponse>(
    `${sliceName}/checkUserAuth`,
    PayloadCreator<GetUserResponse, void>(async function () {
        return await getUserRequest().then(checkResponse<GetUserResponse>);
    })
);

export const registerUser = createAsyncThunk<UserResponseToken, UserRegisterDto>(
    `${sliceName}/registerUser`,
    PayloadCreator<UserResponseToken, UserRegisterDto>(async function (payload) {
        return await registerRequest(payload).then(checkResponse<UserResponseToken>);
    })
);

export const loginUser = createAsyncThunk<UserResponseToken, UserLoginDto>(
    `${sliceName}/loginUser`,
    PayloadCreator<UserResponseToken, UserLoginDto>(async function (payload){
        return await loginRequest(payload).then(checkResponse<UserResponseToken>);
    })
);

export const logoutUser = createAsyncThunk<UserRefreshToken>(
    `${sliceName}/logoutUser`,
    PayloadCreator<UserRefreshToken, void>(async function () {
        return await logoutUserRequest().then(checkResponse<UserRefreshToken>);
    })
);

export const updateUser = createAsyncThunk<GetUserResponse, UserDto>(
    `${sliceName}/updateUser`,
    PayloadCreator<GetUserResponse, UserDto>(async function (payload) {
        return await updateUserRequest(payload).then(checkResponse<GetUserResponse>);
    })
);

export const routerSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        authCheck: (state) => {
            state.isAuthChecked = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserAuth.fulfilled, (state, action) => {
                state.authData = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.authData = action.payload;
                setCookie("accessToken", action.payload.accessToken);
                setCookie("refreshToken", action.payload.refreshToken);
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authData = action.payload;
                setCookie("accessToken", action.payload.accessToken);
                setCookie("refreshToken", action.payload.refreshToken);
                state.loading = false;
                state.error = null;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.authData = null;
                deleteCookie("refreshToken");
                deleteCookie("accessToken");
                state.loading = false;
                state.error = null;
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                state.authData = action.payload;
                state.loading = false;
                state.error = null;
            })

            .addMatcher(isActionPending(routerSlice.name), (state) => {
                state.loading = true;
                state.error = null;
            })

            .addMatcher(isActionRejected(routerSlice.name), (state, action:RejectedAction) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { authCheck } = routerSlice.actions;

export const routerReducers = routerSlice.reducer;
