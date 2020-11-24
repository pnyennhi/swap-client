/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Pagination = ({ total, current, onChange }) => {
  let pages = [];

  for (let i = 1; i <= total; i++) pages.push(i);

  return (
    <ul className="wn__pagination">
      <li
        style={{ display: current === 1 ? "none" : "inline-block" }}
        onClick={() => onChange(current - 1)}
      >
        <a>
          <i className="zmdi zmdi-chevron-left"></i>
        </a>
      </li>
      {pages.map((page, index) => (
        <li
          className={page === current ? "active" : ""}
          onClick={() => onChange(page)}
          key={index}
        >
          <a>{page}</a>
        </li>
      ))}
      <li
        style={{ display: current === total ? "none" : "inline-block" }}
        onClick={() => onChange(current + 1)}
      >
        <a>
          <i className="zmdi zmdi-chevron-right"></i>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
