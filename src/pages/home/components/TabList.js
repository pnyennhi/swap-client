import React from "react";
import Tab from "../../../components/Tab-Home/Tab-Home";

export default ({ tabs, activeTab, onSelect }) => {
  return (
    <div className="row mt--20">
      <div className="col-md-12 col-lg-12 col-sm-12">
        <div className="product__nav nav justify-content-center">
          {tabs.map((tab) => (
            <Tab
              tab={tab}
              active={activeTab === tab.title}
              onClick={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
