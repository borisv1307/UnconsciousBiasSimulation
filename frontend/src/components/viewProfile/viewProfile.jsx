import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../Header/Header";
import "../../index.css";
import Button from "react-bootstrap/Button";

class ViewProfile extends Component {
  state = {
    profile: {},
  };

  render() {
    return (
      <>
        <Header />

        <Container className="containbody justify-content-center">
          <br />
          <br />
          <Row>
            <Col sm={6}>
              {" "}
              <Image
                style={{ width: "12rem" }}
                src="../images/Disk_pack1.png"
                roundedCircle
              />
            </Col>
            <br />
            <Col>
              <br />
              <label>
                <h5>First Name</h5>{" "}
              </label>
              : <label id="firstname">{this.state.profile.firstName}</label>
              <br />
              <br />
              <label>
                <h5>Last Name</h5>{" "}
              </label>{" "}
              : <label id="lastname">{this.state.profile.lastName}</label>
              <br />
              <br />
              <label>
                <h5>Position</h5>
              </label>{" "}
              : <label id="position">{this.state.profile.position}</label>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Row>
            <Col>
              <Card bg="Light">
                <Card.Body>
                  <h5>About Me</h5>
                  <br />{" "}
                  <label id="aboutMe">{this.state.profile.aboutMe}</label>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <h5>Education</h5>
                  <br />
                  <label>
                    <h6>School</h6>
                  </label>{" "}
                  : <label id="school">{this.state.profile.school}</label>
                  <br />
                  <label>
                    <h6>Degree</h6>
                  </label>{" "}
                  : <label id="degree">{this.state.profile.degree}</label>
                  <br />
                  <label>
                    <h6>Major</h6>
                  </label>{" "}
                  : <label id="major">{this.state.profile.major}</label>
                  <br />
                  <label>
                    <h6>Start Date</h6>
                  </label>{" "}
                  :{" "}
                  <label id="eduStartDate">
                    {this.state.profile.eduStartDate}
                  </label>
                  <br />
                  <label>
                    <h6>End Date</h6>
                  </label>{" "}
                  :{" "}
                  <label id="eduEndDate">{this.state.profile.eduEndDate}</label>
                  <br />
                  <label>
                    <h6>GPA</h6>
                  </label>{" "}
                  :<label id="gpa">{this.state.profile.gpa}</label>
                  <br />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <h5>Experience</h5>
                  <br />
                  <label>
                    <h6>Title</h6>
                  </label>{" "}
                  : <label id="title">{this.state.profile.title}</label>
                  <br />
                  <label>
                    <h6>Company</h6>
                  </label>{" "}
                  : <label id="company">{this.state.profile.company}</label>
                  <br />
                  <label>
                    <h6>Location</h6>
                  </label>{" "}
                  : <label id="location">{this.state.profile.location}</label>
                  <br />
                  <label>
                    <h6>Start Date</h6>
                  </label>{" "}
                  :{" "}
                  <label id="expStartDate">
                    {this.state.profile.expStartDate}
                  </label>
                  <br />
                  <label>
                    <h6>End Date</h6>
                  </label>{" "}
                  :{" "}
                  <label id="expEndDate">{this.state.profile.expEndDate}</label>
                  <br /> <br />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-center">
            <Col>
              <Button id="Send" variant="success">
                Send
              </Button>{" "}
              <Button id="Edit" variant="warning">
                Edit
              </Button>{" "}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ViewProfile;
