import React, { Component } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Accordion,
  Card,
  Alert,
} from "react-bootstrap";
import Header from "../Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const initialState = {
  profileName: "",
  email: "",
  profileImg:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
  editState: false,
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
  alertMessage: "",
  eduErrorState: false,
  expErrorState: false,
  allErrorState: false,
  eduSuccessState: false,
  expSuccessState: false,
  allSuccessState: false,
};

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  reset() {
    this.setState(initialState);
  }

  updateField = (stateKey) => (e) => {
    this.setState({ [stateKey]: e.target.value });
  };

  validateSubmit = () => {
    var message = "";
    var isError = false;
    var isValid = true;

    if (
      !this.state.profileName ||
      !this.state.email ||
      !this.state.first_name ||
      !this.state.last_name ||
      !this.state.position ||
      !this.state.aboutMe
    ) {
      message = "Incomplete input";
      isError = true;
      isValid = false;
    } else if (
      !this.state.email.includes("@") ||
      !this.state.email.includes(".")
    ) {
      message = "Invalid email";
      isError = true;
      isValid = false;
    } else if (
      this.state.profileImg ===
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    ) {
      message = "No image added";
      isError = true;
      isValid = false;
    } else {
      this.setState({
        alertMessage: "Successfully submitted",
        allErrorState: false,
        allSuccessState: true,
      });
    }

    if (isError) {
      this.setState({
        alertMessage: message,
        allErrorState: isError,
        allSuccessState: false,
      });
    }

    return isValid;
  };

  handleSubmit = (e) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get("userId");

    const isValid = this.validateSubmit();
    if (isValid) {
      const data = {
        email: this.state.email,
        profileName: this.state.profileName,
        profileImg: this.state.profileImg,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        position: this.state.position,
        aboutMe: this.state.aboutMe,
        education: this.state.education,
        experience: this.state.experience,
        user_id: userId,
      };

      console.log(JSON.stringify(data));

      fetch("http://localhost:5000/api/v1/createProfile/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));

      this.reset();
      this.setState({
        alertMessage: "Successfully submitted",
        allSuccessState: true,
      });
    }
  };

  validateAddingEducation = () => {
    var message = "";
    var isError = false;
    var isValid = true;

    if (
      !this.state.school ||
      !this.state.degree ||
      !this.state.major ||
      !this.state.eduStartDate ||
      !this.state.eduEndDate
    ) {
      message = "Incomplete input";
      isError = true;
      isValid = false;
    } else if (this.state.gpa > 4 || this.state.gpa < 0) {
      message = "Invalid GPA: should be between 0 and 4";
      isError = true;
      isValid = false;
    } else if (this.state.eduEndDate < this.state.eduStartDate) {
      message = "Invalid dates: End date precedes start date";
      isError = true;
      isValid = false;
    } else {
      this.setState({
        alertMessage: "Successfully submitted",
        eduErrorState: false,
        eduSuccessState: true,
      });
    }

    if (isError) {
      this.setState({
        alertMessage: message,
        eduErrorState: isError,
        eduSuccessState: false,
      });
    }

    return isValid;
  };

  addEducation = (e) => {
    const isValid = this.validateAddingEducation();
    if (isValid) {
      const educationData = {
        school: this.state.school,
        degree: this.state.degree,
        major: this.state.major,
        eduStartDate: this.state.eduStartDate,
        eduEndDate: this.state.eduEndDate,
        gpa: this.state.gpa,
      };

      this.setState({
        education: [...this.state.education, educationData],
        school: "",
        degree: "",
        major: "",
        eduStartDate: "",
        eduEndDate: "",
        gpa: "",
      });
    }
  };

  validateAddingExperience = () => {
    var message = "";
    var isError = false;
    var isValid = true;

    if (
      !this.state.title ||
      !this.state.company ||
      !this.state.location ||
      !this.state.expStartDate ||
      !this.state.expEndDate
    ) {
      message = "Incomplete input";
      isError = true;
      isValid = false;
    } else if (this.state.expEndDate < this.state.expStartDate) {
      message = "Invalid dates: End date precedes start date";
      isError = true;
      isValid = false;
    } else {
      this.setState({
        alertMessage: "Successfully submitted",
        expErrorState: false,
        expSuccessState: true,
      });
    }

    if (isError) {
      this.setState({
        alertMessage: message,
        expErrorState: isError,
        expSuccessState: false,
      });
    }

    return isValid;
  };

  addExperience = (e) => {
    const isValid = this.validateAddingExperience();
    if (isValid) {
      const experienceData = {
        title: this.state.title,
        company: this.state.company,
        location: this.state.location,
        expStartDate: this.state.expStartDate,
        expEndDate: this.state.expEndDate,
      };

      this.setState({
        experience: [...this.state.experience, experienceData],
        title: "",
        company: "",
        location: "",
        expStartDate: "",
        expEndDate: "",
      });
    }
    //this.setState({expErrorState: false, expSuccessState: false});
  };

  toggleEditForm = (input) => (e) => {
    this.setState({ editState: input });
  };

  editEducation = (index) => (e) => {
    const editEducationData = {
      school: this.state.editSchool,
      degree: this.state.editDegree,
      major: this.state.editMajor,
      eduStartDate: this.state.editEduStartDate,
      eduEndDate: this.state.editEduEndDate,
      gpa: this.state.editGpa,
    };

    const newEducation = this.state.education.slice();
    newEducation[index] = editEducationData;

    this.setState(
      {
        education: newEducation,
        editState: false,
      },
      () => {
        console.log(this.state.education);
      }
    );
  };

  editExperience = (index) => (e) => {
    const editExperienceData = {
      title: this.state.editTitle,
      company: this.state.editCompany,
      location: this.state.editLocation,
      expStartDate: this.state.editExpStartDate,
      expEndDate: this.state.editExpEndDate,
    };

    const newExperience = this.state.experience.slice();
    newExperience[index] = editExperienceData;

    this.setState(
      {
        experience: newExperience,
        editState: false,
      },
      () => {
        console.log(this.state.experience);
      }
    );
  };

  imageHandler = async (e) => {
    const files = e.target.files;

    if (files[0].size < 2000000) {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "unconsciousbias");
      const res = await fetch(
        "	https://api.cloudinary.com/v1_1/unconsciousbiassimulator/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();

      this.setState(
        {
          profileImg: file.secure_url,
        },
        () => {
          console.log("profileImg State:", this.state.profileImg);
        }
      );
    } else {
      console.log("File is too large");
    }
  };

  render() {
    const { profileImg } = this.state;
    return (
      <div>
        <Header />

        <Container className="containbody justify-content-center">
          <br />
          <h1 className="text-center">Create Presence</h1> <br />
          <Row>
            <Col>
              <Container>
                <Form>
                  <Form.Group>
                    <Form.Label>Profile Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.profileName}
                      onChange={this.updateField("profileName")}
                      id="profileName"
                      name="profileName"
                      placeholder="Profile A"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={this.state.email}
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
                      value={this.state.first_name}
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
                      value={this.state.last_name}
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
                      value={this.state.position}
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
                      value={this.state.aboutMe}
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
                    <h3 className="heading">Add your Image</h3> <br />
                    <img
                      src={profileImg}
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
                              value={this.state.school}
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
                              value={this.state.degree}
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
                              value={this.state.major}
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
                                value={this.state.eduStartDate}
                                onChange={this.updateField("eduStartDate")}
                                id="eduStartDate"
                                name="eduStartDate"
                              />
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>End Date</Form.Label>
                              <Form.Control
                                type="month"
                                value={this.state.eduEndDate}
                                onChange={this.updateField("eduEndDate")}
                                id="eduEndDate"
                                name="eduEndDate"
                              />
                            </Form.Group>
                          </Form.Row>

                          <Form.Group>
                            <Form.Label>GPA</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.01"
                              value={this.state.gpa}
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
                          {this.state.education.map((edu, index) => {
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
                                              id="editSchool"
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
                                              id="editDegree"
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
                                              id="editMajor"
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
                                                id="editEduStartDate"
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
                                                id="editEduEndDate"
                                                name="editEduEndDate"
                                                defaultValue={edu.eduEndDate}
                                              />
                                            </Form.Group>
                                          </Form.Row>

                                          <Form.Group>
                                            <Form.Label>GPA</Form.Label>
                                            <Form.Control
                                              type="number"
                                              step="0.01"
                                              onChange={this.updateField(
                                                "editGpa"
                                              )}
                                              id="editGpa"
                                              name="editGpa"
                                              value={edu.gpa}
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
                          {this.state.experience.map((exp, index) => {
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
                                              id="editTitle"
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
                                              id="editCompany"
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
                                              id="editLocation"
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
                                                id="editExpStartDate"
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
                                                id="editExpEndDate"
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
          <br />
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
            <Button
              id="submitButton"
              className="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>
          <br />
        </Container>
      </div>
    );
  }
}

export default CreateProfile;
