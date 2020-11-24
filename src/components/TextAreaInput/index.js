import React from "react";
import { Input, Form } from "antd";

const { TextArea } = Input;

const TextInput = ({ field, form, ...props }) => {
  return (
    <div className="form-group">
      <Form.Item label={props.label}>
        <TextArea rows={6} {...field} {...props} />
        {form.errors[field.name] && form.touched[field.name] ? (
          <div className="input-feedback">{form.errors[field.name]}</div>
        ) : null}
      </Form.Item>
    </div>
  );
};

export default TextInput;
