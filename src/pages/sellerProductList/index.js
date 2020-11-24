import React, { useState, useEffect } from "react";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import queryString from "query-string";
import { Tabs } from "antd";
import Search from "./components/SearchForm";
import Table from "./components/Table";

const { TabPane } = Tabs;

const SellerProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);
  const [current, setCurrent] = useState(0);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    Axios.get("/categories/all")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
    Axios.get("/productStatus")
      .then((res) => {
        const status = res.data.map((item) => ({
          ...item,
          value: item.id,
          label: item.status,
        }));
        status.push({ value: 0, label: "Tất cả" });
        setStatus(status);
      })
      .catch((err) => console.log(err));

    if (user) {
      Axios.get(`/products?userId=${user.id}`).then((res) => {
        const data = res.data;

        setProducts(data.data.map((item) => ({ ...item, key: `${item.id}` })));
      });
    }
  }, [user]);

  const handleSearch = (values) => {
    Axios.get(
      `/products?userId=${user.id}&${queryString.stringify(values)}`
    ).then((res) => {
      const data = res.data;
      setProducts(data.data.map((item) => ({ ...item, key: `${item.id}` })));
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
    if (user) {
      Axios.get(
        `/products?userId=${user.id}&${
          current == 0 ? "" : `statusId=${current}`
        }`
      )
        .then((res) => {
          console.log(res.data);
          setProducts(
            res.data.data.map((item) => ({ ...item, key: `${item.id}` }))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [current]);

  const handleChangeTab = (key) => {
    setCurrent(key);
  };

  const content = (
    <>
      <Search onSearch={handleSearch} categories={categories} status={status} />
      <Table dataSource={products} />
    </>
  );

  return (
    <div className="seller-product">
      <Tabs defaultActiveKey="0" onChange={(key) => handleChangeTab(key)}>
        <TabPane tab="Tất cả" key="0">
          {content}
        </TabPane>
        {status.map((status) => (
          <TabPane tab={status.status} key={status.id}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default SellerProductList;
