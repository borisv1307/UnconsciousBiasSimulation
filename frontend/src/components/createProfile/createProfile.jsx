import React, { Component } from "react";

class CreateProfile extends Component {
  state = {
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
  };

  updateField = (stateKey) => (e) => {
    this.setState({ [stateKey]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Create Profile</h1>
        <div>
          <form
            className="profile"
            action="http://localhost:5000/createProfile/username"
            method="post"
          >
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
            <button id="submitButton" class="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
