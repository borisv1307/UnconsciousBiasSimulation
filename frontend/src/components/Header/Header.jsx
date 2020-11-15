import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ls from "local-storage";
import Button from "react-bootstrap/Button";

class Header extends Component {
  handleSubmit = (e) => {
    fetch("http://localhost:5000/api/v1/logout/")
      .then((res) => res.json())
      .then((res) => res);

    this.setState({
      _event: (window.location.href = "/login"),
    });
  };

  render() {
    let user = ls.get("userid");
    let name = ls.get("name");
    return (
      <>
        <style type="text/css">
          {`
      .nav-style {
        font-size: x-large;
      }
      .nav-style-title {
        font-size: xx-large;
      }
          `}
        </style>
        <Navbar className=" header font-weight-bold">
          <Navbar.Brand className="nav-style-title " href="/home">
            {"Unconscious Bias Simulation: " + name}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end nav-style">
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            <Nav.Link href={"/createProfile?userId=" + user}>
              Create Presence
            </Nav.Link>
            <Nav.Link href={"/viewProfile?userId=" + user}>
              View Presence
            </Nav.Link>
            <Nav.Link>
              <Button id="logout" onClick={this.handleSubmit} variant="primary">
                Logout
              </Button>{" "}
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <br />
      </>
    );
  }
}

export default Header;
