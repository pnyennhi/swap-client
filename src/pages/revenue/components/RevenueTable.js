import React from "react";
import { Table } from "antd";

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
        <p>{record.updatedAt.toLocaleDateString("en-GB")}</p>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (text, record) => <p>{record.status.status}</p>,
    },
    {
      title: "Số tiền",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <Table className="revenue-table" columns={columns} dataSource={orders} />
  );
};

export default RevenueTable;
