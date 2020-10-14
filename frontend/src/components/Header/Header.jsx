import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import "../../index.css";

class Header extends Component {
  render() {
    return (
      <>
        <Nav defaultActiveKey="/home" className="justify-content-end header">
          <h4>Unconscious Bias Simulation</h4>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/createProfile">Create Profile</Nav.Link>
          <Nav.Link href="/viewProfile">View Profile</Nav.Link>
        </Nav>
        <br />
        <br />
      </>
    );
  }
}

export default Header;
