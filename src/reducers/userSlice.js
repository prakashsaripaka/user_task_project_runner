// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 1,
    firstName: "Super",
    lastName: "User",
    roles: [
      "View Project",
      "Edit Project",
      "Run Project",
      "View Tasks",
      "Edit Tasks",
      "Delete Tasks",
      "View Users",
      "Edit Users",
      "Delete Users",
    ],
    email: "super.user@example.com",
    status: "active",
  },
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;