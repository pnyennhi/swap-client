import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import Axios from "../../Axios";
import Toast from "light-toast";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

export default () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      setError("Mật khẩu mới không trùng khớp");
      return;
    }
    Axios.put("/users/change-password", values)
      .then((res) => {
        Toast.success("Đổi mật khẩu thành công");
        form.resetFields();
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <Form
      form={form}
      {...layout}
      name="basic"
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Mật khẩu cũ"
        name="oldPassword"
        rules={[
          { required: true, message: "Vui lòng nhập mật khẩu cũ của bạn!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Mật khẩu mới"
        name="password"
        rules={[
          { required: true, message: "Vui lòng nhập mật khẩu mới của bạn!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Xác nhận mật khẩu mới"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận mật khẩu mới của bạn!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit" className="btn-pink">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};
