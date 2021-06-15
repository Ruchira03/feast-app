import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Card,
  Button,
  Navbar,
  Nav,
  ListGroup,
  InputGroup,
  FormControl,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import "../styles/hoteldisplay.css";
import { isauth, signout } from "../core/authcheck";
import axios from "axios";

function Cart() {
  const [doredirect, setdoredirect] = useState(false);
  const [json, setjson] = useState([{}]);
  const [qty, setqty] = useState(1);
  const [total_price, settotal_price] = useState(0);

  function order_place() {
    const hotel_details = JSON.parse(
      localStorage.getItem("selected_rest_details")
    );
    const product = JSON.parse(localStorage.getItem("checkout_product"));
    console.log(hotel_details);
    axios
      .post(
        "http://localhost:8000/api/checkout",
        {
          restaurant_id: hotel_details.restaurant_id,
          product_id: product.product_id,
          quantity: qty,
          total_price: total_price,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert(res.data);
        localStorage.removeItem("checkout_product");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function setjsonobject() {
    setjson(JSON.parse(localStorage.getItem("cartitems")));
  }

  useEffect(() => {
    setjsonobject();
  }, []);

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
                    <th>Product Price</th>
                    <th>Order quantity</th>
                    <th>Total price</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {json.map((breakpoint, idx) => {
                    if (idx) {
                      return (
                        <tr>
                          <td>{idx}</td>
                          <td>{breakpoint.product_name}</td>
                          <td>{breakpoint.product_price}</td>
                          <td>
                            <input
                              type="number"
                              onChange={(e) => {
                                setqty(e.target.value);
                                settotal_price(qty * breakpoint.product_price);
                              }}
                            />
                          </td>
                          <td>{qty * breakpoint.product_price}</td>

                          <td>
                            <Button
                              className="editbtn"
                              variant="warning"
                              onClick={() => {
                                localStorage.setItem(
                                  "checkout_product",
                                  JSON.stringify(breakpoint)
                                );

                                order_place();
                              }}
                            >
                              PLACE ORDER
                            </Button>
                          </td>
                        </tr>
                      );
                    }
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
      <div>
        {" "}
        <div className="shopping-cart"></div>
      </div>
      <div>{render_cart(json)} </div>
      <div> {redirection()}</div>
    </div>
  );
}

export default Cart;
