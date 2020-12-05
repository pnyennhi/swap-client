import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Tabs, Pagination } from "antd";
import queryString from "query-string";
import Axios from "../../Axios";
import OrderList from "./components/OrderList";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const { TabPane } = Tabs;
const LIMIT = 10;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [statusIds, setStatusIds] = useState([]);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({ id: null });

  const [form] = Form.useForm();

  useEffect(() => {
    Axios.get(`orderStatus`)
      .then((res) => {
        setStatusIds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    Axios.get(
      `orders/seller?page=${page}&pageSize=${LIMIT}&${
        current == 0 ? "" : `statusId=${current}`
      }`
    )
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [current]);

  const onFinish = (value) => {
    const api = `orders/seller?page=${page}&pageSize=${LIMIT}&${
      current == 0 ? "" : `statusId=${current}`
    }&${value !== "" ? `id=${value}` : ""}`;

    Axios.get(api)
      .then((res) => {
        setOrders(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
    // setSearch(values);
  };

  const handleChangeTab = (key) => {
    setCurrent(key);
    // setSearch({ id: null });
    form.resetFields();
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      Axios.get(
        `orders/seller?page=${page}&pageSize=${LIMIT}&${
          current == 0 ? "" : `statusId=${current}`
        }`
      )
        .then((res) => {
          console.log(res.data);
          setOrders(res.data.data);
          setTotal(res.data.total);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const content = (
    <>
      <Search
        className="mb-3"
        placeholder="Tìm theo mã đơn hàng"
        onSearch={onFinish}
        onChange={(e) => handleChange(e)}
        style={{ width: "100%" }}
        allowClear
      />

      <OrderList orders={orders} />
      <div className="flex justify-content-end">
        <Pagination className="mt-4" current={page} total={total} />
      </div>
    </>
  );

  return (
    <div className="seller-order-item">
      <Tabs defaultActiveKey="0" onChange={(key) => handleChangeTab(key)}>
        <TabPane tab={`Tất cả ${current === 0 ? `(${total})` : ""}`} key="0">
          {content}
        </TabPane>
        {statusIds.map((status) => (
          <TabPane
            tab={`${status.status} ${
              current == status.id ? `(${orders.length})` : ""
            }`}
            key={status.id}
          >
            {content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default OrderManagement;
