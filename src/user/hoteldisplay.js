import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "../styles/hoteldisplay.css";
import hotel1 from "../images/hotel1.jpg";
import hotel2 from "../images/hotel2.jpg";
import hotel3 from "../images/hotel3.jpg";
import hotel4 from "../images/hotel4.jpg";
import hotel5 from "../images/hotel4 (1).jpg";
import hotel6 from "../images/hotel4 (2).jpg";
import hotel7 from "../images/hotel4 (3).jpg";
import hotel8 from "../images/hotel4 (4).jpg";
import hotel9 from "../images/hotel4 (5).jpg";
import hotel10 from "../images/hotel4 (6).jpg";
import hotel11 from "../images/hotel4 (7).jpg";
import hotel12 from "../images/hotel4 (8).jpg";
import hotel13 from "../images/hotel4 (9).jpg";
import hotel14 from "../images/hotel4 (10).jpg";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";
const hotel = [
  hotel1,
  hotel2,
  hotel3,
  hotel4,
  hotel5,
  hotel5,
  hotel6,
  hotel7,
  hotel8,
  hotel9,
  hotel10,
  hotel11,
  hotel12,
  hotel13,
  hotel14,
  hotel8,
  hotel12,
  hotel5,
  hotel10,
  hotel5,
  hotel2,
  hotel3,
  hotel4,
  hotel5,
  hotel6,
  hotel7,
  hotel8,
  hotel9,
  hotel10,
  hotel11,
  hotel12,
  hotel13,
  hotel14,
  hotel8,
  hotel12,
  hotel5,
  hotel10,
];

function Hoteldisplay() {
  const [json, setjson] = useState([{}]);
  const [doredirect, setdoredirect] = useState(false);
  function setjsonobject() {
    setjson(JSON.parse(localStorage.getItem("location")));
    console.log(json);
  }

  function makeapi_request() {
    var id = localStorage.getItem("selected_rest");
    axios
      .get(`http://localhost:8000/api/restaurants/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("jwt"),
        },
      })
      .then((Response) => {
        console.log(Response.data);
        setdoredirect(true);
        localStorage.setItem("menu", JSON.stringify(Response.data.menu));
        localStorage.setItem("review", JSON.stringify(Response.data.review));
        localStorage.setItem("rating", JSON.stringify(Response.data.rating));
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong");
      });
  }

  function redirection() {
    if (doredirect) {
      return <Redirect to="/menudisplay" />;
    }
    return;
  }

  const renderCard = (card, index) => {
    if (card.restaurant_accept_orders) {
      return (
        <Card key={index} className="item" style={{ width: "18rem" }}>
          <Card.Img variant="top" src={hotel[index]} />
          <Card.Body>
            <Card.Title>{card.restaurant_name}</Card.Title>
            <Card.Text>{card.restaurant_address}</Card.Text>

            <Button
              onClick={() => {
                localStorage.setItem(
                  "selected_rest_details",
                  JSON.stringify(card)
                );
                localStorage.setItem("selected_rest", card.restaurant_id);
                makeapi_request();
              }}
              variant="primary"
              size="sm"
              className="but"
            >
              See Menu
            </Button>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card key={index} className="item" style={{ width: "18rem" }}>
          <Card.Img variant="top" src={hotel[index]} />
          <Card.Body>
            <Card.Title>{card.restaurant_name}</Card.Title>
            <Card.Text>{card.restaurant_address}</Card.Text>

            <Button
              onClick={() => {
                // localStorage.setItem(
                //   "selected_rest_details",
                //   JSON.stringify(card)
                // );
                // localStorage.setItem("selected_rest", card.restaurant_id);
                // makeapi_request();
              }}
              variant="danger"
              size="sm"
              className="but"
            >
              not accepting
            </Button>
          </Card.Body>
        </Card>
      );
    }
  };

  useEffect(() => {
    setjsonobject();
  }, []);

  return (
    <div className="display">
      <div className="griddisplay">
        {json.map(renderCard)} {redirection()}
      </div>
    </div>
  );
}

export default Hoteldisplay;
