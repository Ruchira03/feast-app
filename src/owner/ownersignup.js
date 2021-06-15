import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/usersignup.css";
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
import { Redirect } from "react-router-dom";
import { isauth } from "../core/authcheck";

export default function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [doredirect, setdoredirect] = useState(false);

  function adddata() {
    axios
      .post("http://localhost:8000/api/owner/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        if (typeof Window !== "undefined") {
          if (response.data.accessToken != "undefined") {
            if (response.data.message === "REGISTERED SUCCESSFULLY") {
              localStorage.setItem("jwt", response.data.accessToken);
              setdoredirect(true);
            } else {
              setdoredirect(false);
              alert(response.data.message);
              console.log(response);
            }
          }
        } else {
          setdoredirect(false);
          alert(response.data.message);
          console.log(response);
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
        return <Redirect to="/addrestaurent" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    return;
  }

  const signupform = () => {
    return (
      <div
        className="signupcontainer"
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
          <div className="signup-form">
            <input
              required
              type="name"
              className="emailtext"
              placeholder="Enter your name"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />

            <input
              required
              type="email"
              className="emailtext"
              placeholder="Enter your Email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              required
              type="password"
              className="passwordtext"
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            ></input>

            <button className="signupbtn" onClick={adddata}>
              SIGN UP
            </button>

            <small>or</small>

            <small>already have an account? login here.</small>
            <Link to="/owner/signin">
              <button className="loginbtn">LOGIN</button>
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
            <img className="imagestrip" src={strip1} alt="" />
            <img className="imagestrip" src={strip2} alt="" />
            <img className="imagestrip" src={strip3} alt="" />
            <img className="imagestrip" src={strip4} alt="" />
            <img className="imagestrip" src={strip5} alt="" />
          </Carousel>
        </div>
      </div>
    );
  };

  return (
    <div>
      {signupform()}
      {redirection()}
    </div>
  );
}
