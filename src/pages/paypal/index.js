import { PayPalButton } from "react-paypal-button-v2";
import React from "react";
import { Redirect } from "react-router-dom";

export default (props) => {
  const total = 30
  return (
    <>
      {total ? (
        <>
          <p className="mb-4">Tổng tiền phải trả: {total}</p>
          <PayPalButton
            options={{
              clientId:
                "AR1N8XTZdI-fGyfBCT_6ZjLLzd4pO0P2a9jGagARJRiKriPPMH7H9bQx_YHY_3pSwozQwVqXxhKWd_SK",
            }}
            amount={total}
            shippingPreference="NO_SHIPPING"
            onSuccess={(details, data) => {
              console.log("Transaction completed by ", details, data);

              // OPTIONAL: Call your server to save the transaction
              // return fetch("/paypal-transaction-complete", {
              //   method: "post",
              //   body: JSON.stringify({
              //     orderID: data.orderID
              //   })
              // });
            }}
          />
        </>
      ) : (
        <Redirect to="/checkout" />
      )}
    </>
  );
};
