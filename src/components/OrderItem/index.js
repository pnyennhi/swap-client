import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Tag } from "antd";
import Product from "../Product-Row";
import { ORDER_STATUS } from "../../constants";

const OrderItem = ({ products, status, seller, hideStatus }) => {
  return (
    <div>
      <div className="flex justify-content-between align-items-center">
        <div className="">
          <Link to={`user/${seller.id}`}>
            <Avatar className="mr-2" size="small" src={seller.avatarImage} />
            <span className="text-orange font-weight-600">
              {seller.username}
            </span>
          </Link>
        </div>
        {!hideStatus && (
          <Tag
            className="status"
            color={ORDER_STATUS.find((item) => item.status === status)?.color}
          >
            {status}
          </Tag>
        )}
      </div>
      {products.map((item, index) => {
        return (
          <div key={index} className="row align-items-center">
            <div className="col-9">
              <Product
                name={item.product.name}
                size={item.product.size}
                id={item.productId}
                imageSrc={item.product.coverImage}
              />
            </div>
            <div className="col-1 text-right">x{item.quantity}</div>
            <div className="col-2 text-right">$ {item.price}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderItem;
