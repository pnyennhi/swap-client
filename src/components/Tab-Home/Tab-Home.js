/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Tab-Home.css";

const TabHome = ({ tab, active, onClick }) => {
  return (
    <a
      className={`nav-item nav-link ${active ? "active" : ""}`}
      onClick={() => onClick(tab)}
    >
      {tab.title}
    </a>
  );
};

export default TabHome;
