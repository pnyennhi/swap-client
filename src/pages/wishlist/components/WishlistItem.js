import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, Modal } from "antd";
import {
  PlusCircleOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default ({ wishlist, onDelete, onAdd }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCancel = () => {
    setShowModal(null);
  };

  const handleOk = () => {
    onDelete(showModal);
    setShowModal(null);
  };

  return (
    <div className="wishlist-area wishlist">
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="wishlist-content">
            <form action="#">
              <div
                className="wishlist-table wnro__table table-responsive"
                style={{ boxShadow: "none" }}
              >
                <Divider orientation="left">
                  <Link to={`/user/${wishlist.owner.id}`}>
                    {wishlist.owner.username}
                  </Link>
                </Divider>

                <table className="bg__white border-none">
                  <colgroup>
                    <col span="1" style={{ width: "50%" }} />
                    <col span="1" style={{ width: "15%" }} />
                    <col span="1" style={{ width: "12%" }} />
                    <col span="1" style={{ width: "13%" }} />
                    <col span="1" style={{ width: "5%" }} />
                  </colgroup>
                  <tbody>
                    {wishlist.products.map((item, index) => (
                      <tr
                        className={
                          item.product.quantity <= item.product.soldQuantity
                            ? "is-sold"
                            : ""
                        }
                        key={index}
                      >
                        <td className="product-name">
                          <Link
                            to={`/item/${item.productId}`}
                            className="flex align-items-center"
                          >
                            <img src={item.product.coverImage} alt="" />
                            <div className="ml-4">
                              <p className="name">{item.product.name}</p>
                              <p className="size">Size: {item.product.size}</p>
                            </div>
                          </Link>
                        </td>
                        <td className="product-price">
                          <span className="amount font-weight-600">
                            $ {item.product.price}
                          </span>
                        </td>
                        <td className="product-status">
                          <span className="wishlist-in-stock">
                            {item.product.quantity <= item.product.soldQuantity
                              ? "Hết hàng"
                              : "Còn hàng"}
                          </span>
                        </td>
                        <td className="product-add-to-cart">
                          <Button
                            className="btn-pink flex align-items-center"
                            onClick={() => onAdd(item.productId)}
                          >
                            <PlusCircleOutlined />
                            <ShoppingCartOutlined
                              style={{ fontSize: "22px" }}
                            />
                          </Button>
                        </td>
                        <td className="line-height-0 product-delete">
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
      >
        <p>Bạn có chắc chắn xóa sản phẩm này khỏi danh sách yêu thích?</p>
      </Modal>
    </div>
  );
};
