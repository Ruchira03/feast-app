import React, { useState, useEffect } from "react";
//import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Card, Button, Navbar, Nav, Jumbotron, Image } from "react-bootstrap";
//import "../styles/hoteldisplay.css";
import hotel13 from "../images/hotel4 (9).jpg";
import { isauth, signout } from "../core/authcheck";
import axios from "axios";

function Menudisplay() {
  const [json, setjson] = useState([{}]);
  const [cartlist, setcartlist] = useState([{}]);
  const [doredirect, setdoredirect] = useState(false);
  const [hoteldetails, sethoteldetails] = useState([{}]);
  const [review, setreview] = useState("");
  const [reviewjson, setreviewjson] = useState([{}]);
  const [rating, setrating] = useState("");
  const [restname, setrestname] = useState("");
  const [accept, setaccept] = useState(false);
  function setjsonobject() {
    setjson(JSON.parse(localStorage.getItem("menu")));
    // sethoteldetails(JSON.parse(localStorage.getItem("hotelname")));
    setreviewjson(JSON.parse(localStorage.getItem("review")));
    setrating(JSON.parse(localStorage.getItem("rating")));
    sethoteldetails(JSON.parse(localStorage.getItem("selected_rest_details")));
  }
  useEffect(() => {
    setjsonobject();
  }, []);
  const renderCard = (card, index) => {
    return (
      <Card key={index} className="item" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{card.product_name}</Card.Title>
          <Card.Text>{card.product_description}</Card.Text>
          <Card.Text>{card.product_price}</Card.Text>
          <Button
            onClick={() => {
              alert("selected");
              setcartlist((oldArray) => [...oldArray, card]);
            }}
            variant="primary"
            size="sm"
            className="but"
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    );
  };

  function render_review(key, index) {
    // var rat = rating[0].rating;
    return (
      <div
        style={{
          marginTop: "30px",
          borderRadius: "500px",
          border: "0.5px rgba(0, 0, 0, 0.8)",
        }}
      >
        <Card key={index}>
          <Card.Subtitle className="mb-2 text-muted">
            <Card.Body>{key.name}</Card.Body>
          </Card.Subtitle>
          <Card.Title>{key.review_comment}.</Card.Title>
        </Card>
      </div>
    );
  }

  function redirection() {
    if (doredirect) {
      if (isauth()) {
        return <Redirect to="/user/signup" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    return;
  }

  function discription() {
    var lat = hoteldetails.latitude;
    var lon = hoteldetails.longitude;
    // var restname = localStorage.getItem("selected_rest_name");
    var rat = 3;
    return (
      <div>
        <Jumbotron>
          <h1>{hoteldetails.restaurant_name}</h1>
          <h5>{hoteldetails.restaurant_description}</h5>
          <p>{hoteldetails.restaurant_address}</p>
          <p>
            <Button
              variant="primary"
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}
            >
              Get direction
            </Button>
            <div>
              <h4> Avarage Rating {rat}</h4>
            </div>
          </p>
        </Jumbotron>
      </div>
    );
  }

  function post_review() {
    axios
      .post(
        "http://localhost:8000/api/review",
        {
          restaurant_id: hoteldetails.restaurant_id,
          rating: 1,
          review: review,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //start accepting orders
 const startaccept = () => {
    axios
      .put(
        "http://localhost:8000/api/orders",
        { accepting_order: 1 },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwt"),
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        setaccept(true);
      })
      .catch((error) => console.log("error", error));
  };

  //stop accepting orders
 const stoptaccept = () => {
    axios
      .put(
        "http://localhost:8000/api/orders",
        { accepting_order: 0 },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwt"),
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        setaccept(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="display">
      <div>
        <Navbar bg="dark" variant="dark" className="shatab">
          <Nav className="mr-auto">
            <Link to="/userhomepage">
              <Button className="navbtn mr-5" variant="light ">
                FEAST
              </Button>
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <Link to="/menudisplay">
              <Button className="navbtn mr-5" variant="light ">
                HOTEL MENU
              </Button>
            </Link>
            <Link to="/cart">
              <Button className="navbtn mr-5" variant="light ">
                CART/CHECKOUT
              </Button>
            </Link>
            <Link to="/orderhistory">
              <Button className="navbtn mr-5" variant="light ">
                ORDER HISTORY
              </Button>
            </Link>

            <Button
              onClick={() => {
                signout();
                setdoredirect(true);
              }}
              className="navbtn mr-5"
              variant="light"
            >
              LOGOUT
            </Button>
          </Nav>
        </Navbar>
      </div>
      <div className="hotelimgkano">
        <img src={hotel13} alt="" />
        <div className="poortimaadu">{discription()}</div>
      </div>

      <div className="griddisplay">
        {json.map(renderCard)}
        {localStorage.setItem("cartitems", JSON.stringify(cartlist))}

        {redirection()}
      </div>
      <div
        style={{
          margin: "130px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Add Review</h1>
        <input
          placeholder="Enter your review"
          style={{ height: "40px", width: "800px" }}
          type="text"
          onChange={(e) => {
            setreview(e.target.value);
          }}
        />
        <br></br>
        <input
          placeholder="Enter your rating from 1 - 5"
          type="number"
          min="0"
          max="5"
          style={{ height: "40px", width: "800px" }}
        />
        <br />
        <Button onClick={post_review} variant="dark">
          Submit Review
        </Button>
        <div style={{ marginTop: "50px" }}>
          <h1>REVIEW SECTION</h1>
        </div>
        <div>{reviewjson.map(render_review)}</div>
      </div>
    </div>
  );
}

export default Menudisplay;
