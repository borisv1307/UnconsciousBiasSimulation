import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Header from "../Header/Header";
import Profile from "../viewProfile/Profile";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";

class ViewProfiles extends Component {
  constructor() {
    super();
    this.state = {
      profiles: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/v1/getProfiles/")
      .then((response) => response.json())
      .then((res) => {
        this.setState({ profiles: res["results"] });
        // console.log(res["results"]);
      });
  }

  render() {
    return (
      <>
        <Header />

        <Container className="containbody justify-content-center">
          <Accordion defaultActiveKey="0">
            {this.state.profiles.map((profile, i) => (
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey={i + 1}>
                  {profile.profileName}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i + 1}>
                  <Card.Body>
                    <Profile profile={profile} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </Container>
      </>
    );
  }
}

export default ViewProfiles;
