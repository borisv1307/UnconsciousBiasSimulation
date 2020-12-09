import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import ls from "local-storage";
import { Container, Tab, Tabs } from "react-bootstrap";
import HeaderHR from "../Header/HeaderHR";
import HorizontalBarGraph from "../graphs/horizontalBarGraph";
import DoughnutChart from "../graphs/doughnutChart";

class HomeHR extends Component {

  constructor(props) {
    super(props);
    this.state = {

      dataDoughnut: {
        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
        datasets: [
          {
            data: [300, 50, 100, 40, 120],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              "#616774"
            ]
          }
        ]
      },
      dataHorizontal: {
        labels: ['Accepted', 'Rejected'],
        datasets: [
          {
            label: 'Application Insight',
            data: [0, 0],
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',


            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',


            ],
            borderWidth: 1
          }
        ]
      }
    };

  }

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          barPercentage: 0.4,
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          },
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  componentDidMount() {
    const token = ls.get("token");
    if (token === null || token === "") {
      window.location.href = "/login"
    }

    const reviewer_id = ls.get("userid")
    const bardata = this.state
    fetch("http://localhost:5000/api/v1/getCount/" + reviewer_id)
      .then((res) => res.json())
      .then((res) => {
        bardata.dataHorizontal.datasets[0].data = [res.accepted_count, res.declined_count];

      })


  }
  render() {
    let name = ls.get("name");
    return (
      <>
        <style type="text/css">
          {`

    .nav-style-title {
      font-size: xx-large;
    }
    .nav-style {
      font-size: x-large;
    }
        `}
        </style>
        <div>
          <HeaderHR />

          <br />
          <Container className="containbody justify-content-center">
            <br />
            <h1 className="text-center">{"Welcome " + name}</h1>
            <h4 className="text-center">HR Professional</h4> <br />
            <h5 className="text-center">
              View real applications and see where your biases lie statistically
            </h5>
            <br />
            <br />     <br /><br />
            <Tabs defaultActiveKey="ApplicationData" transition={false} id="noanim-tab-example">
              <Tab eventKey="ApplicationInsight" title="ApplicationInsight">
                <div>
                  <br />
                  <h3 className="text-center"> Application Insight </h3>
                  <HorizontalBarGraph inputData={this.state.dataHorizontal} />
                </div>
              </Tab>

              <Tab eventKey="Rate" title="Rate">
                <Row>
                  <Col>
                    <br /><br />     <br /><br />

                    <h3 className="text-center">Acceptance Categories</h3>
                    <br />
                    <DoughnutChart inputData={this.state.dataDoughnut} />

                  </Col>
                  <Col>
                    <br /><br />     <br /><br />

                    <h3 className="text-center">Rejection Categories</h3>
                    <br />
                    <DoughnutChart inputData={this.state.dataDoughnut} />

                  </Col>
                </Row>
                <br /><br />     <br /><br />     <br /><br />     <br /><br />      <br /><br />
              </Tab>
            </Tabs>

          </Container>
        </div>
      </>
    );
  }
}

export default HomeHR;
