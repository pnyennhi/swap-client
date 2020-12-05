/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./MiniSearch.css";
import { Input, Form, Select } from "antd";

const { Option } = Select;

const MiniSearch = ({ value, onChange, onEnter, onChangePrefix }) => {
  const prefixSelector = (
    <Select defaultValue="product" onChange={(value) => onChangePrefix(value)}>
      <Option value="product">Tìm sản phẩm</Option>
      <Option value="user">Tìm người dùng</Option>
    </Select>
  );
  return (
    <div className="minisearch row">
      <div className="field__search">
        <Input
          type="text"
          placeholder="Search"
          value={value}
          defaultValue={value}
          addonBefore={prefixSelector}
          onChange={(e) => onChange(e.target.value)}
          onPressEnter={(e) => onEnter(e)}
        />
        <div className="action">
          <a href="#">
            <i className="zmdi zmdi-search"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MiniSearch;
