import React from "react";
import { Link, useHistory } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { InputNumber, Avatar, Button } from "antd";

export default ({ userId, product, isLiked, isInCart, onLike, onAdd }) => {
  const images = product.images.map((item) => ({
    original: item.imageLink,
    thumbnail: item.imageLink,
    sizes: { width: "450px", height: "565px" },
  }));

  images.unshift({
    original: product.coverImage,
    thumbnail: product.coverImage,
    sizes: { width: "450px", height: "565px" },
  });

  let history = useHistory();

  return (
    <div className="wn__single__product">
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="wn__fotorama__wrapper" style={{ width: "450px" }}>
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="product__info__main">
            <h1>{product.name}</h1>
            <div className="price-box flex justify-content-between">
              <span className="price">{product.price}</span>
              <span className="flex align-item-center">
                <span className="like-icon" onClick={() => onLike()}>
                  {isLiked ? (
                    <HeartFilled style={{ color: "#de3434" }} />
                  ) : (
                    <HeartOutlined />
                  )}
                </span>
              </span>
            </div>
            <div className="product__overview"></div>
            <div className="box-tocart d-flex align-items-center">
              <span>Số lượng</span>
              <InputNumber
                min={1}
                max={product.quantity - product.soldQuantity}
                defaultValue={1}
                className="mr-3"
              />
              <span>
                {" "}
                {product.quantity - product.soldQuantity} sản phẩm có sẵn
              </span>
            </div>
            {userId != product.owner.id && product.statusId !== 3 && (
              <div className="box-tocart" style={{ marginBottom: "30px" }}>
                <div className="addtocart__actions">
                  <Button
                    className="btn-pink tocart"
                    onClick={() =>
                      !isInCart ? onAdd() : history.push("/cart")
                    }
                  >
                    {isInCart ? "Thanh toán" : "Thêm vào giỏ hàng"}
                  </Button>
                </div>
              </div>
            )}
            <div className="product__overview">
              <table>
                <tbody>
                  <tr>
                    <td>Size</td>
                    <td>{product.size}</td>
                  </tr>
                  <tr>
                    <td>Tình trạng</td>
                    <td>{product.condition.condition}</td>
                  </tr>
                  <tr>
                    <td>Thương hiệu</td>
                    <td>{product.brand}</td>
                  </tr>
                  <tr>
                    <td>Chất liệu</td>
                    <td>{product.material}</td>
                  </tr>
                  <tr>
                    <td>Danh mục</td>
                    <td>
                      <Link to={`/shop/${product.category.path}`}>
                        {product.category.parent.category} /
                        {product.category.subCategory}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="product__overview">
              <Link to={`/user/${product.ownerId}`}>
                <div className="flex">
                  <Avatar size={72} src={product.owner.avatarImage} />
                  <div className="shop-info">
                    <p className="shop-name">{product.owner.username}</p>
                    <p className="shop-address">{product.owner.email}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
