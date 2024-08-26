import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  value: [],
  loading: false,
  error: '',
  status: 0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    USER_REQUEST: (state) => {
      state.loading = true;
    },
    USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.value = action.payload;
    },
    USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

export const { USER_REQUEST, USER_SUCCESS, USER_FAIL} = userSlice.actions

export default userSlice.reducer