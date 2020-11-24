import React, { useState, useEffect } from "react";
import { Divider } from "antd";
import OrderItem from "../OrderItem";
import Axios from "../../Axios";

const OrderDetail = ({ id }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    Axios.get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {order && (
        <>
          {order.statusId !== 1 && order.statusId !== 5 && (
            <div className="checkout checkout_info">
              <h5>Địa chỉ lấy hàng</h5>
              <div className="mt-3">
                <h6>{order.sellerName}</h6>
                <p>
                  Địa chỉ: {order.sellerAddress}, {order.sellerWard.ward},{" "}
                  {order.sellerDistrict.district}, {order.sellerCity.city}
                </p>
                <p>Điện thoại: {order.phone}</p>
              </div>
            </div>
          )}
          <div className="checkout checkout_info">
            <h5 className="mb-4">Thông tin đơn hàng</h5>
            <div className="flex justify-content-between">
              <p>Mã đơn hàng: {order.id}</p>
              <p>{order.status.status}</p>
            </div>
            <p>Ngày đặt: {order.createdAt}</p>
            <Divider orientation="left">Thông tin người nhận</Divider>
            <h6>{order.name}</h6>
            <p>
              Địa chỉ: {order.shipAddress}, {order.shipWard.ward},{" "}
              {order.shipDistrict.district}, {order.shipCity.city}
            </p>
            <p>Điện thoại: {order.shipPhone}</p>
            <Divider orientation="left">Sản phẩm đã mua</Divider>
            <OrderItem
              products={order.items}
              seller={order.seller}
              status={order.status.status}
              hideStatus={true}
            />
            <Divider />
            <div className="flex justify-content-end align-items-center mb-3">
              <p className="mr-4">Tổng tiền:</p>
              <h4 className="text-orange font-weight-600">{order.total}</h4>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetail;
