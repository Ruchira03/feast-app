import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../styles/userhomepage.css";
import { Link } from "react-router-dom";
import "../styles/hoteldisplay.css";

function Userhomepage() {
  const [location, setlocation] = useState("");
  const [name, setname] = useState("");
  const [doredirect, setdoredirect] = useState(false);
  const [doredirecttoname, setdoredirecttoname] = useState(false);
  function searchbylocation() {
    axios
      .post(
        "http://localhost:8000/api/getRestaurantByLocation",
        {
          location: location,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwt"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setdoredirect(true);
        localStorage.setItem("location", JSON.stringify(response.data));
        localStorage.setItem("hotelname", JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function redirection() {
    if (doredirect) {
      return <Redirect to="/card" />;
    }
    return;
  }

  function doredirecttohotel() {
    if (doredirecttoname) {
      return <Redirect to="/cardbyname" />;
    }
    return;
  }

  function searchbyname() {
    axios
      .post(
        "http://localhost:8000/api/getRestaurantByName",
        {
          name: name,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwt"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setdoredirecttoname(true);
        localStorage.setItem("hotelname", JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="html">
      <div className="container">
     

        <div className="cover">
          <h1 className="h1tag">Try our foods.</h1>
          <div className="flex-form">
            <label className="label">
              <i className="ion-location"></i>
            </label>
            <input
              type="search"
              placeholder="Search restaurant by Location"
              className="hudkumaga"
              required
              onChange={(e) => {
                setlocation(e.target.value);
              }}
            />
            <input onClick={searchbylocation} type="submit" value="Search" />
          </div>

          <div className="flex-form">
            <label className="label">
              <i className="ion-location"></i>
            </label>
            <input
              type="search"
              placeholder="Search restaurant by restaurant name"
              className="hudkumaga"
              onChange={(e) => {
                setname(e.target.value);
              }}
              required
            />
            <input onClick={searchbyname} type="submit" value="Search" />
          </div>
        </div>
      </div>
      <div>
        {redirection()}
        {doredirecttohotel()}
      </div>
    </div>
  );
}

export default Userhomepage;
