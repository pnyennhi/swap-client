import { PayPalButton } from "react-paypal-button-v2";
import React from "react";

export default ({ total, onSuccess, onError }) => {
  return (
    <div className="row justify-content-center">
      <div className="paypal-wrapper col-12 mt-4">
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
              console.log("Transaction completed by ", details);
              onSuccess();

              // OPTIONAL: Call your server to save the transaction
              // return fetch("/paypal-transaction-complete", {
              //   method: "post",
              //   body: JSON.stringify({
              //     orderID: data.orderID
              //   })
              // });
            }}
            onError={() => onError()}
          />
        </>
      </div>
    </div>
  );
};
