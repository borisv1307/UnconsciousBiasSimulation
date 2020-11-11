import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "../Login/login";
import ls from 'local-storage'

class Header extends Component {

  render() {
    let user= ls.get('userid');
    let name= ls.get('name');
    return (
      
      <>
        
        <Navbar className="header">
          <Navbar.Brand href="/home">Unconscious Bias Simulation</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            <Nav.Link href={'/createProfile?userId=' + user}>Create Profile</Nav.Link>
            <Nav.Link href={'/viewProfile?userId=' + user}>View Profile</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <div>
        <label id="name" className="name-header">{"Welcome " +name}</label>
        </div>
        <br />
        <br />
      </>
    );
  }
}

export default Header;
