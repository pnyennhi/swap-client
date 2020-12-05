/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import Toast from "light-toast";
import "../login/Login.css";
import { updateUser } from "../../redux/actions/user";

export default () => {
  let history = useHistory();

  const [signup, setSignup] = useState({
    username: null,
    password: null,
    confirmPassword: null,
    email: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    form.current.reportValidity();
    if (form.current.checkValidity()) {
      if (signup.password !== signup.confirmPassword) {
        setError("Mật khẩu không trùng khớp");
        return;
      }
      setIsLoading(true);
      axios
        .post("http://localhost:3001/users", {
          ...signup,
        })
        .then((res) => {
          Toast.success("Đăng ký thành công", 2000);
          axios
            .post("http://localhost:3001/auth/loginUser", {
              email: signup.email,
              password: signup.password,
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
                  history.goBack();
                })
                .catch((err) => {
                  setError("Đã có lỗi xảy ra");
                  setIsLoading(false);
                });
            })
            .catch((err) => {
              setError(err.response.message);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          setError(err.response.data);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="login bg__cat--8 pt-5">
      <div className="col-lg-5 col-md-8 col-12 login__wrapper">
        <div className="my__account__wrapper">
          <h3 className="account__title">Đăng kí</h3>
          <form onSubmit={handleSubmit} ref={form}>
            <div className="account__form">
              <div className="input__box">
                <label>
                  Email <span>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={(e) =>
                    setSignup({
                      ...signup,
                      [e.target.name]: e.target.value.trim(),
                    })
                  }
                />
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="input__box">
                    <label>
                      Mật khẩu <span>*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      onChange={(e) =>
                        setSignup({
                          ...signup,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="input__box">
                    <label>
                      Xác nhận mật khẩu <span>*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      onChange={(e) =>
                        setSignup({
                          ...signup,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="input__box">
                <label>
                  Tên hiển thị <span>*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  onChange={(e) =>
                    setSignup({ ...signup, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <p
                style={{
                  color: "red",
                  display: error ? "block" : "none",
                }}
              >
                {error}
              </p>
              <div className="form__btn">
                <button className="btn-pink mb-3" type="submit">
                  Đăng ký
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
