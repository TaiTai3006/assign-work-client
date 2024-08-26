import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  value: [],
  loading: false,
  error: '',
  status: 0
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    TASK_REQUEST: (state) => {
      state.loading = true;
    },
    TASK_SUCCESS: (state, action) => {
      state.loading = false;
      state.value = action.payload;
    },
    TASK_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})

export const { TASK_REQUEST, TASK_SUCCESS, TASK_FAIL} = taskSlice.actions

export default taskSlice.reducer