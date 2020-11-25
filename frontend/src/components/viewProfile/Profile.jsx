import React, { Component } from "react";
import { Image, Container, Button, Col, Row, Form, Alert, Modal, Card, Accordion, ModalTitle } from "react-bootstrap";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile,
      email: "",
      profileImg: "",
      first_name: "",
      last_name: "",
      position: "",
      aboutMe: "",
      school: "",
      degree: "",
      major: "",
      eduStartDate: "",
      eduEndDate: "",
      gpa: "",
      title: "",
      company: "",
      location: "",
      expStartDate: "",
      expEndDate: "",
      education: [],
      experience: [],
      modal_message: "",
      modal_show: false
    };
  }

  updateField = (stateKey) => (e) => {
    this.setState({ [stateKey]: e.target.value });
  };

  modalHide = () => {
    this.setState({ modal_show: false });
  };

  modalShow = () => {
    this.setState({ modal_show: true});
  };


  toggleEditForm = (input) => (e) => {
    this.setState({
      editSchool: "",
      editDegree: "",
      editMajor: "",
      editEduStartDate: "",
      editEduEndDate: "",
      editGpa: "",

      editTitle: "",
      editCompany: "",
      editLocation: "",
      editExpStartDate: "",
      editExpEndDate: "",
    });
    this.setState({ editState: input });
  };


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

  handleSubmit = (e) => {
    var profile = this.state.profile;


    console.log(profile)
    fetch("http://localhost:5000/api/v1/addPresence/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((res) => res);

    this.setState({
      alertMessage: "Successfully Sent",
      allSuccessState: true,
      allErrorState: false,
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

        <div className="text-center">
          {this.state.allErrorState ? (
            <Alert variant="danger">{this.state.alertMessage}</Alert>
          ) : (
              " "
            )}
          {this.state.allSuccessState ? (
            <Alert variant="success">{this.state.alertMessage}</Alert>
          ) : (
              " "
            )}
        </div>
        <Container className="containbody justify-content-center">
          <div>
            <h1>
              {" "}
              {this.state.profile.first_name} {this.state.profile.last_name}
            </h1>
            <h5> Position sought: {this.state.profile.position}</h5>
            <h5> Email: {this.state.profile.email} </h5>
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
                      <h5>
                        {" "}
                        Location: {this.state.profile.city},{" "}
                        {this.state.profile.state}, {this.state.profile.zip}
                      </h5>
                      <br />
                      <label id="aboutMe">{this.state.profile.aboutMe}</label>
                    </Col>
                    <Col sm={3}>
                      <Image
                        className="image-style"
                        src={this.state.profile.profileImg}
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
                {this.state.profile.education.map((edu, i) => (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                      <strong> {edu.school} </strong> <br /> {edu.degree} in{" "}
                      {edu.major}
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
                {this.state.profile.experience.map((exp, i) => (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                      <strong>
                        {" "}
                        {exp.company} {exp.title}{" "}
                      </strong>{" "}
                      <br />
                      <label id="duration">{exp.duration}</label>
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
          <br />
          <Row className="justify-content-center">
            <Col sm={2}>
              <Button id="Send" className="submit" onClick={this.handleSubmit}>
                Send
              </Button>
              &nbsp;&nbsp; <Button id="Edit" onClick={this.modalShow}>Edit</Button>{" "}
            </Col>
          </Row>
          <br />
        </Container>
  
        <Modal show={this.state.modal_show} onHide={this.modalHide} backdrop="static" keyboard={false} size="lg">
            <Modal.Header>
              <h5> Pressence Edit Form </h5>
            </Modal.Header>
            <Modal.Body>
            <Row>
            <Col>
              <Container>
                <Form>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={this.state.profile.email}
                      onChange={this.updateField("email")}
                      id="email"
                      name="email"
                      placeholder="test@test.com"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.profile.first_name}
                      onChange={this.updateField("first_name")}
                      id="first_name"
                      name="first_name"
                      placeholder="John"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.profile.last_name}
                      onChange={this.updateField("last_name")}
                      id="last_name"
                      name="last_name"
                      placeholder="Doe"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.profile.position}
                      onChange={this.updateField("position")}
                      id="position"
                      name="position"
                      placeholder="Intern"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>About Me</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.profile.aboutMe}
                      onChange={this.updateField("aboutMe")}
                      id="aboutMe"
                      name="aboutMe"
                      placeholder="Hardworking"
                    />
                  </Form.Group>
                </Form>
              </Container>
            </Col>

            <Col>
              <Container className="text-center">
                <div className="page">
                  <div className="container">
                    <h3 className="heading">Change Image</h3> <br />
                    <img
                      src={this.state.profile.profileImg}
                      width="200"
                      alt=""
                      id="profileImage"
                      className="img"
                    />{" "}
                    <br /> <br />
                    <input
                      type="file"
                      accept="image/*"
                      name="image-upload"
                      id="UploadImageInput"
                      onChange={this.imageHandler}
                    />
                  </div>
                </div>
              </Container>
            </Col>
          </Row>

          <Container>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Card.Header}
                    variant="link"
                    eventKey="0"
                  >
                    <h4>Education</h4>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Row>
                    <Col>
                      <Container>
                        <br />
                        <Form>
                          <Form.Group>
                            <Form.Label>School</Form.Label>
                            <Form.Control
                              type="text"
                              value={this.state.profile.school}
                              onChange={this.updateField("school")}
                              id="school"
                              name="school"
                              placeholder="X University"
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Degree</Form.Label>
                            <Form.Control
                              type="text"
                              value={this.state.profile.degree}
                              onChange={this.updateField("degree")}
                              id="degree"
                              name="degree"
                              placeholder="Bachelor's"
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Major</Form.Label>
                            <Form.Control
                              type="text"
                              value={this.state.profile.major}
                              onChange={this.updateField("major")}
                              id="major"
                              name="major"
                              placeholder="Software Engineering"
                            />
                          </Form.Group>

                          <Form.Row>
                            <Form.Group as={Col}>
                              <Form.Label>Start Date</Form.Label>
                              <Form.Control
                                type="month"
                                value={this.state.profile.eduStartDate}
                                onChange={this.updateField("eduStartDate")}
                                id="eduStartDate"
                                name="eduStartDate"
                              />
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>End Date</Form.Label>
                              <Form.Control
                                type="month"
                                value={this.state.profile.eduEndDate}
                                onChange={this.updateField("eduEndDate")}
                                id="eduEndDate"
                                name="eduEndDate"
                              />
                            </Form.Group>
                          </Form.Row>

                          <Form.Group>
                            <Form.Label>GPA (Optional)</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.01"
                              value={this.state.profile.gpa}
                              onChange={this.updateField("gpa")}
                              id="gpa"
                              name="gpa"
                              placeholder="4"
                            />
                          </Form.Group>
                          <div className="text-center">
                            {this.state.eduErrorState ? (
                              <Alert variant="danger">
                                {this.state.alertMessage}
                              </Alert>
                            ) : (
                              " "
                            )}
                            {this.state.eduSuccessState ? (
                              <Alert variant="success">
                                {this.state.alertMessage}
                              </Alert>
                            ) : (
                              " "
                            )}
                            <Button
                              id="addEducationButton"
                              onClick={this.addEducation}
                            >
                              Add Education
                            </Button>
                          </div>
                        </Form>
                        <br />
                      </Container>
                    </Col>

                    <Col>
                      <br />
                      <h4>Education Added</h4>
                      <Container>
                        <Accordion>
                          {this.state.profile.education.map((edu, index) => {
                            return (
                              <Card>
                                <Card.Header>
                                  <Accordion.Toggle
                                    as={Card.Header}
                                    variant="link"
                                    eventKey={"edu" + index + 1}
                                    onClick={this.toggleEditForm(false)}
                                  >
                                    {edu.school}: {edu.degree} in {edu.major}
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse
                                  eventKey={"edu" + index + 1}
                                >
                                  <Card.Body>
                                    {edu.eduStartDate} to {edu.eduEndDate}{" "}
                                    <br />
                                    {edu.gpa ? (
                                      <div>GPA: {edu.gpa}</div>
                                    ) : (
                                      ""
                                    )}{" "}
                                    <br />
                                    {!this.state.editState ? (
                                      <Button
                                        id="toggleEditEducationButton"
                                        onClick={this.toggleEditForm(true)}
                                      >
                                        Edit
                                      </Button>
                                    ) : (
                                      ""
                                    )}
                                    {this.state.editState ? (
                                      <div>
                                        <Form>
                                          <Form.Group>
                                            <Form.Label>School</Form.Label>
                                            <Form.Control
                                              type="text"
                                              onChange={this.updateField(
                                                "editSchool"
                                              )}
                                              id={this.setElementID("editSchool", index)}
                                              name="editSchool"
                                              defaultValue={edu.school}
                                            />
                                          </Form.Group>

                                          <Form.Group>
                                            <Form.Label>Degree</Form.Label>
                                            <Form.Control
                                              type="text"
                                              onChange={this.updateField(
                                                "editDegree"
                                              )}
                                              id={this.setElementID("editDegree", index)}
                                              name="editDegree"
                                              defaultValue={edu.degree}
                                            />
                                          </Form.Group>

                                          <Form.Group>
                                            <Form.Label>Major</Form.Label>
                                            <Form.Control
                                              type="text"
                                              onChange={this.updateField(
                                                "editMajor"
                                              )}
                                              id={this.setElementID("editMajor", index)}
                                              name="editMajor"
                                              defaultValue={edu.major}
                                            />
                                          </Form.Group>

                                          <Form.Row>
                                            <Form.Group as={Col}>
                                              <Form.Label>
                                                Start Date
                                              </Form.Label>
                                              <Form.Control
                                                type="month"
                                                onChange={this.updateField(
                                                  "editEduStartDate"
                                                )}
                                                id={this.setElementID("editEduStartDate", index)}
                                                name="editEduStartDate"
                                                defaultValue={edu.eduStartDate}
                                              />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                              <Form.Label>End Date</Form.Label>
                                              <Form.Control
                                                type="month"
                                                onChange={this.updateField(
                                                  "editEduEndDate"
                                                )}
                                                id={this.setElementID("editEduEndDate", index)}
                                                name="editEduEndDate"
                                                defaultValue={edu.eduEndDate}
                                              />
                                            </Form.Group>
                                          </Form.Row>

                                          <Form.Group>
                                            <Form.Label>GPA (Optional)</Form.Label>
                                            <Form.Control
                                              type="number"
                                              step="0.01"
                                              onChange={this.updateField(
                                                "editGpa"
                                              )}
                                              id={this.setElementID("editGpa", index)}
                                              name="editGpa"
                                              value={this.getOptionalValue(this.state.editGpa, edu.gpa)}
                                            />
                                          </Form.Group>
                                          <div className="text-center"></div>
                                        </Form>
                                        <Row>
                                          <Col>
                                            {" "}
                                            <Button
                                              id="editEducationButton"
                                              onClick={this.editEducation(
                                                index
                                              )}
                                            >
                                              {" "}
                                              Save{" "}
                                            </Button>{" "}
                                          </Col>
                                          <Col>
                                            {" "}
                                            <Button
                                              id="cancelEditEducationButton"
                                              onClick={this.toggleEditForm(
                                                false
                                              )}
                                            >
                                              Cancel
                                            </Button>{" "}
                                          </Col>
                                        </Row>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            );
                          })}
                        </Accordion>
                      </Container>
                      <br />
                    </Col>
                  </Row>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Card.Header}
                    variant="link"
                    eventKey="1"
                  >
                    <h4>Experience</h4>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Row>
                    <Col>
                      <Container>
                        <br />
                        <Form>
                          <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              type="text"
                              value={this.state.title}
                              onChange={this.updateField("title")}
                              id="title"
                              name="title"
                              placeholder="Intern"
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                              type="text"
                              value={this.state.company}
                              onChange={this.updateField("company")}
                              id="company"
                              name="company"
                              placeholder="Y Company"
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                              type="text"
                              value={this.state.location}
                              onChange={this.updateField("location")}
                              id="location"
                              name="location"
                              placeholder="Philadelphia"
                            />
                          </Form.Group>

                          <Form.Row>
                            <Form.Group as={Col}>
                              <Form.Label>Start Date</Form.Label>
                              <Form.Control
                                type="month"
                                value={this.state.expStartDate}
                                onChange={this.updateField("expStartDate")}
                                id="expStartDate"
                                name="expStartDate"
                              />
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>End Date</Form.Label>
                              <Form.Control
                                type="month"
                                value={this.state.expEndDate}
                                onChange={this.updateField("expEndDate")}
                                id="expEndDate"
                                name="expEndDate"
                              />
                            </Form.Group>
                          </Form.Row>
                          <div className="text-center">
                            {this.state.expErrorState ? (
                              <Alert variant="danger">
                                {this.state.alertMessage}
                              </Alert>
                            ) : (
                              " "
                            )}
                            {this.state.expSuccessState ? (
                              <Alert variant="success">
                                {this.state.alertMessage}
                              </Alert>
                            ) : (
                              " "
                            )}
                            <Button
                              id="addExperienceButton"
                              onClick={this.addExperience}
                            >
                              Add Experience
                            </Button>
                          </div>
                        </Form>
                        <br />
                      </Container>
                    </Col>

                    <Col>
                      <br />
                      <h4>Experience Added</h4>
                      <Container>
                        <Accordion>
                          {this.state.profile.experience.map((exp, index) => {
                            return (
                              <Card>
                                <Card.Header>
                                  <Accordion.Toggle
                                    as={Card.Header}
                                    variant="link"
                                    eventKey={"exp" + index + 1}
                                    onClick={this.toggleEditForm(false)}
                                  >
                                    {exp.company} {exp.title}
                                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse
                                  eventKey={"exp" + index + 1}
                                >
                                  <Card.Body>
                                    {exp.location} <br />
                                    {exp.expStartDate} to {exp.expEndDate}{" "}
                                    <br />
                                    {!this.state.editState ? (
                                      <Button
                                        id="toggleEditExperienceButton"
                                        onClick={this.toggleEditForm(true)}
                                      >
                                        {" "}
                                        Edit{" "}
                                      </Button>
                                    ) : (
                                      ""
                                    )}
                                    {this.state.editState ? (
                                      <div>
                                        <Form>
                                          <Form.Group>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                              type="text"
                                              onChange={this.updateField(
                                                "editTitle"
                                              )}
                                              id={this.setElementID("editTitle", index)} 
                                              name="editTitle"
                                              defaultValue={exp.title}
                                            />
                                          </Form.Group>

                                          <Form.Group>
                                            <Form.Label>Company</Form.Label>
                                            <Form.Control
                                              type="text"
                                              onChange={this.updateField(
                                                "editCompany"
                                              )}
                                              id={this.setElementID("editCompany", index)}
                                              name="editCompany"
                                              defaultValue={exp.company}
                                            />
                                          </Form.Group>

                                          <Form.Group>
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control
                                              type="text"
                                              onChange={this.updateField(
                                                "editLocation"
                                              )}
                                              id={this.setElementID("editLocation", index)}
                                              name="editLocation"
                                              defaultValue={exp.location}
                                            />
                                          </Form.Group>

                                          <Form.Row>
                                            <Form.Group as={Col}>
                                              <Form.Label>
                                                Start Date
                                              </Form.Label>
                                              <Form.Control
                                                type="month"
                                                onChange={this.updateField(
                                                  "editExpStartDate"
                                                )}
                                                id={this.setElementID("editExpStartDate", index)}
                                                name="editExpStartDate"
                                                defaultValue={exp.expStartDate}
                                              />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                              <Form.Label>End Date</Form.Label>
                                              <Form.Control
                                                type="month"
                                                onChange={this.updateField(
                                                  "editExpEndDate"
                                                )}
                                                id={this.setElementID("editExpEndDate", index)}
                                                name="editExpEndDate"
                                                defaultValue={exp.expEndDate}
                                              />
                                            </Form.Group>
                                          </Form.Row>
                                        </Form>
                                        <Row>
                                          <Col>
                                            <Button
                                              id="editExperienceButton"
                                              onClick={this.editExperience(
                                                index
                                              )}
                                            >
                                              Save
                                            </Button>
                                          </Col>
                                          <Col>
                                            <Button
                                              id="cancelEditExperienceButton"
                                              onClick={this.toggleEditForm(
                                                false
                                              )}
                                            >
                                              Cancel
                                            </Button>
                                          </Col>
                                        </Row>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            );
                          })}
                        </Accordion>
                      </Container>
                      <br />
                    </Col>
                  </Row>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Container>
            
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.redirectToLogin}>
                Confirm Edit
              </Button>
              <Button variant="danger" onClick={this.modalHide}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
      </>
    );
  }
}

export default Profile;
