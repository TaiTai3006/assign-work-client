import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  loading: false,
  error: "",
  status: 0,
  task_user: [],
  message: "",
};

export const assgin_taskSlice = createSlice({
  name: "assign_task",
  initialState,
  reducers: {
    ASSIGN_TASK_REQUEST: (state) => {
      state.loading = true;
    },
    ASSIGN_TASK_SUCCESS: (state, action) => {
      state.loading = false;
      state.value = action.payload;
    },
    ASSIGN_TASK_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    TASK_USER: (state, action) => {
      state.task_user = action.payload;
    },
    COMPLETED_TASK_REQUEST: (state) => {
      state.loading = true;
    },
    COMPLETED_TASK_SUCCESS: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    COMPLETED_TASK_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    SEND_TASK_REQUEST: (state) => {
      state.loading = true;
    },
    SEND_TASK_SUCCESS: (state, action) => {
      state.loading = false;
    },
    SEND_TASK_FAIL: (state, action) => {
      state.loading = false;
    },

  },
});

export const {
  ASSIGN_TASK_REQUEST,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_FAIL,
  TASK_USER,
  COMPLETED_TASK_REQUEST,
  COMPLETED_TASK_SUCCESS,
  COMPLETED_TASK_FAIL,
  SEND_TASK_REQUEST,
  SEND_TASK_SUCCESS,
  SEND_TASK_FAIL,
} = assgin_taskSlice.actions;

export default assgin_taskSlice.reducer;
