/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Table, Space } from "antd";
import { EditFilled, MinusCircleOutlined } from "@ant-design/icons";
import Product from "../../../components/Product-Row";

const ProductTable = ({ dataSource }) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Name",
      key: "name",
      render: (record) => (
        <Product
          name={record.name}
          size={record.size}
          imageSrc={record.coverImage}
          id={record.id}
          link={`/seller/products/edit/${record.id}`}
        />
      ),
    },
    {
      title: "Phân loại",
      key: "category",
      render: (record) => (
        <p>
          {record.category.parent.category} / {record.category.subCategory}
        </p>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Đã bán",
      dataIndex: "soldQuantity",
      key: "soldQuantity",
      sorter: (a, b) => a.soldQuantity - b.soldQuantity,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a title="Sửa">
            <EditFilled style={{ color: "#f1b224", fontSize: "16px" }} />
          </a>
          <a title="Ẩn">
            <MinusCircleOutlined style={{ color: "red", fontSize: "16px" }} />
          </a>
        </Space>
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default ProductTable;
