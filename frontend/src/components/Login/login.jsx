import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import ls from 'local-storage'
import Navbar from "react-bootstrap/Navbar";

class Login extends Component {
  
  state = {
    email: "",
    password: "",
  };
  
  updateField = (stateKey) => (e) => {
    this.setState({ [stateKey]: e.target.value });
  };
  handleLogin = async (e) => {
    //e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    fetch("http://localhost:5000/api/v1/login/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.user_id) {
          ls.set("userid", res.user_id);
          ls.set("name", res.first_name);
          // this.user_details.registration_type=res.registration_type;
          if(res.registration_type==='jobSeeker'){
          window.location.href = `./home/?id=${+res.user_id}&registration_type=${res.registration_type}&Name=${res.first_name}`;
        }
        else{
          window.location.href = `./homehr/?id=${+res.user_id}&registration_type=${res.registration_type}&Name=${res.first_name}`;
        }
        } else {
          alert(res.error);
        }
      });
  };
  render() {
    return (

      <div className="justify-content-end header">
        {/* <br /> */}
        <Navbar.Brand >Unconscious Bias Simulation</Navbar.Brand >
        <br />
        <br />
        
        <nav class="navbar navbar-dark">
            <div className="row col-12 d-flex justify-content-left text-black">
              <span className="login-heading">Login</span>
            </div>
          </nav>
        
        <Container className="containbody justify-content-center">
          <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form id="Form">
              <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={this.updateField("email")}
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={this.updateField("password")}
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-check"></div>
              <Button
                id="submit"
                className="buttonnprimary"
                onClick={this.handleLogin}
              >
                Submit
              </Button>
            </form>
            <div className="registerMessage">
              <span>Dont have an account? </span>
              <Button
                id="register"
                variant="link"
                onClick={(_event) => (window.location.href = "./register")}
              >
                Register
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
export default Login;
