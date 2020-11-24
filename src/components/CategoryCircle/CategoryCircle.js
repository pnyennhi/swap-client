/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./CategoryCircle.css";

const CategoryCircle = ({ background, src, title }) => {
  return (
    <div className="category-circle-wrapper">
      <a className="category-circle text-center">
        <div className="category-circle-bg">
          <img src={require(`../../assets/images/${src}`)} />
        </div>
        <div className="category-circle-title">{title}</div>
      </a>
    </div>
  );
};

export default CategoryCircle;
