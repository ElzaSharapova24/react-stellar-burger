import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {logoutUserRequest, registerUserRequest} from "../../utils/api";
import {checkResponse} from "../../utils/utils";


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

export const registerUser = createAsyncThunk(
  `${sliceName}/registerUser`,
  async function (_) {
    return await registerUserRequest().then(checkResponse);
  }
);

export const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,
  async function (_) {
    return await logoutUserRequest().then(checkResponse);
  }
);



export const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    authCheck: state => {
      state.isAuthChecked = true
    },
  },
  extraReducers: builder => {
    builder
      .addCase()
  }
})


export const { authCheck } = userSlice.reducer;


export default userSlice.reducer;
