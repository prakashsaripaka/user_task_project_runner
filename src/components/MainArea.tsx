import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Project from "./Project";
import Tasks from "./Tasks";
import Users from "./Users";

const MainArea: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
   if (location.pathname === "/") {
     navigate("/project");
   }
  }, [navigate, location.pathname]);

  return (
    <div className="main-area">
      <Routes>
        <Route path="/project" Component={Project}></Route>
        <Route path="/tasks" Component={Tasks}></Route>
        <Route path="/users" Component={Users}></Route>
      </Routes>
    </div>
  );
}

export default MainArea;