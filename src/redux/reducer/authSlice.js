import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  value: {},
  loading: false,
  error: '',
  status: 0
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGIN_REQUEST: (state) => {
      state.loading = true;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
      state.value = action.payload;
    },
    LOGIN_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CHECK_STATUS: (state, action) =>{
      state.status = action.payload;
    }
  },
})

export const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CHECK_STATUS} = authSlice.actions

export default authSlice.reducer