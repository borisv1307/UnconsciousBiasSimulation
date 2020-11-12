import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import ls from 'local-storage'

class HomeHR extends Component {
  render() {
    let name= ls.get('name');
    return(<div className="justify-content-end header">
        {/* <br /> */}
        <Navbar.Brand >Unconscious Bias Simulation</Navbar.Brand >
        <br/><br/>
        <div>
      <label id="name" className="name-header">{"Welcome HR  " +name}</label>
    </div>
    </div>
    
    )
  }
}

export default HomeHR;
