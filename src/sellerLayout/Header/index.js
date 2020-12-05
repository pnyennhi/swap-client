import React, { useState } from "react";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import Dropdown from "./components/UserDropdown";

const Header = () => {
  const user = useSelector((store) => store.user);
  const [show, setShow] = useState(false);

  return (
    <div className="bg--white py-2 header flex align-items-center justify-content-end position-relative">
      <span className="mr-3">Hi, {user?.username}</span>
      <Avatar src={user?.avatarImage} onClick={() => setShow(!show)} />
      {show && <Dropdown isLoggedIn={user} onToggle={() => setShow(!show)} />}
    </div>
  );
};

export default Header;
