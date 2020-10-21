import React, { Component } from "react";
import { Button } from "react-bootstrap";
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
  }

  render() {
    const {profileImg} = this.state
    return (
      <div>
        <Header />
        <h1>Create Profile</h1>
        <div className="page">
          <div className="container">
            <h2 className="heading">Add your Image</h2>
            <img src={profileImg} width="200" alt="" id="profileImage" className="img" />
            <input type="file" accept="image/*" name="image-upload" id="UploadImageInput" onChange={this.imageHandler} />
          </div>
        </div>
        <div>
          <form className="profile" action="" onSubmit={this.handleSubmit}>
            <label>Profile Name</label> <br />
            <input
              type="text"
              value={this.state.profileName}
              onChange={this.updateField("profileName")}
              id="profileName"
              name="profileName"
              required
            />{" "}
            <br />
            <label>First Name</label> <br />
            <input
              type="text"
              value={this.state.firstName}
              onChange={this.updateField("firstName")}
              id="firstName"
              name="firstName"
              required
            />{" "}
            <br />
            <label>Last Name</label> <br />
            <input
              type="text"
              value={this.state.lastName}
              onChange={this.updateField("lastName")}
              id="lastName"
              name="lastName"
              required
            />{" "}
            <br />
            <label>Position</label> <br />
            <input
              type="text"
              value={this.state.position}
              onChange={this.updateField("position")}
              id="position"
              name="position"
              required
            />{" "}
            <br />
            <label>About me</label> <br />
            <input
              type="text"
              value={this.state.aboutMe}
              onChange={this.updateField("aboutMe")}
              id="aboutMe"
              name="aboutMe"
              required
            />{" "}
            <br />
            <h3>Insert Education</h3>
            <label>School</label> <br />
            <input
              type="text"
              value={this.state.school}
              onChange={this.updateField("school")}
              id="school"
              name="school"
              required
            />{" "}
            <br />
            <label>Degree</label> <br />
            <input
              type="text"
              value={this.state.degree}
              onChange={this.updateField("degree")}
              id="degree"
              name="degree"
              required
            />{" "}
            <br />
            <label>Major</label> <br />
            <input
              type="text"
              value={this.state.major}
              onChange={this.updateField("major")}
              id="major"
              name="major"
              required
            />{" "}
            <br />
            <label>Start Year</label> <br />
            <input
              type="month"
              value={this.state.eduStartDate}
              onChange={this.updateField("eduStartDate")}
              id="eduStartDate"
              name="eduStartDate"
              required
            />{" "}
            <br />
            <label>End Year</label> <br />
            <input
              type="month"
              value={this.state.eduEndDate}
              onChange={this.updateField("eduEndDate")}
              id="eduEndDate"
              name="eduEndDate"
              required
            />{" "}
            <br />
            <label>GPA</label> <br />
            <input
              type="number"
              step="0.01"
              value={this.state.gpa}
              onChange={this.updateField("gpa")}
              id="gpa"
              name="gpa"
              required
            />{" "}
            <br />
            <Button id="addEducationButton" onClick={this.addEducation}>
              Add Education
            </Button>
            <h3>Insert Experience</h3>
            <label>Title</label> <br />
            <input
              type="text"
              value={this.state.title}
              onChange={this.updateField("title")}
              id="title"
              name="title"
              required
            />{" "}
            <br />
            <label>Company</label> <br />
            <input
              type="text"
              value={this.state.company}
              onChange={this.updateField("company")}
              id="company"
              name="company"
              required
            />{" "}
            <br />
            <label>Location</label> <br />
            <input
              type="text"
              value={this.state.location}
              onChange={this.updateField("location")}
              id="location"
              name="location"
              required
            />{" "}
            <br />
            <label>Start Date</label> <br />
            <input
              type="month"
              value={this.state.expStartDate}
              onChange={this.updateField("expStartDate")}
              id="expStartDate"
              name="expStartDate"
              required
            />{" "}
            <br />
            <label>End Date</label> <br />
            <input
              type="month"
              value={this.state.expEndDate}
              onChange={this.updateField("expEndDate")}
              id="expEndDate"
              name="expEndDate"
              required
            />{" "}
            <br />
            <Button id="addExperienceButton" onClick={this.addExperience}>
              Add Experience
            </Button>
            <br />
            <Button id="submitButton" className="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
