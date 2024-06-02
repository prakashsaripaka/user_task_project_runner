import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const UserForm = ({ form, onFinish }) => {
  const roles = [
    'View Project',
    'Edit Project',
    'Run Project',
    'View Tasks',
    'Edit Tasks',
    'Delete Tasks',
    'View Users',
    'Edit Users',
    'Delete Users'
  ];

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please enter the first name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please enter the last name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please enter the email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select the status" }]}
      >
        <Select>
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="roles"
        label="Roles"
        rules={[{ required: true, message: "Please select at least one role" }]}
      >
        <Select mode="multiple" placeholder="Select roles">
          {roles.map((role, index) => (
            <Select.Option key={index} value={role}>
              {role}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UserForm;