import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const EditableCell = ({
  dataIndex,
  title,
  inputType,
  record,
  index,
  isPreviewMode,
  ...restProps

}) => {
  return (
    <td {...restProps}>
        {isPreviewMode ? record[dataIndex] : <Input defaultValue={record[dataIndex]} />}
     
    </td>
  );
};

const KeyValueTable = ({ isPreviewMode }) => {
  const [data, setData] = useState([
    {
      key: "1",
      value: "Value 1",
    },
    {
      key: "2",
      value: "Value 2",
    },
  ]);

  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      render: (text, record) => (
        <EditableCell
          dataIndex="key"
          title="Key"
          inputType="text"
          record={record}
          isPreviewMode={isPreviewMode}
        />
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text, record) => (
        <EditableCell
          dataIndex="value"
          title="Value"
          inputType="text"
          record={record}
          isPreviewMode={isPreviewMode}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => deleteRow(record.key)}
          disabled={isPreviewMode}
        />
      ),
    },
  ];

  const addRow = () => {
    const newRow = {
      key: `New key ${data.length + 1}`,
      value: `New value ${data.length + 1}`,
    };
    setData([...data, newRow]);
  };

  const deleteRow = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Space style={{ marginBottom: "2rem", marginTop: "1rem" }}>
        
        {!isPreviewMode && (
        <Button onClick={addRow}>Add Row</Button>)}
      </Space>
    </div>
  );
};

export default KeyValueTable;
