import React from "react";
import { Avatar, Rate } from "antd";
import { Link } from "react-router-dom";

const User = ({ id, name, email, rate, totalProducts, avatar }) => {
  return (
    <Link to={`/user/${id}`}>
      <div className="user-item flex align-items-center">
        <Avatar src={avatar} size={80} className="mr-3" />
        <div>
          <h6 className="font-weight-600">{name}</h6>
          <p className="email">{email}</p>
          <div className="font-size-12" style={{ color: "#333" }}>
            <span className="mr-2">
              <span className="font-weight-600 mr-1">{rate}</span>{" "}
              <Rate allowHalf value={rate} disabled />
            </span>
            <span className="mr-2">|</span>
            <span>
              <span className="font-weight-600">{totalProducts}</span> sản phẩm
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default User;
