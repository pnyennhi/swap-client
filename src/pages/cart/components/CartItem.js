import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Checkbox, InputNumber, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Product from "../../../components/Product-Row";

export default ({
  cart,
  selectedItems,
  onCheckShop,
  onCheckItem,
  onChangeQuantity,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);

  const quantity = useRef();

  const handleChangeQuantity = (id, value) => {
    const res = onChangeQuantity(id, value);
    if (!res) quantity.current.focus();
  };

  const handleCancel = () => {
    setShowModal(null);
  };

  const handleOk = () => {
    onDelete(showModal);
    setShowModal(null);
  };

  return (
    <div className="wishlist-area cart-item">
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 mt--40">
          <div className="wishlist-content">
            <form action="#">
              <div className="wishlist-table wnro__table table-responsive">
                <table className="title">
                  <colgroup>
                    <col span="1" style={{ width: "5%" }} />
                    <col span="1" style={{ width: "95%" }} />
                  </colgroup>
                  <tr>
                    <td className="product-checkbox">
                      <Checkbox
                        checked={
                          cart.products.filter((item) =>
                            selectedItems.includes(Number(item.productId))
                          ).length === cart.products.length
                        }
                        onChange={(e) => onCheckShop(e, cart.owner.id)}
                      />
                    </td>
                    <td>{cart.owner.username}</td>
                  </tr>
                </table>
                <table className="bg__white">
                  <colgroup>
                    <col span="1" style={{ width: "5%" }} />
                    <col span="1" style={{ width: "50%" }} />
                    <col span="1" style={{ width: "10%" }} />
                    <col span="1" style={{ width: "10%" }} />
                    <col span="1" style={{ width: "10%" }} />
                    <col span="1" style={{ width: "15%" }} />
                  </colgroup>
                  <tbody>
                    {cart.products.map((item, index) => (
                      <tr
                        className={
                          item.product.quantity <= item.product.soldQuantity
                            ? "is-sold"
                            : ""
                        }
                        key={index}
                      >
                        <td className="product-checkbox">
                          <Checkbox
                            checked={selectedItems.includes(
                              Number(item.productId)
                            )}
                            onChange={(e) =>
                              onCheckItem(e, Number(item.productId))
                            }
                          />
                        </td>
                        <td className="product-name">
                          <Product
                            name={item.product.name}
                            size={item.product.size}
                            imageSrc={item.product.coverImage}
                            id={item.productId}
                          />
                        </td>
                        <td className="product-price">
                          <span className="amount">$ {item.product.price}</span>
                        </td>
                        <td className="product-amount">
                          {item.product.quantity > item.product.soldQuantity ? (
                            <InputNumber
                              ref={quantity}
                              defaultValue={item.quantity}
                              max={
                                item.product.quantity -
                                item.product.soldQuantity
                              }
                              min={1}
                              onChange={(value) =>
                                handleChangeQuantity(item.productId, value)
                              }
                              onPressEnter={(e) => e.preventDefault()}
                            />
                          ) : null}
                        </td>
                        <td className="product-total text-right">
                          <span className="wishlist-in-stock">
                            $ {item.product.price * item.quantity}
                          </span>
                        </td>
                        <td className="product-delete line-height-0 text-right">
                          <DeleteOutlined
                            className="icon-action icon-delete-product"
                            onClick={() => setShowModal(item.productId)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        title="Xóa sản phẩm"
        visible={!!showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn xóa sản phẩm này khỏi giỏ hàng?</p>
      </Modal>
    </div>
  );
};
