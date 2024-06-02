import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import taskReducer from "./reducers/taskSlice";
import selectedTaskReducer from './reducers/selectedTaskSlice';
import projectReducer from './reducers/ProjectSlice';
import userTypeReducer from "./reducers/userTypeSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
    selectedTask: selectedTaskReducer,
    project: projectReducer,
    userType: userTypeReducer,
  },
});