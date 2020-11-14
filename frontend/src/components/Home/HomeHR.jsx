import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import ls from "local-storage";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

class HomeHR extends Component {
  render() {
    let name = ls.get("name");
    return (
      <>
        <style type="text/css">
          {`

    .nav-style-title {
      font-size: xx-large;
    }
    .nav-style {
      font-size: x-large;
    }
        `}
        </style>
        <div>
          <div className="justify-content-end header">
            <Navbar className=" header font-weight-bold">
              <Navbar.Brand className="nav-style-title font-weight-bold ">
                Unconscious Bias Simulation
              </Navbar.Brand>
              <Navbar.Collapse className="justify-content-end">
                {/* <Nav.Link href="/home">Home</Nav.Link> */}
                <Nav.Link
                  className="justify-content-end nav-style"
                  href="/ViewApplications"
                >
                  View Applications
                </Nav.Link>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <br />
          <br />
          <Container className="containbody justify-content-center">
            <br />
            <h1 className="text-center">{"Welcome " + name}</h1>
            <h4 className="text-center">HR Professional</h4> <br />
            <h5 className="text-center">
              View real applications and see where your biases lie statistically
            </h5>
            <br />
          </Container>
        </div>
      </>
    );
  }
}

export default HomeHR;
