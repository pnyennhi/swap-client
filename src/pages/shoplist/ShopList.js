import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import CategoryMenu from "../../layouts/CategoryMenu/CategoryMenu";
import "./ShopList.css";
import Product from "../../components/Product-Home/Product-Home";
import Filter from "./components/Filter";
import CateFilter from "./components/ListCateFilter";
import Pagination from "../../components/Pagination/Pagination";
import { Select, InputNumber, Button, Tag } from "antd";
import Axios from "axios";
import { useParams, useLocation, Link, useHistory } from "react-router-dom";
import query_string from "query-string";
import _ from "lodash";

const LIMIT = 12;
const { Option } = Select;
const { CheckableTag } = Tag;

export default () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 0 });
  const [filters, setFilters] = useState({ sort: "default", size: [] });
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get("q");

  const { category, subCategory } = useParams();
  // alert(category);
  const getApi = () => {
    const queryString = query_string.stringify(
      filters.sort === "default" ? _.omit(filters, "sort") : filters
    );

    if (!keyword) {
      return category === "all"
        ? `http://localhost:3001/products?statusId=2&page=${currentPage}&pageSize=${LIMIT}&criteria=price&${queryString}`
        : `http://localhost:3001/products?statusId=2&category=${category}${
            subCategory ? `/${subCategory}` : ""
          }&page=${currentPage}&pageSize=${LIMIT}&criteria=price&${queryString}`;
    }

    return `http://localhost:3001/products?statusId=2&page=${currentPage}&pageSize=${LIMIT}&criteria=price&${queryString}&keyword=${keyword}`;
  };

  const fetchProducts = () => {
    Axios.get(getApi())
      .then((res) => {
        setProducts(res.data.data);
        setTotalItems(res.data.total);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
    Axios.get("http://localhost:3001/conditions")
      .then((res) => {
        const conditions = res.data.data.map((item) => ({
          ...item,
          label: item.condition,
          value: item.id,
        }));
        setConditions(conditions);
      })
      .catch((err) => console.log(err));

    Axios.get(
      `http://localhost:3001/categories/getFilters/${category ?? "all"}`
    )
      .then((res) => {
        const data = res.data.map((item) => ({
          ...item,
          label: item.category,
          value: item.id,
        }));
        if (!keyword) data.unshift({ category: "Tất cả", path: category });

        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(filters);
    fetchProducts();
  }, [currentPage, filters]);

  useEffect(() => {
    if (category !== "all") {
      Axios.get(`http://localhost:3001/sizes?category=${category}`)
        .then((res) => {
          setSizes(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [category]);

  const onChangeFilters = (field, values) => {
    setFilters({ ...filters, [field]: values });
  };

  const handleChangePriceRange = (type, value) => {
    setPriceRange({ ...priceRange, [type]: value });
  };

  const handleSetPrice = () => {
    if (priceRange.minPrice && priceRange.maxPrice) {
      setFilters({
        ...filters,
        minPrice: priceRange.minPrice,
        maxPrice: priceRange.maxPrice,
      });
    } else {
      if (!priceRange.minPrice) {
        delete filters.minPrice;
      }
      if (!priceRange.minPrice) {
        delete filters.minPrice;
      }
    }
  };

  const handleSelectSize = (size, checked) => {
    const selectedSizes = filters.size;
    const nextSelectedSizes = checked
      ? [...selectedSizes, size.size]
      : selectedSizes.filter((t) => t !== size.size);

    setFilters({ ...filters, size: nextSelectedSizes });
  };

  return (
    <>
      <div className="page-shop-sidebar left--sidebar bg--white section-padding--lg">
        <div className="container">
          <div className="row">
            <div className="col-lg-20 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
              <div className="shop__sidebar">
                {!keyword ? (
                  <CateFilter
                    title="Danh mục sản phẩm"
                    options={categories}
                    path={`${category}/${subCategory}`}
                  />
                ) : (
                  <Filter
                    title="Danh mục sản phẩm"
                    field="categoryId"
                    options={categories}
                    onChange={onChangeFilters}
                  />
                )}
                <aside className="wedget__categories poroduct--cat">
                  <h3 className="wedget__title">Khoảng giá</h3>
                  <div className="row">
                    <div className="col-6">
                      Từ
                      <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                        onChange={(value) =>
                          handleChangePriceRange("minPrice", value)
                        }
                      />
                    </div>
                    <div className="col-6">
                      Đến
                      <InputNumber
                        style={{ width: "100%" }}
                        min={
                          priceRange.minPrice ? Number(priceRange.minPrice) : 0
                        }
                        onChange={(value) =>
                          handleChangePriceRange("maxPrice", value)
                        }
                      />
                    </div>
                    <div className="col-12">
                      <Button
                        type="primary"
                        className="mt-3 width-100 bg-pink border-pink btn-pink"
                        onClick={() => handleSetPrice()}
                      >
                        Áp dụng
                      </Button>
                    </div>
                  </div>
                </aside>
                {/* <Filter title="Product Categories" options={prices} /> */}
                <Filter
                  title="Tình trạng"
                  field="condition"
                  options={conditions}
                  onChange={onChangeFilters}
                />
                {category !== "all" && (
                  <aside className="wedget__categories poroduct--cat">
                    <h3 className="wedget__title">Size</h3>
                    {sizes.map((size) => (
                      <CheckableTag
                        className="size mb-2"
                        key={size.id}
                        checked={filters.size.indexOf(size.size) > -1}
                        onChange={(checked) => handleSelectSize(size, checked)}
                      >
                        {size.size}
                      </CheckableTag>
                    ))}
                  </aside>
                )}
              </div>
            </div>
            <div className="col-lg-80 col-12 order-1 order-lg-2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="shop__list__wrapper d-flex flex-wrap flex-md-nowrap justify-flex-end">
                    <div className="orderby__wrapper">
                      <span className="mr-2">Sắp xếp theo</span>
                      <Select
                        defaultValue={filters.sort}
                        // value={sort}
                        style={{ width: 170 }}
                        onChange={(value) =>
                          setFilters({ ...filters, sort: value })
                        }
                      >
                        <Option value="default">Mặc định</Option>
                        <Option value="desc">Giá giảm dần</Option>
                        <Option value="asc">Giá tăng dần</Option>
                      </Select>
                    </div>
                  </div>
                </div>
                {products.map((product, index) => (
                  <div
                    className="ahihi px-6 col-lg-3 col-md-4 col-sm-6 col-12"
                    key={index}
                  >
                    <Product
                      name={product.name}
                      price={product.price}
                      id={product.id}
                      imageSrc={product.coverImage}
                    />
                  </div>
                ))}
              </div>
              <Pagination
                total={Math.ceil(totalItems / LIMIT)}
                current={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
