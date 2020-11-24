import React, { useState, useEffect } from "react";
import { Button, BackTop } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../layouts/Header/Header";
import CoverImage from "../../layouts/CoverImage/CoverImage";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ProductCarousel from "./components/ProductCarousel";
import CategoryList from "./components/CategoryList";
import TabList from "./components/TabList";
import CategoryMenu from "../../layouts/CategoryMenu/CategoryMenu";
import Product from "../../components/Product-Home/Product-Home";

const Home = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [newProducts, setNewProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products?statusId=2&pageSize=15&page=1")
      .then((res) => {
        setNewProducts(res.data.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3001/categories?pageSize=10&page=1")
      .then((res) => {
        const categoryTabs = res.data.data.map((item) => ({
          ...item,
          title: item.category,
        }));
        setCategories(categoryTabs);
        setActiveTab(categoryTabs[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (activeTab) {
      axios
        .get(
          `http://localhost:3001/products?statusId=2&category=${activeTab.path}&pageSize=10&page=1`
        )
        .then((res) => setAllProducts(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [activeTab]);

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <CoverImage />

      {/* <section className="mt--60">
        <div className="container">
          <CategoryList categories={categories} />
        </div>
      </section> */}

      <section className="mt--100">
        <div className="container">
          <SectionTitle
            title="Sản phẩm"
            colorTitle="Mới"
            content="Cập nhật nhanh nhất tất cả các sản phẩm mới trưng bày đến từ những nhà thương mại khác nhau trên toàn quốc"
          />
          <div className="mt--40">
            <ProductCarousel products={newProducts} itemClass="" />
          </div>
          <div className="mt--10 text-center">
            <Link to="/shop/all">
              <Button className="btn-bg-white">See All</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt--100">
        <div className="container">
          <SectionTitle
            title="Sản phẩm"
            colorTitle="Nổi bật"
            content="Cập nhật nhanh nhất tất cả các sản phẩm mới trưng bày đến từ những nhà thương mại khác nhau trên toàn quốc"
          />
          <div className="mt--40">
            <TabList
              tabs={categories}
              activeTab={activeTab?.title}
              onSelect={handleSelectTab}
            />
          </div>
          <div className="mt--40">
            <div className="row">
              {allProducts.map((product) => (
                <div className="col-lg-20 col-md-3 col-6 px-6">
                  <Product
                    name={product.name}
                    price={product.price}
                    id={product.id}
                    imageSrc={product.coverImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
