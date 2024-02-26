import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getUserRequest, loginRequest, logoutUserRequest, registerRequest} from "../../utils/api";
import {checkResponse} from "../../utils/utils";
import {getActionName, isActionPending, isActionRejected} from "../../utils/redux";
import {setCookie} from "../../utils/cookie";

export const sliceName = "user";


const initialState = {
  isAuthChecked: false,
  authData: null,
  
  registerUserError: null,
  registerUserRequest: false,
  
  loginUserError: null,
  loginUserRequest: false,
  
  getUserError: null,
  getUserRequest: false,
}

export const checkUserAuth = createAsyncThunk(
  `${sliceName}/checkUserAuth`,
  async function (_ ) {
    return await getUserRequest().then(checkResponse);
  }
);

export const registerUser = createAsyncThunk(
  `${sliceName}/registerUser`,
  async function (payload) {
    return await registerRequest(payload.authData).then(checkResponse);
  }
);

export const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,
  async function (payload) {
    return await loginRequest(payload.authData).then(checkResponse);
  }
);

export const logoutUser = createAsyncThunk(
  `${sliceName}/logoutUser`,
  async function () {
    return await logoutUserRequest().then(checkResponse);
  }
);


export const routerSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    authCheck: state => {
      state.isAuthChecked = true
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.getUserRequest = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authData = action.payload;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('refreshToken', action.payload.refreshToken);
        state.registerUserRequest = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authData = action.payload;
        setCookie('accessToken', action.payload.accessToken);
        setCookie('refreshToken', action.payload.refreshToken);
        state.loginUserRequest = false;
      })
    
      .addMatcher(isActionPending(routerSlice.name), (state, action) => {
        state[`${getActionName(action.type)}Request`] = true;
        state[`${getActionName(action.type)}Error`] = null;
      })
  
      .addMatcher(isActionRejected(routerSlice.name), (state, action) => {
        state[`${getActionName(action.type)}Error`] = action.payload;
        state[`${getActionName(action.type)}Request`] = false;
      })
  
  }
})

export const {
  authCheck
} = routerSlice.actions;

export const routeReducers = routerSlice.reducer;
