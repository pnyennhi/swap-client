import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import CoverImage from "./CoverImage/CoverImage";
import Home from "../pages/home/Home";
import ShopList from "../pages/shoplist/ShopList";
import UserList from "../pages/userList";
import Detail from "../pages/detail";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
export default (props) => {
  const [temp, setTemp] = useState(props);
  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <>
      <Header />
      <CategoryMenu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/shop/:category/:subCategory?"
          exact
          render={(props) => <ShopList key={props.location.pathname} />}
        />
        <Route
          path="/search/product"
          exact
          render={(props) => <ShopList key={Date.now()} />}
        />
        <Route
          path="/search/user"
          exact
          render={(props) => <UserList key={Date.now()} />}
        />
        <Route
          path="/item/:id"
          exact
          render={(props) => <Detail id={props.match.params.id} />}
        />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
      </Switch>
    </>
  );
};
