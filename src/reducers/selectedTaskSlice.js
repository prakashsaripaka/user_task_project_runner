
import { createSlice } from '@reduxjs/toolkit';

const selectedTask = createSlice({
  name: "selectedTask",
  initialState: null,
  reducers: {
    setSelectedTaskAction: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedTaskAction } = selectedTask.actions;

export default selectedTask.reducer;