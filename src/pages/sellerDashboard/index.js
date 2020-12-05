import React, { useState, useEffect } from "react";
import Axios from "../../Axios";
import { DASHBOARD } from "../../constants";

const SellerDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(`/dashboard/user`).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="row">
      {data.map((item) => (
        <div className="col-lg-4 col-md-6 col-12">
          <div
            className="flex dashboard-item"
            style={{
              backgroundColor: DASHBOARD.find(
                (element) => element.type === item.key
              )?.color,
            }}
          >
            <div className="align-items-center col-6 col-md-7 flex flex-column justify-content-center">
              <h2 className="mb-2">{item.count}</h2>
              <h6 className="font-weight-600">{item.title}</h6>
            </div>
            <div className="col-6 col-md-5">
              <img
                alt={item.key}
                src={require(`../../assets/images/${item.key}.svg`)}
                width="100%"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerDashboard;
