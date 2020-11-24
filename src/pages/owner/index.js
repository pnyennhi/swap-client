import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import Header from "../../layouts/Header/Header";
import CategoryMenu from "../../layouts/CategoryMenu/CategoryMenu";
import ProfileImage from "../../components/ProfileImage";
import Product from "../../components/Product-Home/Product-Home";
import Pagination from "../../components/Pagination/Pagination";
import Axios from "../../Axios";

const LIMIT = 20;

const Owner = ({ id }) => {
  const [owner, setOwner] = useState(null);
  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Axios.get(`/users/owner/${id}`)
      .then((res) => {
        setOwner(res.data);
        setHasError(null);
      })
      .catch((err) => {
        if (err.response.data === "Not found") {
          setHasError("Không tìm thấy người dùng");
        } else {
          setHasError("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        }
        // console.log(err.response);
      });
    Axios.get(
      `/products?userId=${id}&isActive=true&page=${currentPage}&pageSize=${LIMIT}`
    )
      .then((res) => {
        setProducts(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    Axios.get(
      `/products?userId=${id}&isActive=true&page=${currentPage}&pageSize=${LIMIT}`
    )
      .then((res) => {
        setProducts(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => console.log(err.response));
  }, [currentPage]);

  return (
    <>
      <Header />
      <CategoryMenu />
      {!hasError ? (
        <div className="owner">
          {owner && (
            <>
              <ProfileImage
                avatarImage={owner?.avatarImage}
                coverImage={owner?.coverImage}
                editable={false}
              />
              <div className="container text-center">
                <h4>{owner.username}</h4>
                <p className="email">{owner.email}</p>
                <Link className="rate-link" to="/">
                  <Rate
                    className="mr-3"
                    value={owner.rate}
                    disabled
                    allowHalf
                  />
                  <span>({owner.totalReviews})</span>
                </Link>
                <p className="mt-2">
                  Số sản phẩm hoạt động: {owner.totalActiveProducts}
                </p>
              </div>
            </>
          )}

          <div className="container mt--30">
            <div className="row">
              {products.map((product) => (
                <div className="col-lg-20 col-md-4 col-6">
                  <Product
                    name={product.name}
                    price={product.price}
                    id={product.id}
                    imageSrc={product.coverImage}
                  />
                </div>
              ))}
            </div>

            <div className="mt--30">
              <Pagination
                total={Math.ceil(total / LIMIT)}
                current={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <p style={{ color: "red" }}>{hasError}</p>
      )}
    </>
  );
};

export default Owner;
