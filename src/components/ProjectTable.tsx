// ProjectTable.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Select, Drawer } from "antd";
import { ColumnsType } from 'antd/es/table';
import { UpOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';
import TaskForm from './TaskForm';
import { setSelectedTaskAction } from "../reducers/selectedTaskSlice";
import { projectActions } from "../reducers/ProjectSlice";

interface Task {
  key: string;
  name: string;
  result: string;
}

const ProjectTable: React.FC = ({ selectedUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const storeTasks = useSelector((state: any) => state.tasks);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.project);
  const availableTasks = storeTasks.filter(
    (task: Task) => !data.some((project: any) => project.key == task.id)
  );

  const columns: ColumnsType<Task> = [
    {
      title: "Reorder",
      key: "reorder",
      render: (text, record: Task, index: number) => (
        <div>
          <UpOutlined onClick={() => handleMove(index, -1)} />
          <DownOutlined onClick={() => handleMove(index, 1)} />
        </div>
      ),
    },
    {
      title: "Task Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record) => (
        <a
          href="#"
          onClick={(e) => {
            dispatch(setSelectedTaskAction(record));
            showDrawer(); // open the drawer
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record: Task) => (
        <DeleteOutlined onClick={() => handleDelete(record.key)}>
          Delete
        </DeleteOutlined>
      ),
    },
  ];

  const handleMove = (index: number, direction: number) => {
    const newData = [...data];
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newData.length) {
      const temp = newData[index];
      newData[index] = newData[targetIndex];
      newData[targetIndex] = temp;
      //setData(newData);
      dispatch(projectActions.setProjectData(newData));
    }
  };

  const handleDelete = (key: string) => {
    dispatch(projectActions.deleteTask(key));
  };

  const handleAdd = () => {
    if (selectedTask) {
      const taskToAdd = storeTasks.find((task) => task.id === selectedTask);
      if (taskToAdd) {
        const extendedObj = Object.assign(
          { result: "--", key: taskToAdd.id },
          taskToAdd
        );
        //setData((prevData) => [...prevData, extendedObj]);
        dispatch(projectActions.setProjectData([...data, extendedObj]));
        setIsModalVisible(false);
        setSelectedTask(null);
      }
    }
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
    dispatch(setSelectedTaskAction(null));
  };

  const getPermissions = (role) => {
    if (selectedUser && selectedUser.roles.includes(role)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Modal
        title="Add Task"
        visible={isModalVisible}
        onOk={handleAdd}
        onCancel={() => setIsModalVisible(false)}
      >
        <Select
          placeholder="Select a task"
          onChange={(value: string) => setSelectedTask(value)}
          style={{ width: "100%" }}
        >
          {availableTasks.map((task) => (
            <Select.Option key={task.id} value={task.id}>
              {task.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>
      <Drawer
        title="Create a new task"
        width={720}
        onClose={onClose}
        visible={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <TaskForm isPreviewMode={true} />
      </Drawer>
      <div className="table-content-wrapper">
        <Table columns={columns} dataSource={data} />
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          disabled={!getPermissions("Edit Project")}
        >
          Add
        </Button>
      </div>
    </>
  );
};


export default ProjectTable;