import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import MainArea from "./components/MainArea";
import "./styles.css";
const userData = {
  users: [
    {
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
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      roles: [
        "View Project",
        "Edit Project",
        "Run Project",
        "View Tasks",
        "Edit Tasks",
        "Delete Tasks",
        "View Users",
        "Edit Users",
      ],
      email: "john.doe@example.com",
      status: "active",
    },
    {
      id: 3,
      firstName: "Jane",
      lastName: "Doe",
      roles: ["View Project", "View Tasks", "View Users"],
      email: "jane.doe@example.com",
      status: "inactive",
    },
    {
      id: 4,
      firstName: "Bob",
      lastName: "Smith",
      roles: [
        "View Project",
        "Edit Project",
        "Run Project",
        "View Tasks",
        "Delete Tasks",
        "Delete Users",
      ],
      email: "bob.smith@example.com",
      status: "active",
    },
  ],
};

const taskData = {
  tasks: [
    {
      id: 1,
      name: "Task 1",
      description: "This is task 1",
      updateDate: "2022-01-01",
      type: "set-status",
    },
    {
      id: 2,
      name: "Task 2",
      description: "This is task 2",
      updateDate: "2022-01-02",
      type: "run",
    },
    {
      id: 3,
      name: "Task 3",
      description: "This is task 3",
      updateDate: "2022-01-03",
      type: "delete",
    },
    {
      id: 4,
      name: "Task 4",
      description: "This is task 4",
      updateDate: "2022-01-04",
      type: "create",
    },
    {
      id: 5,
      name: "Task 5",
      description: "This is task 5",
      updateDate: "2022-01-05",
      type: "modify",
    },
  ],
};

const projectData = {
  project: [
    {
      key: "999",
      name: "Sample Task : Click on add button to select from task list",
      result: "--",
    },
  ],
};

const App: React.FC = () => {
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("taskData", JSON.stringify(taskData));
    localStorage.setItem("projectData", JSON.stringify(projectData));
  }, []);

  return (
    <Router>
      <div className="app">
        <Toolbar />
        <div className="app-body">
          <Sidebar />
          <MainArea />
        </div>
      </div>
    </Router>
  );
};

export default App;
