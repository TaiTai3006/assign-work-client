import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import taskReducer from "./reducer/task.reducer";
import assign_taskReducer from "./reducer/assign-taskSlice";
import userReducer from "./reducer/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    assign_task: assign_taskReducer,
    user: userReducer,
  },
});
