import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {checkResponse} from "../../utils/utils";
import {useDispatch} from "react-redux";
import {getIngredientsRequest} from "../../utils/api";

export const sliceName = "user";
// eslint-disable-next-line react-hooks/rules-of-hooks
const dispatch = useDispatch();

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

export const checkUserAuth = createAsyncThunk(
    `${sliceName}/checkUserAuth`,
  async function (_,{extra: api}) {
    return await getIngredientsRequest().then(checkResponse);
    dispatch(authCheck())
  }
);


export const { authCheck } = userSlice.reducer;


export default userSlice.reducer;
