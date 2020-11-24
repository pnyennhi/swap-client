import React, { useRef } from "react";
import { Carousel as AntCarousel } from "antd";

const Carousel = ({ children }) => {
  const carousel = useRef();

  return (
    <div className="arrows_style owl-carousel owl-theme">
      <AntCarousel ref={carousel}>{children}</AntCarousel>
      <div className="owl-nav">
        <div
          className="owl-prev"
          onClick={() => {
            carousel.current.prev();
          }}
        >
          <i className="zmdi zmdi-chevron-left"></i>
        </div>
        <div
          className="owl-next"
          onClick={() => {
            carousel.current.next();
          }}
        >
          <i className="zmdi zmdi-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
