import React from "react";
import "./Footer.css";
import logo from "../Assets/logo.png";
import instagram_icon from "../Assets/instagram_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import pintester_icon from "../Assets/pintester_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} alt="" />
        <h2>Quickmerce</h2>
      </div>
      <ul className="footer-links">
        <li className="links-name" >Company</li>
        <li className="links-name" >Products</li>
        <li className="links-name" >Offices</li>
        <li className="links-name" >About</li>
        <li className="links-name" >Contact</li>
      </ul>
      <div className="social-logos">
        <div className="social-logo-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="social-logo-container">
          <img src={whatsapp_icon} alt="" />
        </div>
        <div className="social-logo-container">
          <img src={pintester_icon} alt="" />
        </div>
      </div>
      <div className="copyright">
        <hr />
        <p>Copyrights @ 2025  - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
