import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import CoverImage from "./CoverImage/CoverImage";
import Home from "../pages/home/Home";
import ShopList from "../pages/shoplist/ShopList";
import Detail from "../pages/detail";
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
          path="/search"
          exact
          render={(props) => <ShopList key={Date.now()} />}
        />
      </Switch>
    </>
  );
};
