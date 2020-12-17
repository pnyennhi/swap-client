import React, { useState, useEffect } from "react";
import Axios from "../../Axios";
import { DASHBOARD } from "../../constants";
import { Divider } from "antd";

const SellerDashboard = () => {
  const [data, setData] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderStatistic, setOrderStatistic] = useState([]);
  const [productStatus, setProductStatus] = useState([]);
  const [productStatistic, setProductStatistic] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/orderStatus/`).then((res) => {
      setOrderStatus(res.data);
    });
    Axios.get(`http://localhost:3001/orders/seller/statistic`).then((res) => {
      setOrderStatistic(res.data);
    });
    Axios.get(`http://localhost:3001/productStatus/`).then((res) => {
      setProductStatus(res.data);
    });
    Axios.get(`http://localhost:3001/products/seller/statistic`).then((res) => {
      setProductStatistic(res.data);
    });
  }, []);

  return (
    <div>
      <h6 className="mb-4">Sản phẩm</h6>
      <div className="row">
        {productStatus.map((status, index) => (
          <div className="col-20 text-center">
            <h4>{productStatistic[index]}</h4>
            <p>{status.status}</p>
          </div>
        ))}
      </div>
      <Divider />
      <h6 className="mb-4">Đơn hàng</h6>
      <div className="row">
        {orderStatus.map((status, index) => (
          <div className="col-2 text-center">
            <h4>{orderStatistic[index]}</h4>
            <p>{status.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
