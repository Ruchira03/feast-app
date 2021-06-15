import React from "react";
import axios from "axios";
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Alert,
  Table,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "../styles/table.css";
import { isauth, signout } from "../core/authcheck";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [
        {
          user_name: "ruthik",
          product_name: "masala dose",
          product_price: "70",
          order_quantity: "2",
          total_price: "140",
        },
        {
          user_name: "ruthik",
          product_name: "masala dose",
          product_price: "70",
          order_quantity: "2",
          total_price: "140",
        },
        {
          user_name: "ruthik",
          product_name: "masala dose",
          product_price: "70",
          order_quantity: "2",
          total_price: "140",
        },
        {
          user_name: "ruthik",
          product_name: "masala dose",
          product_price: "70",
          order_quantity: "2",
          total_price: "140",
        },
        {
          user_name: "ruthik",
          product_name: "masala dose",
          product_price: "70",
          order_quantity: "2",
          total_price: "140",
        },
      ],
      doredirect: false,
      id: "",
      update: false,
      accept: 0,
    };
  }

  componentWillMount() {
    this.fetchAllRecords();
  }

  // fetch All Records
  fetchAllRecords = () => {
    axios
      .get("http://localhost:8000/api/orders", {
        headers: {
          "x-access-token": localStorage.getItem("jwt"),
        },
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.length == 0) {
          this.state.accept = 1;
        } else {
          this.state.accept = result.data[0].restaurant_accept_orders;
          console.log(this.state.accept);
        }
        this.setState({
          records: result.data,
        });
      })
      .catch((error) => console.log("error", error));
  };

  // view single data to edit
  editRecord = (id) => {
    console.log(id);
    axios
      .put(
        "http://localhost:8000/api/orders/executed",
        {
          order_id: id,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.state.update = true;
        alert(res.data);
        this.fetchAllRecords();
      });
  };

  // delete a record
  deleteRecord = (record) => {
    alert(" will be rejected");
    axios
      .put(
        `http://localhost:8000/api/orders/reject`,
        {
          order_reject: "REJECT",
          order_id: record.order_id,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("jwt"),
          },
        }
      )
      .then((result) => {
        alert("the order will be rejected!");
        console.log(result);
        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };

  redirection() {
    if (this.state.doredirect) {
      if (isauth()) {
        return <Redirect to="/owner/signup" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    return;
  }

  //start accepting orders
  startaccept = () => {
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
        // this.state.accept = true;
      })
      .catch((error) => console.log("error", error));
  };

  //stop accepting orders
  stoptaccept = () => {
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
        //  this.state.accept = false;
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    if (this.state.accept === 0) {
      return (
        <div>
          <div>
            <Navbar bg="dark" variant="dark" className="shatab">
              <Nav className="ml-auto">
                <Link to="/ownerhomepage">
                  <Button className="navbtn mr-5 " variant="light">
                    ADD MENU
                  </Button>
                </Link>
                <Link to="/order">
                  <Button className="navbtn mr-5" variant="light">
                    VIEW ORDER
                  </Button>
                </Link>
                <Link>
                  <Button
                    className="navbtn mr-5"
                    variant="danger"
                    onClick={() => {
                      this.startaccept();
                      this.fetchAllRecords();
                    }}
                  >
                    START ACCEPTING
                  </Button>
                </Link>

                <Button
                  onClick={() => {
                    signout();
                    this.setState({
                      doredirect: true,
                    });
                  }}
                  className="navbtn mr-5"
                  variant="light"
                >
                  LOGOUT
                </Button>
              </Nav>
            </Navbar>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

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
                  className="shatab"
                >
                  <thead>
                    <tr>
                      <th>Sl no.</th>
                      <th>User Name</th>
                      <th>product name</th>
                      <th>Total price</th>
                      <th>Order quantity</th>

                      <th colSpan="2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.records.map((record, key) => {
                      return (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{record.name}</td>
                          <td>{record.product_name}</td>
                          <td>{record.order_total_price}</td>
                          <td>{record.order_quantity}</td>
                          <td>
                            <Button
                              className="editbtn"
                              variant="warning"
                              onClick={() => this.editRecord(record.order_id)}
                            >
                              EXECUTE
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="editbtn"
                              variant="danger"
                              onClick={() => this.deleteRecord(record)}
                            >
                              REJECT
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>
            </div>
          </Container>
          <div>{this.redirection()}</div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Navbar bg="dark" variant="dark" className="shatab">
              <Nav className="ml-auto">
                <Link to="/ownerhomepage">
                  <Button className="navbtn mr-5 " variant="light">
                    ADD MENU
                  </Button>
                </Link>
                <Link to="/order">
                  <Button className="navbtn mr-5" variant="light">
                    VIEW ORDER
                  </Button>
                </Link>
                <Link>
                  <Button
                    className="navbtn mr-5"
                    variant="light"
                    onClick={() => {
                      this.stoptaccept();
                      this.fetchAllRecords();
                    }}
                  >
                    STOP ACCEPTING
                  </Button>
                </Link>

                <Button
                  onClick={() => {
                    signout();
                    this.setState({
                      doredirect: true,
                    });
                  }}
                  className="navbtn mr-5"
                  variant="light"
                >
                  LOGOUT
                </Button>
              </Nav>
            </Navbar>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

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
                  className="shatab"
                >
                  <thead>
                    <tr>
                      <th>Sl no.</th>
                      <th>User Name</th>
                      <th>product name</th>
                      <th>Total price</th>
                      <th>Order quantity</th>

                      <th colSpan="2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.records.map((record, key) => {
                      return (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{record.name}</td>
                          <td>{record.product_name}</td>
                          <td>{record.order_total_price}</td>
                          <td>{record.order_quantity}</td>
                          <td>
                            <Button
                              className="editbtn"
                              variant="warning"
                              onClick={() => this.editRecord(record.order_id)}
                            >
                              EXECUTE
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="editbtn"
                              variant="danger"
                              onClick={() => this.deleteRecord(record)}
                            >
                              REJECT
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>
            </div>
          </Container>
          <div>{this.redirection()}</div>
        </div>
      );
    }

    // return (
    // <div>{}</div>
    // <div>
    //   <div>
    //     <Navbar bg="dark" variant="dark" className="shatab">
    //       <Nav className="ml-auto">
    //         <Link to="/ownerhomepage">
    //           <Button className="navbtn mr-5 " variant="light">
    //             ADD MENU
    //           </Button>
    //         </Link>
    //         <Link to="/order">
    //           <Button className="navbtn mr-5" variant="light">
    //             VIEW ORDER
    //           </Button>
    //         </Link>
    //         <Link>
    //           <Button
    //             className="navbtn mr-5"
    //             variant="danger"
    //             onClick={() => {
    //               this.startaccept();
    //             }}
    //           >
    //             START ACCEPTING
    //           </Button>
    //         </Link>

    //         <Button
    //           onClick={() => {
    //             signout();
    //             this.setState({
    //               doredirect: true,
    //             });
    //           }}
    //           className="navbtn mr-5"
    //           variant="light"
    //         >
    //           LOGOUT
    //         </Button>
    //       </Nav>
    //     </Navbar>
    //   </div>
    //   <br></br>
    //   <br></br>
    //   <br></br>
    //   <br></br>

    //   <Container>
    //     <div className="tabledu">
    //       {/* All Records */}
    //       <Row>
    //         <Table
    //           striped
    //           bordered
    //           hover
    //           size="sm"
    //           variant="dark"
    //           className="shatab"
    //         >
    //           <thead>
    //             <tr>
    //               <th>Sl no.</th>
    //               <th>User Name</th>
    //               <th>product name</th>
    //               <th>Total price</th>
    //               <th>Order quantity</th>

    //               <th colSpan="2">Actions</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {this.state.records.map((record, key) => {
    //               return (
    //                 <tr>
    //                   <td>{key + 1}</td>
    //                   <td>{record.name}</td>
    //                   <td>{record.product_name}</td>
    //                   <td>{record.order_total_price}</td>
    //                   <td>{record.order_quantity}</td>
    //                   <td>
    //                     <Button
    //                       className="editbtn"
    //                       variant="warning"
    //                       onClick={() => this.editRecord(record.order_id)}
    //                     >
    //                       EXECUTE
    //                     </Button>
    //                   </td>
    //                   <td>
    //                     <Button
    //                       className="editbtn"
    //                       variant="danger"
    //                       onClick={() => this.deleteRecord(record)}
    //                     >
    //                       REJECT
    //                     </Button>
    //                   </td>
    //                 </tr>
    //               );
    //             })}
    //           </tbody>
    //         </Table>
    //       </Row>
    //     </div>
    //   </Container>
    //   <div>{this.redirection()}</div>
    // </div>
    // );
  }
}

export default Order;
