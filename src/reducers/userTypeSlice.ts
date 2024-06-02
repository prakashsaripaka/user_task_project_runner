import { useDispatch } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface User {
  id: number;
  firstName: string;
  lastName: string;
  roles: string[];
  email: string;
  status: string;
}

let initialState = []
const storedData = localStorage.getItem("userData");
if (storedData) {
  const parsedData = JSON.parse(storedData);
  initialState = parsedData.users || [];
}


const userTypeSlice = createSlice({
  name: "userType",
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const newState = [...state, action.payload];
      localStorage.setItem("userData", JSON.stringify(newState));
      return newState;
    },
    editUser: (state, action: PayloadAction<User>) => {
      const newState = state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      localStorage.setItem("userData", JSON.stringify(newState));
      return newState;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const newState = state.filter((user) => user.id !== action.payload);
      localStorage.setItem("userData", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { actions: userTypeActions, reducer: userTypeReducer } = userTypeSlice;

export default userTypeReducer;