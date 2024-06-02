import React from 'react';
import { Form, InputNumber, DatePicker, Button } from 'antd';
import ProjectTable from './ProjectTable';
import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "../reducers/ProjectSlice";

const Project: React.FC = () => {
    const dispatch = useDispatch();
    const handleRun = () => {
       dispatch(projectActions.runTask());
    };
    const selectedUser = useSelector((state) => state.user);
    const getPermissions = (role) => {
      if (selectedUser && selectedUser.roles.includes(role)) {
        return true;
      }
      return false;
    };

    return (
      <div>
        <div className="user-header">
          <h1>Project</h1>
        </div>
        <Form
          layout="horizontal"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="left-items">
            <Form.Item label="Base line" className="top-fields">
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item label="Cut-off date" className="top-fields">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Rate Limit" className="top-fields">
              <InputNumber min={0} />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              onClick={() => handleRun()}
              disabled={!getPermissions("Run Project")}
            >
              Run
            </Button>
          </Form.Item>
        </Form>
        <ProjectTable selectedUser={selectedUser} />
      </div>
    );
};

export default Project;