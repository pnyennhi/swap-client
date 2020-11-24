
import React from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ name, size, imageSrc, id, link }) => {
  return (
    <div className="product-name">
      <Link to={link ?? `/item/${id}`} className="flex align-items-center">
        <img src={imageSrc ?? null} alt="" />
        <div>
          <p className="name">{name}</p>
          <p className="size">Size: {size}</p>
        </div>
      </Link>
    </div>
  );
};

export default OrderItem;
