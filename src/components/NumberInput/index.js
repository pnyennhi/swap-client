import React from "react";
import { Form, InputNumber } from "antd";

const TextInput = ({ field, form, ...props }) => {
  return (
    <div className="form-group">
      {/* <label>
        <b>{props.label}</b>
      </label>
      <input {...field} {...props} /> */}

      <Form.Item label={props.label}>
        <InputNumber {...field} {...props} />
        {form.errors[field.name] && form.touched[field.name] ? (
          <div className="input-feedback">{form.errors[field.name]}</div>
        ) : null}
      </Form.Item>
    </div>
  );
};

export default TextInput;
