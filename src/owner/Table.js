import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
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
import "../styles/table.css";
import { isauth, signout } from "../core/authcheck";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      availability: "",
      records: [
        {
          product_name: "dose",
          product_description: "chennagide",
          product_price: 50,
          product_available: " yes",
        },
        {
          product_name: "dose",
          product_description: "chennagide",
          product_price: 50,
          product_available: " yes",
        },
        {
          product_name: "dose",
          product_description: "chennagide",
          product_price: 50,
          product_available: " yes",
        },
        {
          product_name: "dose",
          product_description: "chennagide",
          product_price: 50,
          product_available: " yes",
        },
        {
          product_name: "dose",
          product_description: "chennagide",
          product_price: 50,
          product_available: " yes",
        },
        {
          product_name: "dose",
          product_description: "chennagide",
          product_price: 50,
          product_available: " yes",
        },
      ],
      doredirect: false,
      id: "",
      update: false,
      accept: 1,
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  componentWillMount() {
    this.fetchAllRecords();
  }

  // add a record
  addRecord = () => {
    var body = {
      productName: this.state.name,
      productDescription: this.state.description,
      productPrice: this.state.price,
      productAvailable: this.state.availability,
    };
    axios
      .post("http://localhost:8000/api/menu", body, {
        headers: {
          "x-access-token": localStorage.getItem("jwt"),
        },
      })

      .then((result) => {
        console.log(result);
        this.setState({
          name: "",
          description: "",
          price: "",
          availability: "",
        });
        this.fetchAllRecords();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetch All Records
  fetchAllRecords = () => {
    axios
      .get("http://localhost:8000/api/menu", {
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
  editRecord = (record) => {
    this.setState({
      name: record.product_name,
      description: record.product_description,
      price: record.product_price,
      availability: record.product_available,
      id: record.product_id,
      update: true,
    });
    console.log(this.state.update);
  };

  // update record
  updateRecord = () => {
    var body = {
      productName: this.state.name,
      productDescription: this.state.description,
      productPrice: this.state.price,
      productAvailable: this.state.availability,
    };
    console.log(this.state.id);
    axios
      .put(`http://localhost:8000/api/menu/${this.state.id}`, body, {
        headers: {
          "x-access-token": localStorage.getItem("jwt"),
        },
      })

      .then((result) => {
        console.log(result);

        this.setState({
          name: "",
          description: "",
          price: "",
          availability: "",
          update: false,
          id: "",
          accept: false,
        });
        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };

  // delete a record
  deleteRecord = (record) => {
    alert(" will be deleted");
    axios
      .delete(`http://localhost:8000/api/menu/${record.product_id}`, {
        headers: {
          "x-access-token": localStorage.getItem("jwt"),
        },
      })
      .then((result) => {
        console.log(result);
        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };

  redirection() {
    if (this.state.doredirect) {
      if (isauth) {
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
        // this.state.accept = false;
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
                  <Button className="navbtn mr-5" variant="light">
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
                  className="shatab"
                  striped
                  bordered
                  hover
                  size="sm"
                  variant="dark"
                >
                  <thead>
                    <tr>
                      <th>Sl no.</th>
                      <th>Product Name</th>
                      <th>Producr Description</th>
                      <th>Product Price</th>
                      <th>Producr Availability</th>
                      <th colSpan="2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.records.map((record, key) => {
                      return (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{record.product_name}</td>
                          <td>{record.product_description}</td>
                          <td>{record.product_price}</td>
                          <td>{record.product_available}</td>
                          <td>
                            <Button
                              className="editbtn"
                              variant="warning"
                              onClick={() => this.editRecord(record)}
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="editbtn"
                              variant="danger"
                              onClick={() => this.deleteRecord(record)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>

              {/* Insert Form */}
              <Row>
                <Form>
                  <FormGroup>
                    <FormLabel>Enter the Product name</FormLabel>
                    <FormControl
                      type="text"
                      name="name"
                      placeholder="Enter the name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    ></FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Enter the description</FormLabel>
                    <FormControl
                      type="text"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      placeholder="Enter the Description"
                    ></FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Enter the product price</FormLabel>
                    <FormControl
                      type="number"
                      name="price"
                      value={this.state.price}
                      onChange={this.handleChange}
                      placeholder="Enter the price"
                    ></FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Enter the product Availability</FormLabel>
                    <FormControl
                      type="text"
                      name="availability"
                      value={this.state.location}
                      onChange={this.handleChange}
                      placeholder="Enter the Availability"
                    ></FormControl>
                  </FormGroup>

                  {this.state.update === true ? (
                    <Button onClick={this.updateRecord}>update</Button>
                  ) : (
                    <Button onClick={this.addRecord}>Save</Button>
                  )}
                </Form>
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
                  <Button className="navbtn mr-5" variant="light">
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
                  className="shatab"
                  striped
                  bordered
                  hover
                  size="sm"
                  variant="dark"
                >
                  <thead>
                    <tr>
                      <th>Sl no.</th>
                      <th>Product Name</th>
                      <th>Producr Description</th>
                      <th>Product Price</th>
                      <th>Producr Availability</th>
                      <th colSpan="2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.records.map((record, key) => {
                      return (
                        <tr>
                          <td>{key + 1}</td>
                          <td>{record.product_name}</td>
                          <td>{record.product_description}</td>
                          <td>{record.product_price}</td>
                          <td>{record.product_available}</td>
                          <td>
                            <Button
                              className="editbtn"
                              variant="warning"
                              onClick={() => this.editRecord(record)}
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="editbtn"
                              variant="danger"
                              onClick={() => this.deleteRecord(record)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>

              {/* Insert Form */}
              <Row>
                <Form>
                  <FormGroup>
                    <FormLabel>Enter the Product name</FormLabel>
                    <FormControl
                      type="text"
                      name="name"
                      placeholder="Enter the name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    ></FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Enter the description</FormLabel>
                    <FormControl
                      type="text"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      placeholder="Enter the Description"
                    ></FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Enter the product price</FormLabel>
                    <FormControl
                      type="number"
                      name="price"
                      value={this.state.price}
                      onChange={this.handleChange}
                      placeholder="Enter the price"
                    ></FormControl>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Enter the product Availability</FormLabel>
                    <FormControl
                      type="text"
                      name="availability"
                      value={this.state.location}
                      onChange={this.handleChange}
                      placeholder="Enter the Availability"
                    ></FormControl>
                  </FormGroup>

                  {this.state.update === true ? (
                    <Button onClick={this.updateRecord}>update</Button>
                  ) : (
                    <Button onClick={this.addRecord}>Save</Button>
                  )}
                </Form>
              </Row>
            </div>
          </Container>
          <div>{this.redirection()}</div>
        </div>
      );
    }
  }
}

export default App;
