import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Toast from "light-toast";
import "./Cart.css";
import CartItem from "./components/CartItem";
import Header from "../../layouts/Header/Header";
import CategoryMenu from "../../layouts/CategoryMenu/CategoryMenu";
import { Checkbox, Button } from "antd";
import { useSelector } from "react-redux";
import { productMapper } from "../../utils";
import {
  setCart,
  updateCart,
  deleteCart,
  setSelectedItems,
} from "../../redux/actions/cart";

export default () => {
  let history = useHistory();

  const products = productMapper(useSelector((store) => store.cart.cart));
  const carts = useSelector((store) => store.cart.cart);
  const selectedItems = useSelector((store) => store.cart.selectedItems);

  // const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCart();
  }, []);

  useEffect(() => {
    setTotal(
      carts.reduce((acc, item) => {
        if (selectedItems.includes(Number(item.productId)))
          return (acc += item.product.price * item.quantity);
        return acc;
      }, 0)
    );
  }, [selectedItems]);

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(carts.map((item) => item.productId));
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckShop = (e, ownerId) => {
    const productIds = carts
      .filter((item) => item.product.ownerId === ownerId)
      .map((item) => item.productId);

    const newSelectedItems = [...selectedItems];

    productIds.forEach((item) => {
      if (newSelectedItems.indexOf(item) > -1)
        newSelectedItems.splice(newSelectedItems.indexOf(item), 1);
    });

    if (e.target.checked) {
      setSelectedItems([...newSelectedItems, ...productIds]);
    } else {
      setSelectedItems(newSelectedItems);
    }
  };

  const handleCheckItem = (e, productId) => {
    const newSelectedItems = [...selectedItems];
    if (e.target.checked) {
      setSelectedItems(
        selectedItems.includes(productId)
          ? selectedItems
          : [...selectedItems, productId]
      );
    } else {
      newSelectedItems.splice(newSelectedItems.indexOf(productId), 1);
      setSelectedItems(newSelectedItems);
    }
  };

  const handleChangeQuantity = (productId, value) => {
    const reg = new RegExp(/^\d+$/);

    if (!value)
      Toast.fail("Số lượng không được trống", 2000, () => {
        return false;
      });
    else if (!reg.test(value)) {
      Toast.fail("Số lượng phải là số nguyên", 2000, () => {
        return false;
      });
    } else {
      updateCart(productId, value);
      return true;
    }
  };

  const handleDelete = (productId) => {
    deleteCart(productId);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Toast.info("Vui lòng chọn sản phẩm thanh toán", 2000);
    } else {
      history.push("/checkout");
    }
  };

  return (
    <>
      <Header />
      <CategoryMenu />
      <section className="cart-area pt-4">
        <div className="container">
          <div className="wishlist-table wnro__table">
            <table className="bg--white header">
              <colgroup>
                <col span="1" style={{ width: "5%" }} />
                <col span="1" style={{ width: "50%" }} />
                <col span="1" style={{ width: "10%" }} />
                <col span="1" style={{ width: "10%" }} />
                <col span="1" style={{ width: "10%" }} />
                <col span="1" style={{ width: "15%" }} />
              </colgroup>
              <tbody>
                <th></th>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tbody>
            </table>
          </div>
          <>
            {products.map((item, index) => (
              <>
                <CartItem
                  cart={item}
                  key={index}
                  selectedItems={selectedItems}
                  onCheckShop={handleCheckShop}
                  onCheckItem={handleCheckItem}
                  onChangeQuantity={handleChangeQuantity}
                  onDelete={handleDelete}
                />
              </>
            ))}
          </>
          <div className="mt-5 cart-footer">
            <div className="row">
              <div className="col-12">
                <div className="bg-white p-4 flex justify-content-between align-items-center">
                  <div>
                    <Checkbox
                      checked={selectedItems.length === carts.length}
                      onChange={(e) => handleCheckAll(e)}
                    />
                    <span className="check-all">Chọn tất cả</span>
                  </div>
                  <div className="flex align-items-center">
                    <span className="total">Tổng tiền</span>
                    <span className="total-amount">{total}</span>
                    <Button
                      className="btn-order btn-orange text-upper font-weight-700"
                      size="large"
                      onClick={() => handleCheckout()}
                    >
                      Mua hàng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
