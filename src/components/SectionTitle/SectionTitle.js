import React from "react";

const SectionTitle = (props) => {
  const { title, colorTitle, content } = props;

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="section__title text-center">
          <h2 className="title__be--2">
            {title} <span className="color--theme">{colorTitle}</span>
          </h2>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
