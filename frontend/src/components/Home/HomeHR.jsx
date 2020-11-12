import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import ls from 'local-storage';
import { Container } from "react-bootstrap";

class HomeHR extends Component {
  render() {
    let name= ls.get('name');
    return ( 
      <div>
        <div className="justify-content-end header">
          <Navbar.Brand >Unconscious Bias Simulation</Navbar.Brand >
        </div>
        <Container className="containbody justify-content-center">
          <br/><h1 className="text-center">{"Welcome " + name}</h1>
          <h4 className="text-center">HR Professional</h4> <br />

          <h5 className="text-center">View real applications and see where your biases lie statistically</h5>
          <br />
        </Container>
        
      </div>
      
    ); 
  }
}

export default HomeHR;
