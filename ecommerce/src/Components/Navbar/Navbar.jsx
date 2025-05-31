import { useEffect, useRef, useState } from "react";
import React from "react";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = () => {
  const [menuColor, setMenuColor] = useState("home");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("active");
    e.target.classList.toggle("open");
  };

  return (
    <div className="Navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <p>Quickmerce</p>
      </div>
      <img
        className="nav_dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt="nav_dropdown"
      />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenuColor("home")}>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Home
          </Link>
          {menuColor === "home" && <hr />}
        </li>
        <li onClick={() => setMenuColor("men")}>
          <Link style={{ textDecoration: "none", color: "black" }} to="/men">
            Men
          </Link>
          {menuColor === "men" && <hr />}
        </li>
        <li onClick={() => setMenuColor("woman")}>
          <Link style={{ textDecoration: "none", color: "black" }} to="/woman">
            Woman
          </Link>
          {menuColor === "woman" && <hr />}
        </li>
        <li onClick={() => setMenuColor("kids")}>
          <Link style={{ textDecoration: "none", color: "black" }} to="/kids">
            Kids
          </Link>
          {menuColor === "kids" && <hr />}
        </li>
      </ul>
      <div className="cart-login">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
            className="cart-login-btn"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="cart-login-btn">Login</button>
          </Link>
        )}

        <Link style={{ textDecoration: "none", color: "black" }} to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="cart-login-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
