import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductList from "../pages/sellerProductList";
import AddProduct from "../pages/addProduct";
import EditProduct from "../pages/editProduct";
import OrderList from "../pages/sellerOrderList";
import OrderDetail from "../pages/sellerOrderDetail";
import AcceptOrder from "../pages/sellerAcceptOrder";
import Revenue from "../pages/revenue";
import Wallet from "../pages/wallet";
import Dashboard from "../pages/sellerDashboard";

const SellerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="seller">
        <Sidebar
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        />
        <div style={{ flexGrow: 1 }}>
          <Header style={{ marginLeft: collapsed ? 80 : 250 }} />
          <div
            className="content"
            style={{
              marginLeft: collapsed ? 80 : 250,
              width: "calc(100% - 250px)",
            }}
          >
            {/* <Header /> */}
            <Switch>
              <Redirect exact from="/seller" to="/seller/dashboard" />
              <Route
                path="/seller/dashboard"
                exact
                render={() => <Dashboard />}
              />
              <Route
                path="/seller/products/list"
                exact
                render={() => <ProductList />}
              />
              <Route
                path="/seller/products/add"
                exact
                render={() => <AddProduct />}
              />
              <Route
                path="/seller/products/edit/:id"
                exact
                render={(props) => <EditProduct id={props.match.params.id} />}
              />
              <Route path="/seller/orders" exact render={() => <OrderList />} />
              <Route
                path="/seller/orders/detail/:id"
                exact
                render={(props) => <OrderDetail id={props.match.params.id} />}
              />
              <Route
                path="/seller/orders/accept/:id"
                exact
                render={(props) => <AcceptOrder id={props.match.params.id} />}
              />
              <Route path="/seller/revenue" exact render={() => <Revenue />} />
              <Route path="/seller/wallet" exact render={() => <Wallet />} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
