/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

export default ({ description }) => {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="product__info__detailed">
      <div className="pro_details_nav nav justify-content-start" role="tablist">
        <a
          className={`nav-item nav-link ${
            activeTab === "Description" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Description")}
        >
          MÔ TẢ SẢN PHẨM
        </a>
        {/* <a
          className={`nav-item nav-link ${
            activeTab === "Reviews" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Reviews")}
        >
          Reviews
        </a> */}
      </div>
      <div className="tab__container">
        <div className="pro__tab_label tab-pane fade show active">
          <div className="description__attribute">
            {/* <p>
              Ideal for cold-weather training or work outdoors, the Chaz Hoodie
              promises superior warmth with every wear. Thick material blocks
              out the wind as ribbed cuffs and bottom band seal in body
              heat.Ideal for cold-weather training or work outdoors, the Chaz
              Hoodie promises superior warmth with every wear. Thick material
              blocks out the wind as ribbed cuffs and bottom band seal in body
              heat.Ideal for cold-weather training or work outdoors, the Chaz
              Hoodie promises superior warmth with every wear. Thick material
              blocks out the wind as ribbed cuffs and bottom band seal in body
              heat.Ideal for cold-weather training or work outdoors, the Chaz
              Hoodie promises superior warmth with every wear. Thick material
              blocks out the wind as ribbed cuffs and bottom band seal in body
              heat.
            </p>
            <ul>
              <li>• Two-tone gray heather hoodie.</li>
              <li>• Drawstring-adjustable hood.</li>
              <li>• Machine wash/dry.</li>
            </ul> */}
            <p>{description}</p>
          </div>
        </div>

        <div className="pro__tab_label tab-pane fade"></div>
      </div>
    </div>
  );
};
