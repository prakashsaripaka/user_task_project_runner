import React from "react";
import { Collapse } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const { Panel } = Collapse;

const Sidebar: React.FC = () => {
  const selectedUser = useSelector((state) => state.user);
  const getPermissions = (role) => {
    if (selectedUser && selectedUser.roles.includes(role)) {
      return true;
     }
    return false;
  };

  return (
    <div className="sidebar">
      <Collapse defaultActiveKey={["1"]} ghost>
        <Panel header="Take Home Task" key="1" className="panel-header">
          <li>
            <Link to="/project" disabled={!getPermissions("View Project")}>
              Project
            </Link>
          </li>
          <li>
            <Link to="/tasks" disabled={!getPermissions("View Tasks")}>Tasks</Link>
          </li>
          <li>
            <Link to="/users" disabled={!getPermissions("View Users")}>Users</Link>
          </li>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Sidebar;
