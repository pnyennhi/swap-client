import React from "react";
import { Link } from "react-router-dom";

export default ({ title, options, path }) => {
  return (
    <aside className="wedget__categories poroduct--cat">
      <h3 className="wedget__title">{title}</h3>
      <ul>
        {options.map((option) => (
          <li key={option.path}>
            <Link
              to={`/shop/${option.path}`}
              style={{ color: path === option.path ? "red" : "#333" }}
            >
              {option.category}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
