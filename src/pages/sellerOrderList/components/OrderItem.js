/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Tag } from "antd";
import Product from "../../../components/Product-Row";
import { ORDER_STATUS } from "../../../constants";

const OrderItem = ({
  product,
  status,
  user,
  total,
  id,
  totalProducts,
  paymentMethod,
}) => {
  console.log(product);
  return (
    <div className="order-item bg--white">
      <div className="row align-items-center">
        <div className="col-10">
          <Link to={`user/${user.id}`}>
            <Avatar className="mr-2" size="small" src={user.avatarImage} />
            <span className="text-orange font-weight-600">{user.username}</span>
          </Link>
        </div>
        <div className="col-2 text-right">Mã đơn hàng: {id}</div>
      </div>
      <div className="row align-items-center">
        <div className="col-5">
          <Product
            name={product.product.name}
            size={product.product.size}
            id={product.product.id}
            imageSrc={product.product.coverImage}
          />
        </div>
        <div className="col-1 text-right">x{product.quantity}</div>
        <div className="col-1 text-right font-weight-600">${total}</div>
        <div className="col-3 text-right">
          {paymentMethod === "cod"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán qua Paypal"}
        </div>
        <div className="col-2 text-right">
          <Tag
            className="status"
            color={
              ORDER_STATUS.find((item) => item.status === status.status)?.color
            }
          >
            {status.status}
          </Tag>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          {totalProducts > 1 && (
            <p className="color-333 font-size-12">
              ... và còn {totalProducts - 1} sản phẩm
            </p>
          )}
        </div>
        <div className="col-6 text-right">
          <Link to={`/seller/orders/detail/${id}`} className="see-more">
            Xem chi tiết đơn hàng
          </Link>
          {status.id === 2 && (
            <Link to={`/seller/orders/accept/${id}`} className="ml-3">
              <Button className="btn-orange">Xác nhận</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
