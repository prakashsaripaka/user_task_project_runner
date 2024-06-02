import React from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { Task } from "./types";
import KeyValueTable from "./KeyValueTable";
import { useSelector } from "react-redux";

const { Option } = Select;

interface TaskFormProps {
  task?: Task;
  onFinish: (values: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onFinish, isPreviewMode }) => {
  const [form] = Form.useForm();
  const task = useSelector((state) => state.selectedTask);
  
  if (task) {
    form.setFieldsValue({
      title: task?.name || "",
      description: task?.description || "",
      type: task?.type || "",
      updateDate: task?.updateDate || "",
    });
  }

  const handleSubmit = (values) => {
    onFinish(values);
    form.resetFields(); 
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="title"
        label="Task name"
        rules={[{ required: true, message: "Please enter the task name" }]}
      >
        <Input placeholder="Enter task name" disabled={isPreviewMode} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please enter the task description" },
        ]}
      >
        <Input.TextArea
          rows={4}
          placeholder="Enter task description"
          disabled={isPreviewMode}
        />
      </Form.Item>
      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: "Please select the task type" }]}
      >
        <Select placeholder="Select a type" disabled={isPreviewMode}>
          <Option value="set-status">set-status</Option>
          <Option value="run">run</Option>
          <Option value="delete">delete</Option>
          <Option value="create">create</Option>
          <Option value="modify">modify</Option>
        </Select>
      </Form.Item>
      {task && (
        <Form.Item name="updateDate" label="Update Date">
          <Input disabled />
        </Form.Item>
      )}

      {task && <KeyValueTable data={task.data} isPreviewMode={isPreviewMode} />}
      {!isPreviewMode && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {task ? "Save Task" : "Create Task"}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default TaskForm;
