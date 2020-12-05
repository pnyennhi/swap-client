import React, { useEffect } from "react";
import { Button } from "antd";
import CheckoutTable from "./CheckoutTable";
import paypal from "../../../assets/images/paypal.svg";
import RadioButton from "../../../components/RadioButton";

const options = [
  { label: "Thanh toán khi nhận hàng", value: "cod" },
  {
    label: (
      <>
        Thanh toán qua <img width="80px" src={paypal} alt="paypal" />
      </>
    ),
    value: "paypal",
  },
];

const Checkout = ({
  shops,
  total,
  method,
  shippingFees,
  onSelectMethod,
  handleCreateOrder,
  handleGetShippingFee,
  recipient,
}) => {
  useEffect(() => {
    handleGetShippingFee();
  }, []);

  const totalShippingFee = shippingFees.reduce(
    (acc, fee) => (acc += fee.shippingFee),
    0
  );
  return (
    <section className="wn__checkout__area pt--30 bg__white">
      {/* <div className="container"> */}
      <div className="row">
        <div className="col-12">
          <div className="checkout checkout_info">
            <h5>Địa chỉ người nhận</h5>
            <div className="mt-3">
              <h6>{recipient.name}</h6>
              <p>
                Địa chỉ: {recipient.address}, {recipient.ward.ward},{" "}
                {recipient.district.district}, {recipient.city.city}
              </p>
              <p>Điện thoại: {recipient.phone}</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="checkout checkout_info">
            <h5>Thông tin đơn hàng</h5>
            {shops.map((shop, index) => {
              return (
                <CheckoutTable
                  owner={shop.owner}
                  products={shop.products}
                  key={index}
                  shippingFee={
                    shippingFees.find((fee) => fee.sellerId === shop.owner.id)
                      ?.shippingFee
                  }
                />
              );
            })}

            <div className="mt--20 wishlist-table">
              <div className="row">
                <div className="col-12">
                  <div className="bg__white total-money">
                    <div className="row justify-content-end">
                      <div className="col-lg-5 col-12">
                        <div className="row total-row">
                          <div className="col-6 text-right">
                            Tổng tiền sản phẩm
                          </div>
                          <div className="col-6 text-right price">
                            $ {total - totalShippingFee}
                          </div>
                        </div>
                        <div className="row total-row">
                          <div className="col-6 text-right">Tiền ship</div>
                          <div className="col-6 text-right price">
                            $ {totalShippingFee}
                          </div>
                        </div>
                        <div className="row total-row">
                          <div className="col-6 text-right total-title">
                            Tổng cộng
                          </div>
                          <div className="col-6 text-right total-price">
                            $ {total}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt--20 wishlist-table">
              <div className="row">
                <div className="col-12">
                  <div className="bg__white total-money">
                    <div className="row justify-content-end align-items-center">
                      <div className="col-lg-10 col-12">
                        <div className="row">
                          <div className="col-4 text-right">
                            Chọn phương thức thanh toán
                          </div>
                          <div className="col-8 text-right">
                            <RadioButton
                              options={options}
                              justify="end"
                              initialValue={method}
                              onChange={(value) => onSelectMethod(value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="text-right" style={{ paddingRight: "2em" }}>
            <Button
              className="btn-order"
              size="large"
              onClick={() => handleCreateOrder()}
            >
              ĐẶT HÀNG
            </Button>
          </div> */}
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Checkout;
