import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Login from "./pages/login/Login";
import Signup from "./pages/register";
import Owner from "./pages/owner";
import OwnerReview from "./pages/ownerReview";
import Detail from "./pages/detail";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Layout from "./layouts";
import Profile from "./layouts/Profile";
import Seller from "./sellerLayout";
import Footer from "./layouts/Footer";
import Paypal from "./pages/paypal";
import ScrollToTop from "./components/ScrollToTop";
import { updateUser } from "./redux/actions/user";
import { setWishlist } from "./redux/actions/wishlist";
import { setCart } from "./redux/actions/cart";

function App() {
  const token = localStorage.getItem("TOKEN_AUTH");
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3001/users/profile`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          updateUser(res.data);
        })
        .catch((err) => {
          if (err.response?.status === 401)
            localStorage.removeItem("TOKEN_AUTH");
        });
      setWishlist();
      setCart();
    }
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route path="/" exact component={Layout} />
          <Route path="/shop" component={Layout} />
          <Route path="/search" exact component={Layout} />
          <Route
            path="/item/:id"
            exact
            render={(props) => <Detail id={props.match.params.id} />}
          />
          <Route
            path="/user/:id"
            exact
            render={(props) => <Owner id={props.match.params.id} />}
          />
          <Route
            path="/user/:id/review"
            exact
            render={(props) => <OwnerReview id={props.match.params.id} />}
          />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={Signup} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/checkout" component={Checkout} />
          <PrivateRoute exact path="/wishlist" component={Profile} />
          <PrivateRoute exact path="/orders" component={Profile} />
          <PrivateRoute exact path="/order/detail/:id" component={Profile} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/wallet" component={Profile} />
          <PrivateRoute path="/seller" component={Seller} />
          <PrivateRoute path="/paypal" component={Paypal} />
        </Switch>
      </ScrollToTop>
      <Footer />
    </Router>
  );
}

export default App;
