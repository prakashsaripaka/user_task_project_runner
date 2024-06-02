// ProjectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  key: string;
  name: string;
  result: string;
}

let initialData = [];
const storedProjectData = localStorage.getItem("projectData");
if (storedProjectData) {
  const parsedData = JSON.parse(storedProjectData);
  initialData = parsedData.project || [];
}


const projectSlice = createSlice({
  name: "project",
  initialState: initialData,
  reducers: {
    setProjectData: (state, action: PayloadAction<Task[]>) => {
      const newState = action.payload;
      localStorage.setItem("projectData", JSON.stringify(newState));
      return newState;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const newState = state.filter((task) => task.key !== action.payload);
      localStorage.setItem("projectData", JSON.stringify(newState));
      return newState;
    },
    runTask: (state) => {
      const newState = state.map((task) => ({
        ...task,
        result: (Math.random() * 2000).toFixed(2) + "%",
      }));
      localStorage.setItem("projectData", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { actions: projectActions, reducer: projectReducer } = projectSlice;

export default projectReducer;