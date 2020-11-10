import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Figure from "react-bootstrap/Figure";

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
          <div>
            <h1> {this.state.profile.first_name} {this.state.profile.last_name}</h1>
            <h5> Position sought: {this.state.profile.position}</h5>
            <h5> Email: {this.state.profile.email} </h5>
          </div>
          
          <Row>
            <Col>
              <Card.Title className="card-heading card-title h5">
                ABOUT ME
              </Card.Title>
              <Card bg="Light">
                <Card.Body>
                  <Row>
                    <Col sm={8}>
                      <h5> Location: {this.state.profile.city}, {this.state.profile.state}, {this.state.profile.zip}</h5>
                      <br/>
                      <label id="aboutMe">{this.state.profile.aboutMe}</label>
                    </Col>
                    <Col sm={3}>
                      <Figure>
                        <Figure.Image
                          width={100}
                          height={100}
                          className="image-style"
                          src={this.state.profile.profileImg}
                          roundedCircle
                        />
                      </Figure>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Accordion defaultActiveKey="0">
                <Card.Title className="card-heading">EDUCATION</Card.Title>
                {this.state.profile.education.map((edu, i) => (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                      <strong> {edu.school} </strong>  <br /> {edu.degree} in {edu.major}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body>
                        <Card.Text>
                          {edu.eduStartDate} to {edu.eduEndDate} <br/>
                          GPA: {edu.gpa}
                        </Card.Text>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </Col>
            
            <Col>

              <Accordion defaultActiveKey="0">
                <Card.Title className="card-heading">EXPERIENCE</Card.Title>
                {this.state.profile.experience.map((exp, i) => (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                      <strong> {exp.company} {exp.title} </strong> <br />
                      {exp.duration}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body>
                        <Card.Text>
                          {exp.expStartDate} to {exp.expEndDate} <br />
                          Location: {exp.location}
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
