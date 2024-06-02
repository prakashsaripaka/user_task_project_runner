// Users.tsx
import React from "react";
import UserTable from "./UserTable";
import { useSelector } from "react-redux";


const Users: React.FC = () => {

  const selectedUser = useSelector((state) => state.user);
  console.log("selectedUser", selectedUser)
  return <UserTable selectedUser={selectedUser} />;
};

export default Users;
