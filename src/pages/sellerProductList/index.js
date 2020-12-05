import React, { useState, useEffect } from "react";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import queryString from "query-string";
import { Tabs, Modal } from "antd";
import Toast from "light-toast";
import Search from "./components/SearchForm";
import Table from "./components/Table";

const { TabPane } = Tabs;

const SellerProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);
  const [current, setCurrent] = useState(0);
  const [deletedProduct, setDeletedProduct] = useState(null);

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
        // status.pop();
        setStatus(status);
      })
      .catch((err) => console.log(err));

    if (user) {
      Axios.get(`/products?isSold=false&userId=${user.id}`).then((res) => {
        const data = res.data;

        setProducts(data.data.map((item) => ({ ...item, key: `${item.id}` })));
      });
    }
  }, [user]);

  const handleSearch = (values) => {
    Axios.get(
      `/products?isSold=false&userId=${user.id}&${queryString.stringify(
        values
      )}`
    ).then((res) => {
      const data = res.data;
      setProducts(data.data.map((item) => ({ ...item, key: `${item.id}` })));
    });
  };

  useEffect(() => {
    // eslint-disable-next-line
    if (user) {
      Axios.get(
        `/products?isSold=false&userId=${user.id}&${
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

  const handleDeleteProduct = () => {
    Axios.delete(`/products/seller/${deletedProduct}`)
      .then((res) => {
        Toast.success("Đã xóa sản phẩm");
        const newProducts = [...products];
        const index = products.map((item) => item.id).indexOf(deletedProduct);
        newProducts.splice(index, 1);
        setProducts(newProducts);
        setDeletedProduct(null);
      })
      .catch((err) => {
        console.logo(err);
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau");
      });
  };

  const content = (
    <>
      <Search onSearch={handleSearch} categories={categories} status={status} />
      <Table
        className="mt--30"
        dataSource={products}
        onDelete={(id) => setDeletedProduct(id)}
      />
    </>
  );

  return (
    <div className="seller-product">
      <Tabs defaultActiveKey="0" onChange={(key) => handleChangeTab(key)}>
        <TabPane
          tab={`Tất cả ${current == "0" ? `(${products.length})` : ""}`}
          key="0"
        >
          {content}
        </TabPane>
        {status.map((status) => (
          <TabPane
            tab={`${status.status} ${
              current == status.id ? `(${products.length})` : ""
            }`}
            key={status.id}
          >
            {content}
          </TabPane>
        ))}
      </Tabs>
      <Modal
        visible={deletedProduct}
        onOk={handleDeleteProduct}
        onCancel={() => setDeletedProduct(null)}
        cancelText="Hủy"
        okText="Xóa"
      >
        Bạn có chắc chắn xóa sản phẩm này?
      </Modal>
    </div>
  );
};

export default SellerProductList;
