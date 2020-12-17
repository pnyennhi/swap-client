import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import withdraw from "../../../assets/images/withdraw.png";
import deposit from "../../../assets/images/deposit.png";
import { TRANSACTION_STATUS } from "../../../constants";

const TransactionTable = ({ transactions }) => {
  const columns = [
    {
      title: "Ngày",
      key: "createdAt",
      render: (text, record) => (
        <p>{new Date(record.createdAt).toLocaleDateString("en-gb")}</p>
      ),
    },
    {
      title: "Loại giao dịch | Mô tả",
      key: "type",
      render: (text, record) => (
        <div className="flex align-items-center transaction-type">
          <img
            width={30}
            height={30}
            src={record.type === "withdraw" ? withdraw : deposit}
            alt="withdraw"
          />
          <div className="ml-2">
            <p className="font-weight-600 mb-1">
              {record.type === "withdraw"
                ? "Rút tiền"
                : record.type === "refund"
                ? `Hoàn tiền cho đơn hàng ${record.orderId}`
                : `Thu tiền cho đơn hàng ${record.orderId}`}
            </p>
            <p className="font-size-12" style={{ color: "#777" }}>
              Đến{" "}
              {record.type === "withdraw"
                ? record.paypalPayoutEmail
                : "Ví của tôi"}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Tình trạng",
      key: "status",
      render: (text, record) => {
        const status = TRANSACTION_STATUS.find(
          (item) => item.value === record.status
        );
        return <Tag color={status.color}>{status.status}</Tag>;
      },
    },
    {
      title: "Số tiền",
      key: "amount",
      render: (text, record) => <strong>$ {record.amount}</strong>,
    },
  ];

  return (
    <Table
      className="transaction-table"
      columns={columns}
      dataSource={transactions}
    />
  );
};

export default TransactionTable;
