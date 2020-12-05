import React from "react";
import { Link } from "react-router-dom";

export default ({ subCategories }) => {
  const num = Math.ceil(subCategories.length / 5);
  const menu = [];
  for (let i = 0; i < num; i++) {
    const temp = (
      <ul className="item item03">
        {subCategories.slice(i * 5, i * 5 + 5).map((subCate) => (
          <li>
            <Link to={`/shop/${subCate.path}`}>{subCate.subCategory}</Link>
          </li>
        ))}
      </ul>
    );
    menu.push(temp);
  }
  return <div className="megamenu mega03">{menu}</div>;
};
