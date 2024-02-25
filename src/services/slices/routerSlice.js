import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getUserRequest, loginRequest, registerRequest} from "../../utils/api";
import {checkResponse} from "../../utils/utils";
import {getActionName, isActionPending, isActionRejected} from "../../utils/redux";

export const sliceName = "user";


const initialState = {
  isAuthChecked: false,
  data: null,
  
  registerUserError: null,
  registerUserRequest: false,
  
  loginUserError: null,
  loginUserRequest: false,
  
  getUserError: null,
  getUserRequest: false,
}

export const checkUserAuth = createAsyncThunk(
  `${sliceName}/checkUserAuth`,
  async function (_ , {dispatch}) {
    return await getUserRequest().then(checkResponse);
  }
);

export const registerUser = createAsyncThunk(
  `${sliceName}/registerUser`,
  async function (_) {
    return await registerRequest().then(checkResponse);
  }
);

export const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,
  async function (_) {
    return await loginRequest().then(checkResponse);
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
        state.data = action.payload;
        state.getUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
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
