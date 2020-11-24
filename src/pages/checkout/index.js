/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Toast from "light-toast";
import { Steps, Button, Result } from "antd";
import Header from "../../layouts/Header/Header";
import "./Checkout.css";
import Checkout from "./components/Checkout";
import Paypal from "./components/Paypal";
import RecipientItem from "./components/RecipientItem";
import { useSelector } from "react-redux";
import Axios from "../../Axios";
import { productMapper } from "../../utils";
import { setSelectedItems } from "../../redux/actions/cart";

const { Step } = Steps;

export default () => {
  const [recipients, setRecipients] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [editedRecipient, setEditedRecipient] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [shops, setShops] = useState([]);
  const [method, setMethod] = useState("cod");
  const [total, setTotal] = useState([]);
  const [current, setCurrent] = useState(1);
  const [status, setStatus] = useState(null);
  const [shippingFees, setShippingFees] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [orderIds, setOrderIds] = useState([]);

  let history = useHistory();

  const selectedItems = useSelector((store) => store.cart.selectedItems);
  const carts = useSelector((store) => store.cart.cart);

  const next = () => {
    if (current === 2) {
      handleCreateOrder();
    } else setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    if (selectedItems.length <= 0) {
      history.push("/cart");
    } else {
      // TODO: Check in stock and get shipping fee

      const products = carts.filter((item) =>
        selectedItems.includes(item.productId)
      );

      setShops(productMapper(products));
      setTotal(
        products.reduce((acc, item) => {
          if (selectedItems.includes(Number(item.productId)))
            return (acc += item.product.price * item.quantity);
          return acc;
        }, 0)
      );

      Axios.get("/recipients/user")
        .then((res) => {
          const data = res.data;
          setRecipients(data);
          setRecipient(data.find((item) => item.isDefault === true));
        })
        .catch((err) => console.log(err));
    }
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

  const handleCreateOrder = () => {
    const promises = shops.map((shop) =>
      Axios.post("/orders", {
        items: shop.products,
        recipientId: recipient.id,
        sellerId: shop.owner.id,
        shippingFee: shippingFees.find((fee) => fee.sellerId === shop.owner.id)
          .shippingFee,
        paymentMethod: method,
        statusId: method === "cod" ? 2 : 1,
      })
    );

    Promise.all(promises)
      .then((response) => {
        const orderIds = response.map((res) => res.data.orderId);
        setOrderIds(orderIds);
        if (method === "cod") setStatus("success");
        if (method === "cod") setCurrent(4);
        else setCurrent(3);
        selectedItems.forEach((item) => {
          const cartItem = carts.find((cart) => cart.id === item);
          carts.splice(carts.indexOf(cartItem), 1);
        });
        setSelectedItems([]);
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        setCurrent(4);
      });
  };

  const handleGetShippingFee = () => {
    const promises = shops.map((shop) =>
      Axios.post("/shipping", {
        items: shop.products,
      })
    );

    Promise.all(promises)
      .then((response) => {
        let shippingFees = [];
        let soldItems = [];
        let totalShippingFee = 0;
        response.forEach((res) => {
          shippingFees.push({
            shippingFee: res.data.shippingFee,
            sellerId: res.data.sellerId,
          });
          soldItems = [...soldItems, ...res.data.soldItems];
          totalShippingFee += res.data.shippingFee;
        });
        setShippingFees(shippingFees);
        setSoldItems(soldItems);
        setTotal(total + totalShippingFee);
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        setCurrent(4);
      });
  };

  const handleSuccessPayment = () => {
    const promises = orderIds.map((orderId) =>
      Axios.put(`/orders/${orderId}`, { statusId: 2 })
    );

    Promise.all(promises)
      .then((response) => {
        setStatus("success");
        setCurrent(4);
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        setCurrent(4);
      });
  };

  const handleFailPayment = () => {
    alert("error");
    setStatus("error");
    setCurrent(4);
  };

  const steps = [
    {
      title: "Đăng nhập",
      content: "First-content",
    },
    {
      title: "Chọn địa chỉ nhận hàng",
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
        <Checkout
          recipient={recipient}
          shops={shops}
          total={total}
          shippingFees={shippingFees}
          soldItems={soldItems}
          method={method}
          onSelectMethod={setMethod}
          handleCreateOrder={handleCreateOrder}
          handleGetShippingFee={handleGetShippingFee}
        />
      ),
    },
    {
      title: "Thanh toán",
      content: (
        <Paypal
          total={total}
          onSuccess={handleSuccessPayment}
          onError={handleFailPayment}
        />
      ),
    },
    {
      title: "Kết quả",
      content: (
        <Result
          status={status}
          title={
            status === "success" ? "Đặt hàng thành công" : "Đã có lỗi xảy ra"
          }
        />
      ),
    },
  ];

  return (
    <>
      <Header />
      <div className="container">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && current !== 3 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => {}}>
              Done
            </Button>
          )}
          {current > 0 && current < steps.length - 1 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
