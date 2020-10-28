import React, { Component } from "react";
import { Container, Button, Col, Row, Form } from "react-bootstrap";
import Header from "../Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css'

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    date_of_birth: "",
    registration_type: "",
    contact_details: [],
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    contact_number: "",
  };

  updateField = (stateKey) => (e) => {
    this.setState({ [stateKey]: e.target.value });
  };

  handleSubmit = async (e) => {
    //e.preventDefault();
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      registration_type: this.state.registration_type,
      gender: this.state.gender,
      date_of_birth: this.state.date_of_birth,
      contact_details: this.state.contact_details,
    };

    console.log(JSON.stringify(data));

    fetch("http://localhost:5000/api/v1/createUser/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));  
  };

  collectContactDetails = (e) => {
    const contactDetailsData = {
        address: this.state.address,
        address2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        contact_number: this.state.contact_number
    };

    console.log("adding address", contactDetailsData)

    this.setState({
      contact_details:[...this.state.contact_details, contactDetailsData]
    });
  };

  render() {
    const options = [{abbr: 'AL', name: 'Alabama'}, {abbr: 'AK', name: 'Alaska'}, {abbr: 'AS', name: 'American Samoa'}, {abbr: 'AZ', name: 'Arizona'},
                      {abbr: 'AR', name: 'Arkansas'}, {abbr: 'CA', name: 'California'}, {abbr: 'CO', name: 'Colorado'}, {abbr: 'CT', name: 'Connecticut'},
                      {abbr: 'DE', name: 'Delaware'}, {abbr: 'DC', name: 'District Of Columbia'}, {abbr: 'FM', name: 'Federated States Of Micronesia'},
                      {abbr: 'FL', name: 'Florida'}, {abbr: 'GA', name: 'Georgia'}, {abbr: 'GU', name: 'Guam'}, {abbr: 'HI', name: 'Hawaii'},
                      {abbr: 'ID', name: 'Idaho'}, {abbr: 'IL', name: 'Illinois'}, {abbr: 'IN', name: 'Indiana'}, {abbr: 'IA', name: 'Iowa'},
                      {abbr: 'KS', name: 'Kansas'}, {abbr: 'KY', name: 'Kentucky'}, {abbr: 'LA', name: 'Louisiana'}, {abbr: 'ME', name: 'Maine'},
                      {abbr: 'MH', name: 'Marshall Islands'}, {abbr: 'MD', name: 'Maryland'}, {abbr: 'MA', name: 'Massachusetts'},
                      {abbr: 'MI', name: 'Michigan'}, {abbr: 'MN', name: 'Minnesota'}, {abbr: 'MS', name: 'Mississippi'}, {abbr: 'MO', name: 'Missouri'},
                      {abbr: 'MT', name: 'Montana'}, {abbr: 'NE', name: 'Nebraska'}, {abbr: 'NV', name: 'Nevada'}, {abbr: 'NH', name: 'New Hampshire'},
                      {abbr: 'NJ', name: 'New Jersey'}, {abbr: 'NM', name: 'New Mexico'}, {abbr: 'NY', name: 'New York'}, {abbr: 'NC', name: 'North Carolina'},
                      {abbr: 'ND', name: 'North Dakota'}, {abbr: 'MP', name: 'Northern Mariana Islands'}, {abbr: 'OH', name: 'Ohio'}, {abbr: 'OK', name: 'Oklahoma'},
                      {abbr: 'OR', name: 'Oregon'}, {abbr: 'PW', name: 'Palau'}, {abbr: 'PA', name: 'Pennsylvania'}, {abbr: 'PR', name: 'Puerto Rico'},
                      {abbr: 'RI', name: 'Rhode Island'}, {abbr: 'SC', name: 'South Carolina'}, {abbr: 'SD', name: 'South Dakota'}, {abbr: 'TN', name: 'Tennessee'},
                      {abbr: 'TX', name: 'Texas'}, {abbr: 'UT', name: 'Utah'}, {abbr: 'VT', name: 'Vermont'}, {abbr: 'VI', name: 'Virgin Islands'},
                      {abbr: 'VA', name: 'Virginia'}, {abbr: 'WA', name: 'Washington'}, {abbr: 'WV', name: 'West Virginia'}, {abbr: 'WI', name: 'Wisconsin'},
                      {abbr: 'WY', name: 'Wyoming'},]

    return (
      <div>
        <Header />

        <Container className="containbody justify-content-center">

            <br/><h1 className="text-center">Register</h1> <br/>

            <Container>
                <Form>
                  <Form.Row>                 
                    <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={this.state.firstName}
                        onChange={this.updateField("firstName")}
                        id="firstName"
                        name="firstName" placeholder="John"/>
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={this.state.lastName}
                        onChange={this.updateField("lastName")}
                        id="lastName"
                        name="lastName" placeholder="Doe"/>
                    </Form.Group>
                  </Form.Row>

                    <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={this.state.email}
                        onChange={this.updateField("email")}
                        id="email"
                        name="email" placeholder="test@test.com"/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={this.state.password}
                        onChange={this.updateField("password")}
                        id="password"
                        name="password" placeholder="Password"/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Registration Type</Form.Label>
                    <Form.Control as="select" value={this.state.registration_type}
                          onChange={this.updateField("registration_type")}
                          id="registration_type"
                          name="registration_type" >
                            <option value="Job Seeker">Job Seeker</option>
                            <option value="HR Professional">HR Professional</option>
                    </Form.Control>
                    </Form.Group>

                    <Row>
                    <Col>
                    <Form.Group>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control as="select" value={this.state.gender}
                          onChange={this.updateField("gender")}
                          id="gender"
                          name="gender" >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer Not To Say">Prefer Not To Say</option>
                      </Form.Control>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                      <Form.Label>Birth Date</Form.Label>
                      <Form.Control type="date"
                        value={this.state.date_of_birth}
                        onChange={this.updateField("date_of_birth")}
                        id="date_of_birth"
                        name="date_of_birth"/>
                    </Form.Group>
                    </Col>
                    </Row>

                    <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={this.state.address}
                        onChange={this.updateField("address")}
                        id="address"
                        name="address" placeholder="1234 Test Street"/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control type="text" value={this.state.address2}
                        onChange={this.updateField("address2")}
                        id="address2"
                        name="address2" placeholder="Apartment, studio, or floor"/>
                    </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" value={this.state.city}
                        onChange={this.updateField("city")}
                        id="city"
                        name="city" placeholder=""/>
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" value={this.state.state}
                        onChange={this.updateField("state")}
                        id="state"
                        name="state" >
                      {
                        options.map((option, index) => {
                            return (<option key={index} value={option.abbr}>{option.name}</option>)
                        })
                      }
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="numeric" value={this.state.zip}
                        onChange={this.updateField("zip")}
                        id="zip"
                        name="zip" placeholder="00000"/>
                    </Form.Group>

                  </Form.Row>

                    <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" value={this.state.contact_number}
                        onChange={this.updateField("contact_number")}
                        id="contact_number"
                        name="contact_number" placeholder="contact_number"/>
                    </Form.Group>
                    
                </Form>
            </Container>

            <div className="text-center">
            <Button id="collectContactDetailsButton" onClick={this.collectContactDetails}>
              Add Contact Details
            </Button>
            </div>

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

export default Register;
