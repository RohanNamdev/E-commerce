import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/add-product-icon.svg";
import list_product_icon from "../../assets/list-product-icon.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/addproduct" style={{ textDecoration: "none" }}>
        <div className="sidebarItem">
          <img src={add_product_icon} alt="" />
          <span>Add Product</span>
        </div>
      </Link>
      <Link to="/listproduct" style={{ textDecoration: "none" }}>
        <div className="sidebarItem">
          <img src={list_product_icon} alt="" />
          <span>Product List</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
