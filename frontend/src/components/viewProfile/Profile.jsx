import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile,
    };
  }

  render() {
    return (
      <>
        <Container className="containbody justify-content-center">
          <br />
          <br />
          <Row>
            <Col sm={6}>
              {" "}
              <Image
                style={{ width: "12rem" }}
                src={this.state.profile.profileImg}
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
                  <Card.Title>About Me</Card.Title>
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
                  <Card.Title>Education</Card.Title>
                  {this.state.profile.education.map((edu) => (
                    <Card.Text>
                      <label>
                        <h6>School</h6>
                      </label>{" "}
                      : <label id="school">{edu.school}</label>
                      <br />
                      <label>
                        <h6>Degree</h6>
                      </label>{" "}
                      : <label id="degree">{edu.degree}</label>
                      <br />
                      <label>
                        <h6>Major</h6>
                      </label>{" "}
                      : <label id="major">{edu.major}</label>
                      <br />
                      <label>
                        <h6>Start Date</h6>
                      </label>{" "}
                      : <label id="eduStartDate">{edu.eduStartDate}</label>
                      <br />
                      <label>
                        <h6>End Date</h6>
                      </label>{" "}
                      : <label id="eduEndDate">{edu.eduEndDate}</label>
                      <br />
                      <label>
                        <h6>GPA</h6>
                      </label>{" "}
                      :<label id="gpa">{edu.gpa}</label>
                    </Card.Text>
                  ))}
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
                  <Card.Title>Experience</Card.Title>
                  {this.state.profile.experience.map((exp) => (
                    <Card.Text>
                      <label>
                        <h6>Title</h6>
                      </label>{" "}
                      : <label id="title">{exp.title}</label>
                      <br />
                      <label>
                        <h6>Company</h6>
                      </label>{" "}
                      : <label id="company">{exp.company}</label>
                      <br />
                      <label>
                        <h6>Location</h6>
                      </label>{" "}
                      : <label id="location">{exp.location}</label>
                      <br />
                      <label>
                        <h6>Start Date</h6>
                      </label>{" "}
                      : <label id="expStartDate">{exp.expStartDate}</label>
                      <br />
                      <label>
                        <h6>End Date</h6>
                      </label>{" "}
                      : <label id="expEndDate">{exp.expEndDate}</label>
                      <br /> <br />
                    </Card.Text>
                  ))}
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
          <br />
          <br />
        </Container>
      </>
    );
  }
}

export default Profile;
