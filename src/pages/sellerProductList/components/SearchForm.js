import React, { useState } from "react";
import { omit } from "lodash";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  TreeSelect,
  Select,
} from "antd";

const { TreeNode } = TreeSelect;
const { Option } = Select;

const { RangePicker } = DatePicker;

const AdvancedSearchForm = ({ categories, onSearch }) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(null);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="id">Mã sản phẩm</Option>
        <Option value="name">Tên</Option>
      </Select>
    </Form.Item>
  );
  // const statusSelector = (
  //   <Form.Item name="statusId">
  //     <Select
  //       style={{
  //         width: "100%",
  //       }}
  //       options={status}
  //     ></Select>
  //   </Form.Item>
  // );

  const onFinish = (values) => {
    const query = Object.entries(values).reduce((acc, item) => {
      if (item[1]) return { ...acc, [item[0]]: item[1] };
      return acc;
    }, {});

    if (query.createdAt) {
      if (query.createdAt[0])
        query.fromDate = query.createdAt[0]
          .toDate()
          .toLocaleDateString("zh-Hans-CN");
      if (query.createdAt[1])
        query.toDate = query.createdAt[1]
          .toDate()
          .toLocaleDateString("zh-Hans-CN");
    }

    if (query.prefix === "id" && query.name) {
      query.id = query.name;
    }

    if (value) {
      if (value.includes("cate-"))
        query.categoryId = value.substring(5, value.length);
      if (value.includes("sub-"))
        query.subCategoryId = value.substring(4, value.length);
    }

    onSearch(
      omit(query, [
        "createdAt",
        "category",
        "prefix",
        values.prefix === "id" ? "name" : "",
      ])
    );
  };

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Form
      className="mb-4"
      form={form}
      name="advanced_search"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        prefix: "name",
        statusId: 0,
      }}
    >
      <Row gutter={24}>
        <Col lg={{ span: 7 }} key="name">
          <Form.Item name="name" label="Tên">
            <Input addonBefore={prefixSelector} />
          </Form.Item>
        </Col>
        <Col lg={{ span: 6 }} key="category">
          <Form.Item name="category" label="Danh mục">
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              value={value}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              onChange={onChange}
            >
              {categories.map((cate, index) => {
                return (
                  <TreeNode
                    key={`cate-${cate.id}`}
                    value={`cate-${cate.id}`}
                    title={cate.category}
                  >
                    {cate.children.map((sub, index) => (
                      <TreeNode
                        key={`sub-${sub.id}`}
                        value={`sub-${sub.id}`}
                        title={sub.subCategory}
                      ></TreeNode>
                    ))}
                  </TreeNode>
                );
              })}
            </TreeSelect>
          </Form.Item>
        </Col>
        <Col lg={{ span: 6 }} key="createdAt">
          <Form.Item name="createdAt" label="Ngày đăng">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col lg={{ span: 5 }} style={{ textAlign: "right" }}>
          <Form.Item label=" ">
            <Button className="btn-orange" htmlType="submit">
              Search
            </Button>
            <Button
              className="btn-orange-outlined"
              style={{
                margin: "0 8px",
              }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
          </Form.Item>
        </Col>
        {/* <Col lg={{ span: 8 }} key="price">
          <Form.Item label="Giá">
            <Form.Item
              name="minPrice"
              style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            >
              <Input />
            </Form.Item>
            <span
              style={{
                display: "inline-block",
                width: "24px",
                lineHeight: "32px",
                textAlign: "center",
              }}
            >
              -
            </span>
            <Form.Item
              name="maxPrice"
              style={{ display: "inline-block", width: "calc(50% - 12px)" }}
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </Col> */}

        {/* <Col lg={{ span: 8 }} key="status">
          <Form.Item name="status" label="Trạng thái">
            {statusSelector}
          </Form.Item>
        </Col> */}
      </Row>
    </Form>
  );
};

export default AdvancedSearchForm;
