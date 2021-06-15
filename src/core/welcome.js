import React from "react";
import "../styles/welcomestyle.css";
import logo from "../images/logo.jpg";
import { Link } from "react-router-dom";

export default function welcome() {
  return (
    <div>
      <div className="container">
        <div className="left">
          <img src={logo} alt="Logo" />
        </div>
        <div className="content">
          <h1 className="myheadre">Welcome</h1>
          <section className="sectionitem">
            <div className="mybuttons">
              <Link to="/user/signin">
                <button className="button3">FOODIE</button>
              </Link>
              <Link to="/owner/signin">
                <button className="button3">OWNER</button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
