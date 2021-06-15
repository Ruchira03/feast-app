import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Navbar,
  Nav,
  Jumbotron,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { isauth, signout } from "../core/authcheck";

function Orderhistory() {
  const [doredirect, setdoredirect] = useState(false);
  const [history, sethistory] = useState([{}]);
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

  function getorder_history() {
    axios
      .get("http://localhost:8000/api/orderHistory", {
        headers: {
          "x-access-token": localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res.data);
        sethistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getorder_history();
  }, []);

  function render_cart(json) {
    // if (idx) {
    return (
      <div>
        <Container>
          <div className="tabledu">
            {/* All Records */}
            <Row>
              <Table
                striped
                bordered
                hover
                size="sm"
                variant="dark"
                //className="shatab"
              >
                <thead>
                  <tr>
                    <th>Sl no.</th>
                    <th>Product Name</th>
                    <th>Order Quantity</th>
                    <th>Order Total Price</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {json.map((breakpoint, idx) => {
                    //if (idx) {
                    return (
                      <tr>
                        <td>{idx}</td>
                        <td>{breakpoint.product_name}</td>
                        <td>{breakpoint.order_quantity}</td>
                        <td>{breakpoint.order_total_price}</td>
                        <td>{breakpoint.order_status}</td>
                      </tr>
                    );
                    // }
                  })}
                </tbody>
              </Table>
            </Row>
          </div>
        </Container>
      </div>
    );
    //}
  }

  return (
    <div>
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
              <Button
                onClick={getorder_history}
                className="navbtn mr-5"
                variant="light "
              >
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

      {render_cart(history)}
      {redirection()}
    </div>
  );
}

export default Orderhistory;
