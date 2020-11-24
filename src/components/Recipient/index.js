/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Radio, Modal } from "antd";
import Axios from "axios";

const Recipient = ({
  recipient,
  recipients,
  showAdd,
  showList,
  setShowAdd,
  setShowList,
  onSelectRecipient,
  onAddRecipient,
}) => {
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allWards, setAllWards] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (showAdd) {
      Axios.get("http://localhost:3001/cities")
        .then((res) =>
          setCities(
            res.data.map((item) => ({
              ...item,
              label: item.city,
              value: item.id,
            }))
          )
        )
        .catch((err) => console.log(err));
      Axios.get("http://localhost:3001/districts")
        .then((res) =>
          setAllDistricts(
            res.data.map((item) => ({
              ...item,
              label: item.district,
              value: item.id,
            }))
          )
        )
        .catch((err) => console.log(err));
      Axios.get("http://localhost:3001/wards")
        .then((res) =>
          setAllWards(
            res.data.map((item) => ({
              ...item,
              label: item.ward,
              value: item.id,
            }))
          )
        )
        .catch((err) => console.log(err));
    }
  }, [showAdd]);

  return (
    <>
      <div className="title">
        <h5>Địa chỉ nhận hàng</h5>
        <div>
          <a className="mr-3" onClick={() => setShowList(true)}>
            Chọn địa chỉ khác
          </a>
          <a onClick={() => setShowAdd(true)}>Thêm địa chỉ mới</a>
        </div>
      </div>
      <div className="mt-3">
        {recipient ? (
          <>
            <h6>{recipient.name}</h6>
            <p>
              Địa chỉ: {recipient.address}, {recipient.ward.ward},{" "}
              {recipient.district.district}, {recipient.city.city}
            </p>
            <p>Điện thoại: {recipient.phone}</p>
          </>
        ) : (
          <p>Chưa có địa chỉ nhận hàng</p>
        )}
      </div>

      <Modal
        title="Danh sách địa chỉ"
        visible={showList}
        onOk={() => setShowList(false)}
        onCancel={() => setShowList(false)}
        className="recipient"
      >
        <Radio.Group
          onChange={(e) => onSelectRecipient(e.target.value)}
          value={recipient}
        >
          {recipients.map((recipient) => (
            <Radio value={recipient} className="mb-3">
              <h6>{recipient.name}</h6>
              <p>
                Địa chỉ: {recipient.address}, {recipient.ward.ward},{" "}
                {recipient.district.district}, {recipient.city.city}
              </p>
              <p>Điện thoại: {recipient.phone}</p>
            </Radio>
          ))}
        </Radio.Group>
      </Modal>
      <Modal
        title="Thêm địa chỉ"
        visible={showAdd}
        onOk={form.submit}
        onCancel={() => setShowAdd(false)}
        className="recipient"
      >
        <Form
          {...layout}
          form={form}
          onFinish={(values) => onAddRecipient(values)}
        >
          <Form.Item
            label="Tên người nhận"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên người nhận!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tỉnh, thành phố"
            name="cityId"
            rules={[
              { required: true, message: "Vui lòng chọn tỉnh, thành phố!" },
            ]}
          >
            <Select
              options={cities}
              onChange={(value) => {
                setDistricts(
                  allDistricts.filter((item) => item.cityId === value)
                );
              }}
            />
          </Form.Item>
          <Form.Item
            label="Quận, huyện"
            name="districtId"
            rules={[{ required: true, message: "Vui lòng chọn quận, huyện!" }]}
          >
            <Select
              options={districts}
              onChange={(value) => {
                setWards(allWards.filter((item) => item.districtId === value));
              }}
            />
          </Form.Item>
          <Form.Item
            label="Phường, xã"
            name="wardId"
            rules={[{ required: true, message: "Vui lòng chọn phường, xã!" }]}
          >
            <Select options={wards} />
          </Form.Item>
          <Form.Item
            label="Số nhà, đường"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Recipient;
