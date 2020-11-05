import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Header extends Component {
  render() {
    return (
      <>
        <Navbar className="header">
          <Navbar.Brand href="/home">Unconscious Bias Simulation</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            <Nav.Link href="/createProfile">Create Profile</Nav.Link>
            <Nav.Link href="/viewProfile">View Profile</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <br />
      </>
    );
  }
}

export default Header;
