import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

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
    const redirectToHome = () => {
      window.location.href = "./home";
    };

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
          redirectToHome();
        } else {
          alert(res.error);
        }
      });

    this.setState({
      email: "",
      password: "",
    });
  };
  render() {
    return (
      <div className="justify-content-end header">
        {/* <br /> */}
        <h4>Unconscious Bias Simulation</h4>
        <br />
        <br />
        <Container className="containbody justify-content-center">
          <nav class="navbar navbar-dark">
            <div className="row col-12 d-flex justify-content-left text-black">
              <span className="h3">Login</span>
            </div>
          </nav>
          <br />
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
                onClick={(event) => (window.location.href = "./register")}
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
