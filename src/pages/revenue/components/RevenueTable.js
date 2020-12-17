import React from "react";
import { Table, Tag } from "antd";

const RevenueTable = ({ orders }) => {
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Người mua",
      key: "userId",
      render: (text, record) => <p>{record.user.email}</p>,
    },
    {
      title: "Thời gian",
      key: "paidTime",
      render: (text, record) => (
        <p>{new Date(record.updatedAt).toLocaleDateString("en-GB")}</p>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (text, record) => (
        <Tag color="#56c168">{record.status.status}</Tag>
      ),
    },
    {
      title: "Số tiền",
      key: "total",
      render: (text, record) => <strong>$ {record.total}</strong>,
    },
  ];

  return (
    <Table className="revenue-table" columns={columns} dataSource={orders} />
  );
};

export default RevenueTable;
