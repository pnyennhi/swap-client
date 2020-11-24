/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ProfileImage from "../components/ProfileImage";
import Sidebar from "./Sidebar";
import Header from "./Header/Header";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import Profile from "../pages/profile";
import Wishlist from "../pages/wishlist";
import Order from "../pages/order";
import OrderDetail from "../pages/orderDetail";
import Wallet from "../pages/wallet";
import { uploadUserImage } from "../firebase";
import Axios from "../Axios";
import { updateUser } from "../redux/actions/user";

export default () => {
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState({
    avatarImage: false,
    coverImage: false,
  });

  const handleChangeImage = (field, value) => {
    setIsLoading({ ...isLoading, [field]: true });
    uploadUserImage(value)
      .then((res) => {
        Axios.put("/users/profile", {
          ...user,
          [field]: res,
        })
          .then((res) => {
            updateUser(res.data);
            setIsLoading({ ...isLoading, [field]: false });
          })
          .catch((err) => {
            console.log(err);
            setIsLoading({ ...isLoading, [field]: false });
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading({ ...isLoading, [field]: false });
      });
  };

  return (
    <>
      <Header />
      <CategoryMenu />
      <section className="bg-f7">
        {/* <div className="row">
          <div className="col-sm-12 col-md-12 position-relative">
            <img src={user?.coverImage} className="cover-image user" />
            {isLoading.coverImage && <div className="layer-upload-image"></div>}
            <label htmlFor="coverImage" className="label-upload-cover">
              <CameraOutlined /> Upload picture
            </label>
            <input
              type="file"
              name="coverImage"
              id="coverImage"
              accept="image/*"
              onChange={(e) =>
                handleChangeImage(e.target.name, e.target.files[0])
              }
              hidden
              className="upload-image-input"
            />
          </div>

          <div className="col-12">
            <div className="position-relative avatar-wrapper">
              <img src={user?.avatarImage} className="preview-image user" />
              {isLoading.avatarImage && (
                <div className="layer-upload-image"></div>
              )}
              <label htmlFor="avatarImage" className="label-upload-avatar">
                <CameraOutlined style={{ fontSize: "22px", color: "#fff" }} />
              </label>
              <input
                type="file"
                name="avatarImage"
                id="avatarImage"
                accept="image/*"
                onChange={(e) =>
                  handleChangeImage(e.target.name, e.target.files[0])
                }
                hidden
                className="upload-image-input"
              />
            </div>
          </div>
        </div> */}
        <ProfileImage
          avatarImage={user?.avatarImage}
          coverImage={user?.coverImage}
          isLoading={isLoading}
          editable={true}
          onChange={handleChangeImage}
        />
        <div className="container">
          <div className="flex">
            <Sidebar />
            <div className="content bg--white">
              <Switch>
                <Route path="/profile" component={Profile} />
                <Route path="/wishlist" component={Wishlist} />
                <Route path="/wallet" component={Wallet} />
                <Route path="/orders" component={Order} />
                <Route path="/order/detail/:id" component={OrderDetail} />
              </Switch>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
