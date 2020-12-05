import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { Select } from "antd";
import Axios from "../../Axios";
import { useParams, useLocation, Link, useHistory } from "react-router-dom";
import _ from "lodash";
import User from "./components/User";

const LIMIT = 12;
const { Option } = Select;

export default () => {
  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get("q");

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    let api;
    if (sort === "default")
      api = `/users?keyword=${keyword}&page=${currentPage}&pageSize=${LIMIT}`;
    else
      api = `/users?keyword=${keyword}&page=${currentPage}&pageSize=${LIMIT}&orderBy=${sort}`;
    Axios.get(api)
      .then((res) => {
        setUsers(res.data.data);
        setTotalItems(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    let api;
    if (sort === "default")
      api = `/users?keyword=${keyword}&page=1&pageSize=${LIMIT}`;
    else
      api = `/users?keyword=${keyword}&page=1&pageSize=${LIMIT}&orderBy=${sort}`;

    Axios.get(api)
      .then((res) => {
        setUsers(res.data.data);
        setCurrentPage(1);
      })
      .then((err) => {
        console.log(err);
      });
  }, [sort]);

  return (
    <>
      <div className="page-shop-sidebar left--sidebar bg--white section-padding--lg">
        <div className="container">
          <div className="row">
            <div className="col-12 order-1 order-lg-2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="shop__list__wrapper d-flex flex-wrap flex-md-nowrap justify-flex-end">
                    <div className="orderby__wrapper">
                      <span className="mr-2">Sắp xếp theo</span>
                      <Select
                        // defaultValue={filters.sort}
                        value={sort}
                        style={{ width: 170 }}
                        onChange={(value) => setSort(value)}
                      >
                        <Option value="default">Mặc định</Option>
                        <Option value="rate">Đánh giá cao nhất</Option>
                        <Option value="sold">Được mua nhiều nhất</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="row">
                    {users.map((user) => (
                      <div className="col-md-6 col-12 mb-4">
                        <User
                          id={user.id}
                          avatar={user.avatarImage}
                          name={user.username}
                          email={user.email}
                          totalProducts={user.totalProducts}
                          rate={user.rate}
                        />
                      </div>
                    ))}
                  </div>
                  <Pagination
                    total={Math.ceil(totalItems / 20)}
                    current={currentPage}
                    onChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
