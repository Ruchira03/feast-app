import axios from "axios";
import React, { useState } from "react";
import "../styles/addrestaurent.css";
import { isauth } from "../core/authcheck";
import { Redirect } from "react-router-dom";

function Addrestaurent() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState(0);
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [street, setstreet] = useState("");
  const [description, setdescription] = useState("");
  const [doredirect, setdoredirect] = useState(false);

  function redirection() {
    if (doredirect) {
      if (isauth()) {
        return <Redirect to="/Addrestimg" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    return;
  }

  function submitrestdetails() {
    const token = localStorage.getItem("jwt");
    console.log(token);
    const address = street + " ," + city + ", " + state + ",India";
    console.log(address);

    axios
      .post(
        "http://localhost:8000/api/addrestaurant",
        {
          name: name,
          phone: phone,
          description: description,
          address: address,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((response) => {
        alert(response.data);
        console.log(response);
        setdoredirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <div class="addrestcont">
        <div class="row">
          <h1 className="addresttext">Add Restaurent</h1>
        </div>
        <div class="row">
          <h4
            className="tagline"
            style={{
              textAlign: "center",
            }}
          >
            we care for you!!!
          </h4>
        </div>
        <div class="row input-container">
          <div class="col-xs-12">
            <div class="styled-input wide">
              <input
                className="namaste"
                type="text"
                required
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <label>Stall Name</label>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="styled-input">
              <input
                className="namaste"
                type="text"
                required
                onChange={(e) => {
                  setstreet(e.target.value);
                }}
              />
              <label>Street</label>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div
              class="styled-input"
              style={{
                float: "right",
              }}
            >
              <input
                className="namaste"
                type="text"
                required
                onChange={(e) => {
                  setcity(e.target.value);
                }}
              />
              <label>City</label>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="styled-input">
              <input
                className="namaste"
                type="phonenumber"
                maxLength="10"
                minLength="10"
                required
                onChange={(e) => {
                  setphone(e.target.value);
                }}
              />
              <label>Phone Number</label>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div
              class="styled-input"
              style={{
                float: "right",
              }}
            >
              <input
                className="namaste"
                type="text"
                required
                onChange={(e) => {
                  setstate(e.target.value);
                }}
              />
              <label>State </label>
            </div>
          </div>
          <div class="col-xs-12">
            <div class="styled-input wide">
              <span>opening timings,speciality etc..</span>
              <textarea
                className="mycustomstyle textar"
                required
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              ></textarea>
              <label>Message</label>
            </div>
          </div>
          <div class="col-xs-12">
            <div onClick={submitrestdetails} class="btn-lrg submit-btn">
              Add Restaurent
            </div>
          </div>
        </div>
      </div>
      {redirection()}
    </div>
  );
}

export default Addrestaurent;
