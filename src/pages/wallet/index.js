import React, { useState, useEffect } from "react";
import { DatePicker, Button, Modal, Input } from "antd";
import { Formik } from "formik";
import queryString from "query-string";
import Table from "./components/TransactionTable";
import { MoneyBag } from "../../components/Icon";
import paypal from "../../assets/images/paypal.svg";
import Axios from "../../Axios";

const { RangePicker } = DatePicker;

const Wallet = () => {
  const [detailDate, setDetailDate] = useState({
    fromDate: null,
    toDate: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [wallet, setWallet] = useState({ walletId: null, amount: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    Axios.get("/wallet")
      .then((res) => {
        setWallet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get("/transactions/user")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // if (detailDate.fromDate && detailDate.toDate) {
    const query = queryString.stringify(detailDate);
    Axios.get(
      `/transactions/user?${
        detailDate.fromDate && detailDate.toDate ? query : ""
      }`
    )
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  }, [detailDate]);

  const handleWithdraw = (values) => {
    Axios.post("/transactions", { ...values, type: "withdraw" })
      .then((res) => {
        setWallet(res.data.wallet);
        setDetailDate({ fromDate: null, toDate: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="checkout checkout_info mb-4 bg__white">
        <h5>Số dư ví</h5>
        <div
          className="flex align-items-center general"
          style={{ padding: "20px 0 10px 0px" }}
        >
          <MoneyBag size="30" />
          <span className="amount">{wallet.amount}</span>
          <Button
            className="ml-4 btn-orange text-upper font-weight-600"
            onClick={() => setShowModal(true)}
            disabled={wallet.amount === 0}
          >
            Rút tiền
          </Button>
        </div>
      </div>

      <div className="checkout checkout_info mb-4 bg__white">
        <div className="flex justify-content-between mb-4">
          <h5>Chi tiết giao dịch</h5>
          <RangePicker
            onChange={(values, string) =>
              setDetailDate({
                fromDate: string[0].replace(/-/g, "/"),
                toDate: string[1].replace(/-/g, "/"),
              })
            }
          />
        </div>
        <div className="table">
          <Table transactions={transactions} />
        </div>
      </div>

      <Formik
        initialValues={{ email: "", amount: 0 }}
        onSubmit={(values) => handleWithdraw(values)}
        validateOnBlur={false}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
          } = props;
          return (
            <Modal
              title="Giao dịch rút tiền"
              visible={showModal}
              onCancel={() => setShowModal(false)}
              onOk={() => handleSubmit()}
            >
              <div className="row justify-content-center mb-4">
                <div className="col-10">
                  <img src={paypal} width="90%" alt="paypal" />
                </div>
              </div>
              <Input
                className="mb-3"
                placeholder="Nhập email PayPal ở đây"
                name="email"
                onChange={(e) => setFieldValue("email", e.target.value)}
              />
              <Input
                placeholder="Nhập số tiền ở đây"
                name="amount"
                onChange={(e) =>
                  setFieldValue("amount", Number(e.target.value))
                }
              />
              <div className="mt--70 text-center font-size-12">
                <p style={{ color: "#757575" }}>
                  Bạn chưa có tài khoản PayPal?
                </p>
                <p>
                  <a
                    className="a-blue"
                    target="_blank"
                    href="https://www.paypal.com/vn/webapps/mpp/account-selection"
                  >
                    Đăng ký tại đây
                  </a>
                </p>
              </div>
            </Modal>
          );
        }}
      </Formik>
    </div>
  );
};

export default Wallet;
