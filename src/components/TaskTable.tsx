import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Space, Popconfirm, message, Button, Drawer, Form } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { deleteTask, addTask, updateTask } from "../reducers/taskSlice";
import { setSelectedTaskAction } from "../reducers/selectedTaskSlice";
import TaskForm from "./TaskForm";
import { Task } from "./types";
//import "./TaskTable.css";

const TaskTable: React.FC = () => {
  const tasks = useSelector((state) => state.tasks);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  /// const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const selectedTask = useSelector((state) => state.selectedTask);
  const selectedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const getPermissions = (role) => {
    if (selectedUser && selectedUser.roles.includes(role)) {
      return true;
    }
    return false;
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
    dispatch(setSelectedTaskAction(null));
  };

  const editTask = (task: Task, previewMode) => {
    // setSelectedTask(task); // set the selected task
    dispatch(setSelectedTaskAction(task));
    setIsPreviewMode(previewMode);
    showDrawer(); // open the drawer
  };

  const onFinish = (values: any) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    const task = {
      id: selectedTask ? selectedTask.id : Date.now(),
      name: values.title,
      description: values.description,
      updateDate: formattedDate,
      type: values.type,
    };
    if (selectedTask) {
      // Update the task in the store and in localStorage
      dispatch(updateTask(task));
    } else {
      // Add the task to the store and to localStorage
      dispatch(addTask(task));
    }
    onClose();
  };

  const columns = [
    {
      title: "Task Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a onClick={() => editTask(record, true)}>{text}</a>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Update Date",
      dataIndex: "updateDate",
      key: "updateDate",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => {
              editTask(record);
              //console.log("edit")
            }}
            disabled={!getPermissions("Edit Tasks")}
          />
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: "red" }}
              disabled={!getPermissions("Delete Tasks")}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="table-container">
      <div className="user-header">
        <h1>Tasks</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showDrawer}
          style={{ marginBottom: 16 }}
          disabled={!getPermissions("Edit Tasks")}
        >
          Add Task
        </Button>
      </div>

      <Drawer
        title="Create a new task"
        width={720}
        onClose={onClose}
        visible={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <TaskForm isPreviewMode={isPreviewMode} onFinish={onFinish} />
      </Drawer>
      <div className="table-content-wrapper">
        <Table columns={columns} dataSource={tasks} rowKey="id" />
      </div>
    </div>
  );
};

export default TaskTable;
