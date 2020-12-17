import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Form, Input, DatePicker, Radio, Button } from "antd";
import Axios from "../../Axios";
import { updateUser } from "../../redux/actions/user";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

export default () => {
  const info = useSelector((store) => store.user);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      username: info?.username,
      email: info?.email,
      phone: info?.phone,
      birthday: moment(info?.birthday),
      gender: info?.gender,
    });
  }, [info]);

  const onFinish = (values) => {
    Axios.put("/users/profile", values)
      .then((res) => updateUser(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <Form
      form={form}
      {...layout}
      name="basic"
      initialValues={{
        ...info,
        birthday: info ? moment(info.birthday) : null,
      }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Tên"
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email">
        {info?.email}
      </Form.Item>

      <Form.Item label="Số điện thoại" name="phone">
        <Input />
      </Form.Item>

      <Form.Item label="Ngày sinh" name="birthday">
        <DatePicker
          defaultValue={moment("2020-12-01T17:50:50.000Z")}
          format="YYYY/MM/DD"
        />
      </Form.Item>
      <Form.Item label="Giới tính" name="gender">
        <Radio.Group>
          <Radio value="Nam">Nam</Radio>
          <Radio value="Nữ">Nữ</Radio>
          <Radio value="Khác">Khác</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit" className="btn-pink">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};
