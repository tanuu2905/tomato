import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
            aut! Optio eveniet rerum aliquid praesentium, enim suscipit
            exercitationem, reprehenderit quod expedita numquam culpa ad nemo
            quam molestiae inventore commodi sunt?
          </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon}/>
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="footer-content-center">
      <h2>COMPANY</h2>
      <ul>
        <li>Home</li>
        <li>About us</li>
        <li>Delivery</li>
        <li>Privacy policy</li>
      </ul>

        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@tomato.com</li>

            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright2025 © Tomato.com -All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
