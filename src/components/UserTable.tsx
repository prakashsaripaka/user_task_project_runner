// UserTable.tsx
import React, { useEffect, useState } from "react";
import { Table, Space, Popconfirm, message, Button, Drawer, Form } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import UserForm from "./UserForm";
import { useSelector, useDispatch } from "react-redux";
import { userTypeActions } from "../reducers/userTypeSlice";
import { setUser } from "../reducers/userSlice";

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => roles.join(", "),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => editUser(record)}
            disabled={!getPermissions("Edit Users")}
          />
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => deleteRow(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: "red" }}
              disabled={!getPermissions("Delete Users")}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  //const [users, setUsers] = useState([]);
  const users = useSelector((state) => state.userType);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);
  const selectedUser = useSelector((state) => state.user);

  const deleteRow = (id) => {
    dispatch(userTypeActions.deleteUser(id));
    message.success("User deleted successfully");
  };

  const addUser = (values) => {
    if (editingUser) {
      const updatedUsers = users.find((user) => user.id === editingUser.id);
      dispatch(userTypeActions.editUser({ ...updatedUsers, ...values }));
      dispatch(setUser({ ...updatedUsers, ...values }));
      message.success("User updated successfully");
    } else {
      const newUser = { id: users.length + 1, ...values };
      dispatch(userTypeActions.addUser(newUser));
      message.success("User added successfully");
    }
    setDrawerVisible(false);
    form.resetFields();
    setEditingUser(null);
  };

  const editUser = (user) => {
    form.setFieldsValue(user);
    setEditingUser(user);
    setDrawerVisible(true);
  };

  const getPermissions = (role) => {
    if (selectedUser && selectedUser.roles.includes(role)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className="user-header">
        <h1>Users</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerVisible(true)}
          style={{ marginBottom: 16 }}
          disabled={!getPermissions("Edit Users")}
        >
          Add User
        </Button>
      </div>

      <Drawer
        title="Add a new user"
        width={720}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <UserForm form={form} onFinish={addUser} />
      </Drawer>
      <div className="table-content-wrapper">
        <Table columns={columns} dataSource={users} rowKey="id" />
      </div>
    </div>
  );
};

export default UserTable;
