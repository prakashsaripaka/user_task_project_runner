// Toolbar.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/userSlice";
import { Form, Select } from "antd";
const { Option } = Select;

const Toolbar: React.FC = () => {
  const users = useSelector((state) => state.userType);
  const dispatch = useDispatch();

  const handleUserSelect = (value) => {
    const selectedUser = users.find((user) => user.id === value);
    dispatch(setUser(selectedUser));
  };

  return (
    <div className="header-wrapper">
      <Form.Item label="Username" style={{ margin: 0 }}>
        <Select
          labelId="username-label"
          style={{ width: 200 }}
          defaultValue="Super User"
          onChange={handleUserSelect}
        >
          {users.map((user, index) => (
            <Option key={index} value={user.id}>
              {user.firstName} {user.lastName}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default Toolbar;
