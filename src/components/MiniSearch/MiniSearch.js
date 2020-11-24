/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./MiniSearch.css";

const MiniSearch = ({ onChange, onEnter }) => {
  return (
    <div className="minisearch row">
      <div className="field__search">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onChange(e.target.value)}
          onKeyUp={(e) => onEnter(e)}
        />
        <div className="action">
          <a href="#">
            <i className="zmdi zmdi-search"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MiniSearch;
