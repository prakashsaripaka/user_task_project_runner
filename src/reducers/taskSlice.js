import { createSlice } from '@reduxjs/toolkit';

let initialState = []
const storedTaskData = localStorage.getItem("taskData");
if (storedTaskData) {
  const parsedTaskData = JSON.parse(storedTaskData);
  initialState = parsedTaskData.tasks || [];
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("taskData", JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem("taskData", JSON.stringify(state));
      }
    },
    updateTask: (state, action) => {
      const index = state.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
      localStorage.setItem("taskData", JSON.stringify(state));
    },
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;