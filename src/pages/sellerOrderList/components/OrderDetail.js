import React from "react";
import { Divider } from "antd";
import OrderItem from "../../../components/OrderItem";

const OrderDetail = ({ order }) => {
  const recipient = order?.recipient;

  return (
    <div className="row">
      <div className="col-lg-6 col-12">
        {order && (
          <>
            <h4 className="mb-4">Thông tin đơn hàng</h4>
            <div className="flex justify-content-between">
              <p>Mã đơn hàng: {order.id}</p>
              <p>{order.status.status}</p>
            </div>
            <p>Ngày đặt: {order.createdAt}</p>
            <Divider orientation="left">Thông tin người nhận</Divider>
            <p className="font-weight-600">{recipient.name}</p>
            <p>
              Địa chỉ: {recipient.address}, {recipient.ward.ward},{" "}
              {recipient.district.district}, {recipient.city.city}
            </p>
            <p>Điện thoại: {recipient.phone}</p>
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
              <h4 className="text-orange font-weight-600">
                {order.items.reduce((sum, item) => {
                  return (sum += item.price * item.quantity);
                }, 0)}
              </h4>
            </div>
          </>
        )}
      </div>
      <div className="col-lg-6 col-12">
        <h4 className="mb-4">Thông tin lấy hàng</h4>
      </div>
    </div>
  );
};

export default OrderDetail;
