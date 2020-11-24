/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button } from "antd";
import Product from "../../../components/Product-Row";

const OrderItem = ({ product, status, user, total, id, totalProducts }) => {
  console.log(product);
  return (
    <div className="order-item">
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
        <div className="col-1 text-right">{total}</div>
        <div className="col-2 text-right">{status.status}</div>
        {status.id === 1 && (
          <div className="col-3 text-right">
            <Link to={`/seller/orders/accept/${id}`}>
              <Button>Xác nhận</Button>
            </Link>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-9">
          {totalProducts > 1 && (
            <p className="color-333 font-size-12">
              ... và còn {totalProducts - 1} sản phẩm
            </p>
          )}
        </div>
        <div className="col-3 text-right">
          <Link to={`/seller/orders/detail/${id}`} className="see-more">
            Xem chi tiết đơn hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
