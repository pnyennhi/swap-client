/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Tag } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Axios from "axios";

const RecipientItem = ({
  recipients,
  recipient,
  editedRecipient,
  showAdd,
  setShowAdd,
  onSelectRecipient,
  onAddRecipient,
  onSetDefault,
  onSetEditedRecipient,
  onEdit,
  onDelete,
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
    // if (showAdd) {
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
    // }
  }, [showAdd, editedRecipient]);

  useEffect(() => {
    if (editedRecipient) {
      form.setFieldsValue(editedRecipient);
      setDistricts(
        allDistricts.filter((item) => item.cityId === editedRecipient.cityId)
      );
      setWards(
        allWards.filter(
          (item) => item.districtId === editedRecipient.districtId
        )
      );
    }
  }, [showAdd, editedRecipient]);

  return (
    <>
      <div className="mt-4">
        <a className="a-orange" onClick={() => setShowAdd(true)}>
          <PlusCircleOutlined /> Thêm địa chỉ nhận hàng mới
        </a>
      </div>
      <div className="row mt-4">
        {recipients.map((reci, index) => (
          <div key={index} className="col-lg-6 col-12 mb-4 pos--relative">
            <div
              className={`recipient-item ${
                reci.id === recipient?.id ? "selected" : ""
              }`}
            >
              <h6 className="mb-1">{reci.name}</h6>
              <p>
                Địa chỉ: {reci.address}, {reci.ward.ward},{" "}
                {reci.district.district}, {reci.city.city}
              </p>
              <p>Điện thoại: {reci.phone}</p>
              <div className="flex">
                {reci.id !== recipient?.id && (
                  <a
                    className="font-size-12 a-orange mr-3"
                    onClick={() => onSelectRecipient(reci)}
                  >
                    Chọn địa chỉ này
                  </a>
                )}
                {!reci.isDefault && (
                  <a
                    className="font-size-12 a-orange mr-3"
                    onClick={() => onSetDefault(reci)}
                  >
                    Đặt làm mặc định
                  </a>
                )}
                <a
                  className="font-size-12 a-orange mr-3"
                  onClick={() => {
                    onSetEditedRecipient(reci);
                    setShowAdd(true);
                  }}
                >
                  Chỉnh sửa
                </a>
                {reci.id !== recipient?.id && (
                  <a
                    className="font-size-12 a-orange mr-3"
                    onClick={() => onDelete(reci.id)}
                  >
                    Xóa
                  </a>
                )}
              </div>
            </div>
            {reci.isDefault && (
              <Tag className="default-tag" color="magenta">
                Mặc định
              </Tag>
            )}
          </div>
        ))}
      </div>
      <Modal
        title={
          editedRecipient
            ? "Chỉnh sửa địa chỉ nhận hàng"
            : "Thêm địa chỉ nhận hàng"
        }
        visible={showAdd}
        onOk={form.submit}
        onCancel={() => setShowAdd(false)}
        cancelText="Hủy"
        okText="Lưu"
        className="recipient"
      >
        <Form
          {...layout}
          // initialValues={editedRecipient ?? {}}
          form={form}
          onFinish={(values) =>
            editedRecipient ? onEdit(values) : onAddRecipient(values)
          }
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
                form.setFieldsValue({ districtId: null, wardId: null });
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
                form.setFieldsValue({ wardId: null });
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

export default RecipientItem;
