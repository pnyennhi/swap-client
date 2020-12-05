/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CategoryMenu.css";
import CategoryDropdown from "./components/CategoryDropdown";

export default () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/categories?pageSize=8&page=1")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("category");

  return (
    <header id="header" className="category-menu header__area sticky__header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 d-none d-lg-block">
            <nav className="mainmenu__nav">
              <ul className="meninmenu d-flex justify-content-center">
                {categories.map((category, index) => (
                  <li className="drop" key={index}>
                    <a href="index.html">{category.category}</a>
                    <CategoryDropdown subCategories={category.children} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
