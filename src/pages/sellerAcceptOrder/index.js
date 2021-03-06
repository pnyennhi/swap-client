import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Toast from "light-toast";
import { Steps, Button, Result } from "antd";
import RecipientItem from "./components/RecipientItem";
import OrderDetail from "../../components/OrderDetail";
import Axios from "../../Axios";

const { Step } = Steps;

const SellerAcceptOrder = ({ id }) => {
  const [order, setOrder] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [editedRecipient, setEditedRecipient] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState(null);

  let history = useHistory();

  useEffect(() => {
    Axios.get(`/orders/${id}`)
      .then((res) => {
        if (res.data.statusId !== 2) history.push("/seller/orders");
        else setOrder(res.data);
      })
      .catch((err) => console.log(err));

    Axios.get("/recipients/user")
      .then((res) => {
        const data = res.data;
        setRecipients(data);
        setRecipient(data.find((item) => item.isDefault === true));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSelectRecipient = (value) => {
    setRecipient(value);
    // console.log(value);
  };

  const handleAddRecipient = (values) => {
    Axios.post("/recipients", values)
      .then((res) => {
        setShowAdd(false);
        Axios.get("/recipients/user")
          .then((res) => {
            const data = res.data;
            setRecipients(data);
            setRecipient(data.find((item) => item.isDefault === true));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau", 2000);
      });
  };

  const handleSetDefaultRecipient = (recipient) => {
    Axios.put(`/recipients/default/${recipient.id}`)
      .then((res) => {
        Axios.get("/recipients/user")
          .then((res) => {
            const data = res.data;
            setRecipients(data);
            setRecipient(data.find((item) => item.isDefault === true));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau", 2000);
      });
  };
  const handleEditRecipient = (recipient) => {
    Axios.put(`/recipients/${editedRecipient.id}`, recipient)
      .then((res) => {
        setShowAdd(false);
        setEditedRecipient(null);
        Axios.get("/recipients/user")
          .then((res) => {
            const data = res.data;
            setRecipients(data);
            setRecipient(data.find((item) => item.isDefault === true));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setShowAdd(false);
        setEditedRecipient(null);
        console.log(err);
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau", 2000);
      });
  };

  const handleDeleteRecipient = (id) => {
    Axios.delete(`/recipients/${id}`)
      .then((res) => {
        Axios.get("recipients/user")
          .then((response) => {
            const { data } = response;
            setRecipients(data);
            setRecipient(data.find((item) => item.isDefault === true));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau", 2000);
      });
  };

  const handleAcceptOrder = () => {
    Axios.put(`orders/accept/${id}`, { departureId: recipient.id })
      .then((res) => {
        setStatus("success");
        setCurrent(2);
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        setCurrent(2);
      });
  };

  const next = () => {
    if (current === 0 && !recipient) {
      Toast.info("Bạn cần chọn địa chỉ lấy hàng");
    } else if (current === 1) {
      handleAcceptOrder();
    } else setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Chọn địa chỉ lấy hàng",
      content: (
        <RecipientItem
          recipients={recipients}
          recipient={recipient}
          editedRecipient={editedRecipient}
          showAdd={showAdd}
          showList={showList}
          setShowAdd={setShowAdd}
          setShowList={setShowList}
          onSelectRecipient={handleSelectRecipient}
          onAddRecipient={handleAddRecipient}
          onSetDefault={handleSetDefaultRecipient}
          onSetEditedRecipient={setEditedRecipient}
          onEdit={handleEditRecipient}
          onDelete={handleDeleteRecipient}
        />
      ),
    },
    {
      title: "Xác nhận đơn hàng",
      content: (
        <>
          {recipient && (
            <div className="checkout checkout_info bg--white">
              <h5>Địa chỉ lấy hàng</h5>
              <div className="mt-3">
                <h6>{recipient.name}</h6>
                <p>
                  Địa chỉ: {recipient.address}, {recipient.ward.ward},{" "}
                  {recipient.district.district}, {recipient.city.city}
                </p>
                <p>Điện thoại: {recipient.phone}</p>
              </div>
            </div>
          )}
          <OrderDetail order={order} />
        </>
      ),
    },
    {
      title: "Kết quả",
      content: (
        <Result
          className="bg--white"
          status={status}
          title="Cảm ơn bạn đã xác nhận đơn hàng"
          subTitle={
            <div className="text-center">
              <p>Mã đơn hàng: {id}</p>
              <p>
                Vui lòng chuẩn bị hàng cho nhân viên vận chuyển đến lấy hàng
              </p>
            </div>
          }
          extra={[
            <Link to="/seller/orders">
              <Button className="btn-orange">Đến danh sách đơn hàng</Button>
            </Link>,
          ]}
        />
      ),
    },
  ];

  return (
    <div className="container">
      <Steps className="mb-4" current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button className="btn-orange" onClick={() => next()}>
            {current === 0 ? "Tiếp tục" : "Xác nhận đơn hàng"}
          </Button>
        )}
        {current > 0 && current < steps.length - 1 && (
          <Button
            className="btn-orange-outlined"
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default SellerAcceptOrder;
