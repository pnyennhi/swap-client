import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ItemsCarousel from "react-items-carousel";
import Product from "../../../components/Product-Home/Product-Home";
import { Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

export default ({ products, itemClass }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 4,
  //     slidesToSlide: 4, // optional, default to 1.
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //     slidesToSlide: 2, // optional, default to 1.
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //     slidesToSlide: 1, // optional, default to 1.
  //   },
  // };

  return (
    // <Carousel
    //   responsive={responsive}
    //   additionalTransfrom={0}
    //   arrows
    //   autoPlaySpeed={3000}
    //   centerMode={false}
    //   className=""
    //   containerClass="container-with-dots"
    //   dotListClass=""
    //   draggable
    //   focusOnSelect={false}
    //   // infinite
    //   itemClass={itemClass}
    //   keyBoardControl
    //   minimumTouchDrag={80}
    //   renderButtonGroupOutside
    // >
    //   {products.map((product) => (
    //     <Product
    //       name={product.name}
    //       price={product.price}
    //       id={product.id}
    //       imageSrc={
    //         product.images && product.images.length > 0
    //           ? product.images[0].imageLink
    //           : null
    //       }
    //     />
    //   ))}
    // </Carousel>

    <ItemsCarousel
      infiniteLoop={false}
      gutter={12}
      activePosition={"center"}
      chevronWidth={60}
      disableSwipe={false}
      alwaysShowChevrons={false}
      numberOfCards={5}
      slidesToScroll={5}
      outsideChevron={true}
      showSlither={false}
      firstAndLastGutter={false}
      activeItemIndex={activeItemIndex}
      requestToChangeActive={setActiveItemIndex}
      rightChevron={
        <Button
          className="btn-bg-white"
          shape="circle"
          icon={<RightOutlined />}
        />
      }
      leftChevron={
        <Button
          className="btn-bg-white"
          shape="circle"
          icon={<LeftOutlined />}
        />
      }
    >
      {products.map((product) => (
        <Product
          name={product.name}
          price={product.price}
          id={product.id}
          imageSrc={product.coverImage}
        />
      ))}
    </ItemsCarousel>
  );
};
