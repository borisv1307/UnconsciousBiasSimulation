import React, { Component } from "react";
import { Container, Button, Row, Col, Form, Accordion, Card } from "react-bootstrap";
import Header from "../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css'

class CreateProfile extends Component {
  state = {
    profileName: "",
    profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    firstName: "",
    lastName: "",
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
    experience: []
  };

  updateField = (stateKey) => (e) => {
    this.setState({ [stateKey]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: "test@test.com",
      profileName: this.state.profileName,
      profileImg: this.state.profileImg,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      position: this.state.position,
      aboutMe: this.state.aboutMe,
      education: this.state.education,
      experience: this.state.experience
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
  };

  addEducation = (e) => {
    const educationData = {
      school: this.state.school,
      degree: this.state.degree,
      major: this.state.major,
      eduStartDate: this.state.eduStartDate,
      eduEndDate: this.state.eduEndDate,
      gpa: this.state.gpa,
    };

    this.setState({
      education:[...this.state.education, educationData]
    });
  };

  addExperience = (e) => {
    const experienceData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      expStartDate: this.state.expStartDate,
      expEndDate: this.state.expEndDate,
    };

    this.setState({
      experience:[...this.state.experience, experienceData]
    });
  };

  imageHandler = async e => {
    const files = e.target.files

    if(files[0].size < 2000000) {
      const data = new FormData()
      data.append('file', files[0])
      data.append('upload_preset', 'unconsciousbias')
      const res = await fetch(
        '	https://api.cloudinary.com/v1_1/unconsciousbiassimulator/image/upload',
        {
          method: 'POST',
          body: data
        }
      )
      const file = await res.json()

      this.setState({
        profileImg: file.secure_url
      }, () => {
        console.log("profileImg State:", this.state.profileImg);
      });
    } else{
      console.log("File is too large")
    }
  }

  render() {
    const {profileImg} = this.state
    return (
      <div>
        
        <Header />

        <Container className="containbody justify-content-center">
        <br/><h1 className="text-center">Create Profile</h1> <br/>
        
        <Row>
          <Col>
            <Container>
              <Form>
                <Form.Group>
                  <Form.Label>Profile Name</Form.Label>
                  <Form.Control type="text" value={this.state.profileName}
                    onChange={this.updateField("profileName")}
                    id="profileName"
                    name="profileName" placeholder="Profile A"/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text"
                    value={this.state.firstName}
                    onChange={this.updateField("firstName")}
                    id="firstName"
                    name="firstName" placeholder="John"/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text"
                    value={this.state.lastName}
                    onChange={this.updateField("lastName")}
                    id="lastName"
                    name="lastName" placeholder="Doe"/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Position</Form.Label>
                  <Form.Control type="text"
                    value={this.state.position}
                    onChange={this.updateField("position")}
                    id="position"
                    name="position" placeholder="Intern"/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>About Me</Form.Label>
                  <Form.Control type="text"
                    value={this.state.aboutMe}
                    onChange={this.updateField("aboutMe")}
                    id="aboutMe"
                    name="aboutMe" placeholder="Hardworking"/>
                </Form.Group>

              </Form>
            </Container>
                 
          </Col>
            
          <Col>
            <Container className="text-center">
              <div className="page">
                <div className="container">
                  <h3 className="heading">Add your Image</h3> <br/>
                  <img src={profileImg} width="200" alt="" id="profileImage" className="img" /> <br/> <br/>
                  <input type="file" accept="image/*" name="image-upload" id="UploadImageInput" onChange={this.imageHandler} />
                </div>
              </div>
            </Container>
          </Col>
        </Row>

        <Container>

        
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <h4>Add Education</h4>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Container>
                <br />
                <Form>

                  <Form.Group>
                    <Form.Label>School</Form.Label>
                    <Form.Control type="text"
                      value={this.state.school}
                      onChange={this.updateField("school")}
                      id="school"
                      name="school" placeholder="X University"/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Degree</Form.Label>
                    <Form.Control type="text"
                      value={this.state.degree}
                      onChange={this.updateField("degree")}
                      id="degree"
                      name="degree" placeholder="Bachelor's"/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Major</Form.Label>
                    <Form.Control type="text"
                      value={this.state.major}
                      onChange={this.updateField("major")}
                      id="major"
                      name="major" placeholder="Software Engineering"/>
                  </Form.Group>

                  <Row>
                    <Col>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control type="month"
                        value={this.state.eduStartDate}
                        onChange={this.updateField("eduStartDate")}
                        id="eduStartDate"
                        name="eduStartDate"/>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control type="month"
                        value={this.state.eduEndDate}
                        onChange={this.updateField("eduEndDate")}
                        id="eduEndDate"
                        name="eduEndDate"/>
                    </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group>
                    <Form.Label>GPA</Form.Label>
                    <Form.Control type="number"
                      step="0.01"
                      value={this.state.gpa}
                      onChange={this.updateField("gpa")}
                      id="gpa"
                      name="gpa" placeholder="4"/>
                  </Form.Group>
                  <div className="text-center">
                    <Button id="addEducationButton" onClick={this.addEducation}>
                      Add Education
                    </Button>
                  </div>
                </Form>
                <br />
              </Container>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <h4>Add Experience</h4>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Container>
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"
                      value={this.state.title}
                      onChange={this.updateField("title")}
                      id="title"
                      name="title" placeholder="Intern"/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text"
                      value={this.state.company}
                      onChange={this.updateField("company")}
                      id="company"
                      name="company" placeholder="Y Company"/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text"
                      value={this.state.location}
                      onChange={this.updateField("location")}
                      id="location"
                      name="location" placeholder="Philadelphia"/>
                  </Form.Group>

                  <Row>
                    <Col>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control type="month"
                        value={this.state.expStartDate}
                        onChange={this.updateField("expStartDate")}
                        id="expStartDate"
                        name="expStartDate"/>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control type="month"
                        value={this.state.expEndDate}
                        onChange={this.updateField("expEndDate")}
                        id="expEndDate"
                        name="expEndDate"/>
                    </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button id="addExperienceButton" onClick={this.addExperience}>
                      Add Experience
                    </Button>
                  </div>                 
                </Form>
                <br />
              </Container>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        </Container>
          <br />
          <div className="text-center">
            <Button id="submitButton" className="submit" onClick={this.handleSubmit}>
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
