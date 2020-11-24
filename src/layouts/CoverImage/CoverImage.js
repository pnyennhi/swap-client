import React from "react";
import { Button, Space } from "antd";
import "./CoverImage.css";

const CoverImage = () => {
  return (
    <div className="cover poss--relative">
      <img
        className="cover-img"
        src={require("../../assets/images/bg/cover.png")}
        alt="Cover"
      />
      <div className="row cover-btn">
        <Space>
          <Button shape="round" size="large" className="shopping-now">
            Shopping now
          </Button>
          <Button shape="round" size="large" className="seller">
            Sell your items
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default CoverImage;
