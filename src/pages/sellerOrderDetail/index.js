import React, { useState, useEffect, useRef } from "react";
import { Divider, Button } from "antd";
import OrderItem from "../../components/OrderItem";
import OrderDetail from "../../components/OrderDetail";
import Axios from "../../Axios";
import Toast from "light-toast";

const SellerOrderDetail = ({ id }) => {
  const [order, setOrder] = useState(null);
  const [departures, setDepartures] = useState([]);
  const [departure, setDeparture] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  const departureDiv = useRef();

  // useEffect(() => {
  //   Axios.get(`/orders/${id}`)
  //     .then((res) => setOrder(res.data))
  //     .catch((err) => console.log(err));

  //   Axios.get("/recipients/user")
  //     .then((res) => {
  //       const data = res.data;
  //       setDepartures(data);
  //       setDeparture(data.find((item) => item.isDefault === true));
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    if (isAccepting) console.log(departureDiv);
  }, [isAccepting]);

  const handleAddRecipient = (values) => {
    Axios.post("/recipients", values)
      .then((res) => {
        setShowAdd(false);
        Axios.get("/recipients/user")
          .then((res) => {
            const data = res.data;
            setDepartures(data);
            setDeparture(data.find((item) => item.isDefault === true));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau", 2000);
      });
  };

  const handleSelectRecipient = (value) => {
    setDeparture(value);
    // console.log(value);
  };

  const handleAcceptOrder = () => {
    if (!departure) {
      Toast.fail("Bạn cần chọn địa chỉ lấy hàng");
      return;
    }

    Axios.put(`/orders/accept/${id}`, { departureId: departure.id })
      .then((res) => {
        Toast.success("Xác nhận đơn hàng thanh công");
      })
      .catch((err) => {
        Toast.fail("Đã có lỗi xảy ra");
      });
  };

  const handleRejectOrder = () => {
    Axios.put(`/orders/reject/${id}`)
      .then((res) => {
        Toast.success("Đã hủy đơn hàng");
      })
      .catch((err) => {
        Toast.fail("Đã có lỗi xảy ra");
      });
  };

  return (
    <>
      <OrderDetail id={id} />
      {/* <div
        className="checkout checkout_info address"
        style={{ display: isAccepting ? "block" : "none" }}
      >
        <Recipient
          ref={departureDiv}
          recipient={departure}
          recipients={departures}
          showAdd={showAdd}
          showList={showList}
          setShowAdd={setShowAdd}
          setShowList={setShowList}
          onSelectRecipient={handleSelectRecipient}
          onAddRecipient={handleAddRecipient}
        />
      </div> */}

      {!isAccepting && order?.statusId === 1 && (
        <Button className="btn-orange" onClick={() => setIsAccepting(true)}>
          Tiến hành xác nhận
        </Button>
      )}
      {/* {isAccepting && order?.statusId === 1 && (
        <Button className="btn-orange" onClick={() => handleAcceptOrder()}>
          Xác nhận đơn hàng
        </Button>
      )} */}
      {order?.statusId === 1 && (
        <Button className="btn-orange" onClick={() => handleRejectOrder()}>
          Hủy đơn hàng
        </Button>
      )}
    </>
  );
};

export default SellerOrderDetail;
