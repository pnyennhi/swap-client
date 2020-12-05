import React from "react";
import OrderItem from "./OrderItem";

const OrderList = ({ orders }) => {
  return (
    <>
      {orders.map((order, index) => {
        const products = order.items;
        const user = order.user;
        const status = order.status;
        const total = order.total;
        const paymentMethod = order.paymentMethod;
        return (
          <OrderItem
            key={index}
            id={order.id}
            product={products[0]}
            user={user}
            status={status}
            total={total}
            totalProducts={products.length}
            paymentMethod={paymentMethod}
          />
        );
      })}
    </>
  );
};

export default OrderList;
