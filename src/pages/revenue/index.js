import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import queryString from "query-string";
import Table from "./components/RevenueTable";
import { MoneyBag } from "../../components/Icon";
import Axios from "../../Axios";

const { RangePicker } = DatePicker;

const Revenue = () => {
  const [sumDate, setSumDate] = useState({ start: null, end: null });
  const [revenue, setRevenue] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let api = "";
    if (sumDate.start && sumDate.end) {
      api = `/orders/revenue?${queryString.stringify(sumDate)}`;
    } else {
      api = "/orders/revenue";
    }

    Axios.get(api)
      .then((res) => {
        setRevenue(res.data.revenue);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sumDate]);

  return (
    <div>
      <div className="checkout checkout_info mb-4 bg__white">
        <div className="flex justify-content-between">
          <h5>Tổng quan</h5>
          <RangePicker
            onChange={(values, string) =>
              setSumDate({
                start: string[1].replace(/-/g, "/"),
                end: string[0].replace(/-/g, "/"),
              })
            }
          />
        </div>
        <div
          className="flex align-items-center general"
          style={{ padding: "20px 0 10px 0px" }}
        >
          <MoneyBag size="30" />
          <span className="amount">{revenue}</span>
        </div>
      </div>

      <div className="checkout checkout_info mb-4 bg__white">
        <div className="flex justify-content-between mb-4">
          <h5>Chi tiết</h5>
        </div>
        <div className="table">
          <Table orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
