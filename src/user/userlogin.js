import React, { useState } from "react";
import "../styles/userlogin.css";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Background from "../images/background.png";
import logo from "../images/logo.jpg";
import Carousel from "react-elastic-carousel";
import strip1 from "../images/strip1.jpg";
import strip2 from "../images/strip2.jpg";
import strip3 from "../images/strip3.jpg";
import strip4 from "../images/strip4.jpg";
import strip5 from "../images/strip5.jpg";
import strip6 from "../images/strip6.jpg";
import strip7 from "../images/strip7.jpg";
import { isauth } from "../core/authcheck";

export default function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [doredirect, setdoredirect] = useState(false);

  function adddata() {
    //axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8000/api/customer/signin", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (typeof Window !== "undefined") {
          if (response.data.accessToken != "undefined") {
            if (response.data.message === "LOGGED IN SUCCESSFULLY") {
              localStorage.setItem("jwt", response.data.accessToken);
              setdoredirect(true);
            } else {
              setdoredirect(false);
              alert(response.data.message);
              console.log(response);
            }
          }
          console.log(isauth());
        } else {
          console.log("token not alloted");
        }
        alert(response.data.message);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong");
      });
  }

  function redirection() {
    if (doredirect) {
      if (isauth()) {
        return <Redirect to="/userhomepage" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    return;
  }

  const signinform = () => {
    return (
      <div
        className="signincontainer"
        style={{
          background: `url(${Background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="upside">
          <div className="image">
            <span className="imgholder">
              <img src={logo} alt="" className="logo-left" />
            </span>
          </div>
          <div className="signin-form">
            <input
              type="email"
              className="emailtext"
              placeholder="Enter your Email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              className="passwordtext"
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            ></input>

            <button className="loginbtn" onClick={adddata}>
              LOGIN
            </button>

            <small>or</small>

            <small>new to page? Create an account</small>
            <Link to="/user/signup">
              <button className="signupbtn">SIGNUP</button>
            </Link>
          </div>

          <div className="empty"></div>
        </div>
        <div className="downside">
          <Carousel
            itemsToShow={4}
            className="carasoul"
            enableAutoPlay
            autoPlaySpeed={1500}
          >
            <img className="imagestrip" src={strip1} alt="" />
            <img className="imagestrip" src={strip2} alt="" />
            <img className="imagestrip" src={strip3} alt="" />
            <img className="imagestrip" src={strip4} alt="" />
            <img className="imagestrip" src={strip5} alt="" />
            <img className="imagestrip" src={strip6} alt="" />
            <img className="imagestrip" src={strip7} alt="" />
          </Carousel>
        </div>
      </div>
    );
  };

  return (
    <div>
      {signinform()}
      {redirection()}
    </div>
  );
}
