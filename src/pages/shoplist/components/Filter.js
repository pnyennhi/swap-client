import React from "react";
import { Checkbox } from "antd";

export default ({ title, options, field, onChange }) => {
  return (
    <aside className="wedget__categories poroduct--cat">
      <h3 className="wedget__title">{title}</h3>
      <Checkbox.Group
        options={options}
        onChange={(values) => onChange(field, values)}
      />
    </aside>
  );
};
