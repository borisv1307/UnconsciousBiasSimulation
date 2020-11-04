import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile,
    };
  }
  yearsDiff(d1, d2) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let yearsDiff = date2.getFullYear() - date1.getFullYear();
    return yearsDiff;
  }
  monthsDiff(d1, d2) {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let yeardiff = this.yearsDiff(d1, d2);
    let months = yeardiff * 12 + date2.getMonth() - date1.getMonth();
    return months;
  }

  componentDidMount() {
    var profile = this.state.profile;
    var exp = profile.experience;
    exp.forEach((e, i) => {
      var months = this.monthsDiff(
        e.expStartDate,
        e.expEndDate !== "" ? e.expEndDate : new Date().toString()
      );
      var yeardiff = parseInt(months / 12);
      var monthDiff = months % 12;
      // console.log(yeardiff + " year " + monthDiff + " months");
      exp[i]["duration"] =
        yeardiff > 1
          ? yeardiff + " years "
          : yeardiff === 0
          ? ""
          : yeardiff + " year ";
      exp[i]["duration"] +=
        monthDiff > 1 ? monthDiff + " months" : monthDiff + " month";
    });

    profile.experience = exp;
    this.setState({ profile });
  }

  render() {
    return (
      <>
        <style type="text/css">
          {`
    .card-title {
      margin-bottom: 0rem;
    }
    .h5 {
      margin-bottom: 0rem;
    }
    `}
        </style>
        <Container className="containbody justify-content-center">
          <br />
          <br />
          <Row>
            <Col sm={6}>
              {" "}
              <Image
                className="image-style"
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
              : <label id="firstname">{this.state.profile.first_name}</label>
              <br />
              <br />
              <label>
                <h5>Last Name</h5>{" "}
              </label>{" "}
              : <label id="lastname">{this.state.profile.last_name}</label>
              <br />
              <br />
              <label>
                <h5>Position Sought</h5>
              </label>{" "}
              : <label id="position">{this.state.profile.position}</label>
              <br />
              <br />
              <label>
                <h5>State</h5>
              </label>{" "}
              : <label id="state">{this.state.profile.state}</label>
              <br />
              <br />
              <label>
                <h5>Zip</h5>
              </label>{" "}
              : <label id="zip">{this.state.profile.zip}</label>
              <br />
              <br />
              <label>
                <h5>City</h5>
              </label>{" "}
              : <label id="city">{this.state.profile.city}</label>
              <br />
              <br />
              <label>
                <h5>Email</h5>
              </label>{" "}
              : <label id="user_email">{this.state.profile.email}</label>
              <br />
              <br />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <Card.Title className="card-heading card-title h5">
                ABOUT ME
              </Card.Title>
              <Card bg="Light">
                <Card.Body>
                  <label id="aboutMe">{this.state.profile.aboutMe}</label>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <Accordion defaultActiveKey="0">
                <Card.Title className="card-heading">EDUCATION</Card.Title>
                {this.state.profile.education.map((edu, i) => (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                      <label>
                        <h6>School</h6>
                      </label>{" "}
                      :{" "}
                      <label id="school">
                        {edu.school} &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <label>
                        <h6>Degree</h6>
                      </label>{" "}
                      : <label id="degree">{edu.degree}</label>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body>
                        <Card.Text>
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
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <Accordion defaultActiveKey="0">
                <Card.Title className="card-heading">EXPERIENCE</Card.Title>
                {this.state.profile.experience.map((exp, i) => (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                      <label>
                        <h6>Title</h6>
                      </label>{" "}
                      :{" "}
                      <label id="title">
                        {exp.title}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </label>
                      <label>
                        {" "}
                        <h6>Duration</h6>
                      </label>{" "}
                      : <label id="duration"> {exp.duration}</label>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body>
                        <Card.Text>
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
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
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
