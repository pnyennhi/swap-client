import React from "react";
import { Link } from "react-router-dom";
import { Input, Divider } from "antd";

export default ({ owner, products, shippingFee }) => (
  <div className="wishlist-area mt--30 bg__white">
    <div className="row">
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className="wishlist-content">
          <form action="#">
            <div className="wishlist-table wnro__table table-responsive">
              <table className="bg__white">
                <colgroup>
                  <col span="1" style={{ width: "60%" }} />
                  <col span="1" style={{ width: "15%" }} />
                  <col span="1" style={{ width: "10%" }} />
                  <col span="1" style={{ width: "15%" }} />
                </colgroup>
                {/* <thead>
                  <tr>
                    <th className="product-name product-th">
                      <span className="nobr">Sản phẩm</span>
                    </th>
                    <th className="product-price product-th">
                      <span className="nobr">Đơn giá</span>
                    </th>
                    <th className="product-amount product-th">
                      <span className="nobr">Số lượng</span>
                    </th>
                    <th className="product-total product-th">
                      <span className="nobr">Thành tiền</span>
                    </th>
                  </tr>
                </thead> */}
                <thead>
                  <tr>
                    <th className="product-name product-th">
                      <span className="nobr">{owner.username}</span>
                    </th>
                    <th className="product-price product-th">
                      {/* <span className="nobr">Đơn giá</span> */}
                    </th>
                    <th className="product-amount product-th">
                      {/* <span className="nobr">Số lượng</span> */}
                    </th>
                    <th className="product-total product-th">
                      {/* <span className="nobr">Thành tiền</span> */}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((item) => (
                    <tr>
                      <td className="product-name">
                        <Link to={`/item/`} className="flex align-items-center">
                          <img src={item.product.coverImage} alt="" />
                          <div className="ml-3">
                            <p className="name">{item.product.name}</p>
                            <p className="size">Size: {item.product.size}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="product-price">
                        <span className="amount">$ {item.product.price}</span>
                      </td>
                      <td className="product-amount">
                        <span className="amount">{item.quantity}</span>
                      </td>
                      <td className="product-total">
                        <span className="wishlist-in-stock">
                          $ {item.product.price * item.quantity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pl--40 pr-4 mt-3 py-3 bg__white">
                <div className="row">
                  <div className="col-md-4 col-12 font-weight-600">
                    Lời nhắn tới người bán
                  </div>
                  <div className="col-md-8 col-12">
                    <Input />
                  </div>
                </div>
              </div>
              <Divider />
              <div className="pl--40 pr-4 mt-2 py-3 bg__white">
                <div className="row justify-content-between">
                  <div className="col-md-4 col-12 font-weight-600">
                    Phương thức vận chuyển
                  </div>
                  <div className="col-md-3 col-8">
                    <div className="p-2 deli-method">
                      <div className="font-weight-600">
                        Giao hàng tiêu chuẩn
                      </div>
                      <p style={{ fontSize: "12px", lineHeight: "initial" }}>
                        (3 - 5 ngày)
                      </p>
                      <p className="font-weight-700">$ {shippingFee}</p>
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="pl--40 pr-4 mt-1 py-3 bg__white">
                <div className="row">
                  <div className="col-12">
                    <div className="row justify-content-end">
                      <div className="col-lg-5 col-12">
                        <div className="row total-row mb-1">
                          <div className="col-6 text-right">
                            Tổng tiền sản phẩm
                          </div>
                          <div className="col-6 text-right font-weight-600">
                            ${" "}
                            {products.reduce((sum, item) => {
                              return (sum +=
                                item.product.price * item.quantity);
                            }, 0)}
                          </div>
                        </div>
                        <div className="row total-row">
                          <div className="col-6 text-right">Tiền ship</div>
                          <div className="col-6 text-right font-weight-600">
                            $ {shippingFee}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
