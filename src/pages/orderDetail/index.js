import React, { useState, useEffect } from "react";
import { Divider, Button, Tag } from "antd";
import { useParams } from "react-router-dom";
import OrderItem from "../../components/OrderItem";
import Axios from "../../Axios";
import { ORDER_STATUS } from "../../constants";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCancelOrder = () => {
    Axios.put(`/orders/reject/${id}`)
      .then((res) => {
        Axios.get(`/orders/${id}`)
          .then((res) => setOrder(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {order && (
        <>
          <h4 className="mb-4">Thông tin đơn hàng</h4>
          <div className="flex justify-content-between">
            <p>Mã đơn hàng: {order.id}</p>
            <Tag
              className="status"
              color={
                ORDER_STATUS.find((item) => item.status === order.status.status)
                  ?.color
              }
            >
              {order.status.status}
            </Tag>
          </div>
          <p>
            Ngày đặt: {new Date(order.createdAt).toLocaleDateString("en-gb")}
          </p>
          <p>
            Phương thức thanh toán:{" "}
            {order.paymentMethod === "cod"
              ? "Thanh toán khi nhận hàng"
              : "Thanh toán bằng Paypal"}
          </p>
          <Divider orientation="left">Địa chỉ nhận hàng</Divider>
          <h6>{order.shipName}</h6>
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
          <div className="row justify-content-end align-items-center mb-3">
            <p className="mr-4 col-2 text-right">Phí vận chuyển:</p>
            <p className="col-2 text-right">{order.shippingFee}</p>
          </div>
          <div className="row justify-content-end align-items-center mb-1">
            <p className="mr-4 col-2 text-right">Tổng tiền:</p>
            <h4 className="col-2 text-orange font-weight-600 text-right">
              {order.total}
            </h4>
          </div>
          {order.statusId === 1 && (
            <div className="flex justify-content-end">
              <Button
                className="btn-pink-outlined"
                onClick={() => handleCancelOrder()}
              >
                Hủy đơn hàng
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OrderDetail;
