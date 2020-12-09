import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { HorizontalBar } from 'react-chartjs-2';

class HorizontalBarGraph extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataHorizontal: this.props.inputData
        }
    }

  render() {
    return (
      <Container>
        <br />
        <Row>
            <Col></Col>
            <Col xs={10}>
            <HorizontalBar
                data={this.state.dataHorizontal}
                options={{ responsive: true }}
            />
            </Col>
            <Col></Col>
        </Row>
        <br />
      </Container>
    );
  }
}

export default HorizontalBarGraph;