import React, { Component } from "react";
import { Card, Button, Row, Col, Container, Image, Accordion } from "react-bootstrap";
import HeaderHR from "../Header/HeaderHR";
import ls from "local-storage";

class viewApplications extends Component {
  constructor() {
    super();
    this.state = {
      applications: [],
      index: 0,
      view: [],
      started: false,
      completed: false
    };
  }

  componentDidMount() {
    const token = ls.get("token");
    console.log(token)
    fetch("http://localhost:5000/api/v1/getAllPresence/",
      {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      .then((response) => response.json())
      .then((res) => {

        if (res["results"].error !== 'Applications not found') {
          this.setState({ applications: res["results"] });
        }
        else {
          this.modalShow(res["results"].error)
        }
      });
  }

  next = () => {
    if(this.state.index < (this.state.applications.length - 1)){
      const newIndex = this.state.index + 1;
      const newApplication = this.state.applications[newIndex];

      const newView = []
      newView[0] = newApplication

      this.setState({
        index: newIndex,
        view: newView
      });
      
    } else {
      const newView = []
      this.setState({
        view: newView,
        completed: true
      })
    }   
  }

  handleAccept = (e) => {
    this.next();
    console.log("Accepting application"); 
  };

  handleDecline = (e) => {
    this.next();
    console.log("Declining application");
  };

  start = (e) => {
    const newApplication = this.state.applications[this.state.index];

    const newView = []
    newView[0] = newApplication

    this.setState({
      view: newView,
      started: true
    });
  };

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
      <div>
        <HeaderHR />
        {this.state.started ? "": 
            (
              <Container>
                <h4 className="text-center">A set of applications will be displayed. You will choose to accept or decline them.</h4> <br />

                <h5 className="text-center">Press Start to begin processing applications</h5>
                <br />
                <div class="d-flex justify-content-center">
                <Button id="start" variant="success" size="lg" onClick={this.start} class="btn btn-default">Start</Button>
                </div>
              </Container>
             )}

        {this.state.completed ? 
            (
              <Container>
                <h3> Completed. No more applications to assess. </h3> 
              </Container>
            ) 
            : ""}
        
        {this.state.view.map((a) => (
            <Container className="containbody justify-content-center">
              <div>
                <h1> {a.first_name} {a.last_name} </h1>
                <h5> Position sought: {a.position}</h5>
                <h5> Email: {a.email} </h5>
              </div>
            

            <Row>
              <Col>
                <Card.Title className="card-heading card-title h5 font-weight-bold">
                  ABOUT ME
                </Card.Title>
                <Card bg="Light">
                  <Card.Body>
                    <Row>
                      <Col sm={8}>
                        <h5> Location: {a.city}, {a.state}, {a.zip} </h5>
                        <br />
                        <label id="aboutMe">{a.about_me}</label>
                      </Col>
                      <Col sm={3}>
                        <Image
                          className="image-style"
                          src={a.profile_image}
                          roundedCircle
                        ></Image>
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
                  {a.education.map((edu, i) => (
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                        <strong> {edu.school} </strong> <br /> 
                        {edu.degree} in {edu.major}
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={i + 1}>
                        <Card.Body>
                          <Card.Text>
                            {edu.eduStartDate} to {edu.eduEndDate} <br />
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
                  {a.experience.map((exp, i) => (
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                        <strong>
                          {exp.company} {exp.title}
                        </strong>
                        <br />
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
            <div class="d-flex justify-content-center">
              <Row>
                <Col>
                  <Button id="accept" variant="success" size="lg" onClick={this.handleAccept}>Accept</Button>
                </Col>
                <Col>
                  <Button id="decline" variant="danger" size="lg" onClick={this.handleDecline}>Decline</Button>
                </Col>
              </Row>
            </div>
            
            </Container>
        ))}
        <br />
        
      </div>

      </>
    );
  }
}
export default viewApplications;
