import React from "react";
import CategoryCircle from "../../../components/CategoryCircle/CategoryCircle";

export default ({ categories }) => {
  return (
    <div className="row ">
      {categories.map((category) => (
        <CategoryCircle title={category.title} src={category.src} />
      ))}
    </div>
  );
};
