/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { updateUser } from "../../redux/actions/user";
import { setWishlist } from "../../redux/actions/wishlist";
import { setCart } from "../../redux/actions/cart";
import "./Login.css";

export default () => {
  let history = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    form.current.reportValidity();
    if (form.current.checkValidity()) {
      setIsLoading(true);
      axios
        .post("http://localhost:3001/auth/loginUser", {
          email,
          password,
        })
        .then((response) => {
          let token = response.data.token;
          localStorage.setItem("TOKEN_AUTH", token);
          axios
            .get(`http://localhost:3001/users/profile`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => {
              setError(null);
              setIsLoading(false);
              updateUser(res.data);
              setCart();
              setWishlist();
              history.goBack();
            })
            .catch((err) => {
              setError("Đã có lỗi xảy ra");
              setIsLoading(false);
            });
        })
        .catch((err) => {
          console.log(err.response);
          setError(err.response.data.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="login bg__cat--8 pt-5">
      <div className="col-lg-4 col-md-8 col-12 login__wrapper">
        <div className="my__account__wrapper">
          <h3 className="account__title">Login</h3>
          <form onSubmit={handleSubmit} ref={form}>
            <div className="account__form">
              <div className="input__box">
                <label>
                  Email <span>*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
              </div>
              <div className="input__box">
                <label>
                  Password <span>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p
                style={{
                  color: "red",
                  display: error ? "block" : "none",
                  marginBottom: "5px",
                  fontSize: "12px",
                }}
              >
                {error}
              </p>
              <div className="row input__remember">
                <div className="col-sm-6 col-12">
                  <label className="label-for-checkbox">
                    <input
                      id="rememberme"
                      className="input-checkbox"
                      name="rememberme"
                      value="forever"
                      type="checkbox"
                    />
                    <span>Remember me</span>
                  </label>
                </div>
                <div className="col-sm-6 col-12 text-right">
                  <a className="forget_pass" href="#">
                    Lost your password?
                  </a>
                </div>
              </div>
              <div className="form__btn">
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
