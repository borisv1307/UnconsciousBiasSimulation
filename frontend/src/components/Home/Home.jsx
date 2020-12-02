import React, { Component } from "react";
import { Container } from "react-bootstrap";

import Header from "../Header/Header";
import ls from 'local-storage'

class Home extends Component {
  componentDidMount() {
    const token = ls.get("token");
    if(token===null || token===""){
      window.location.href = "/login"
    }
  }
  render() { 
    let name= ls.get('name');
    return ( 
      <div>
        <Header />
        <Container className="containbody justify-content-center">
          <br/><h1 className="text-center">{"Welcome " + name}</h1>
          <h4 className="text-center">Job Seeker</h4> <br />

          <h5 className="text-center">Create online job applications and see how they are statistically received by HR Professionals</h5>
          <br />
        </Container>
        
      </div>
      
    ); 
  }
}

export default Home;
