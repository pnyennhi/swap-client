import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Tabs } from "antd";
import queryString from "query-string";
import Axios from "../../Axios";
import OrderList from "./components/OrderList";

const { TabPane } = Tabs;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [statusIds, setStatusIds] = useState([]);
  const [current, setCurrent] = useState(0);
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
    Axios.get(`orders/seller?${current == 0 ? "" : `statusId=${current}`}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [current]);

  const onFinish = (values) => {
    const api = `orders/seller?${current == 0 ? "" : `statusId=${current}`}&${
      values.id ? queryString.stringify(values) : ""
    }`;

    Axios.get(api)
      .then((res) => {
        setOrders(res.data);
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

  const content = (
    <>
      <Form
        form={form}
        colon={false}
        onFinish={onFinish}
        initialValues={{
          id: "",
        }}
      >
        <Row gutter={24}>
          <Col lg={{ span: 8 }} key="id">
            <Form.Item name="id" label="Id">
              <Input />
            </Form.Item>
          </Col>
          <Col lg={{ span: 8 }} key="submit">
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <OrderList orders={orders} />
    </>
  );

  return (
    <div className="seller-order-list">
      <Tabs defaultActiveKey="0" onChange={(key) => handleChangeTab(key)}>
        <TabPane tab="Tất cả" key="0">
          {content}
        </TabPane>
        {statusIds.map((status) => (
          <TabPane tab={status.status} key={status.id}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default OrderManagement;
