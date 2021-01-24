import React, { Component } from "react";
import ls from "local-storage";
import { Container, Tab, Tabs } from "react-bootstrap";
import HeaderHR from "../Header/HeaderHR";
import HorizontalBarGraph from "../graphs/horizontalBarGraph";


class HomeHR extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataHorizontal: {
        labels: ["Male", "Female", "Other", "Prefer Not to Say"],
        datasets: [
          {
            label: 'Acceptance',
            data: [],
            fill: false,
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          },
          {
            label: 'Rejection',
            data: [],
            fill: false,
            backgroundColor: [],
            borderColor: [],
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
      xAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        barPercentage: 0.5,
        stacked: true
      }]
    }
  };


  componentDidMount() {
    const token = ls.get("token");
    if (token === null || token === "") {
      window.location.href = "/login"
    }

    const reviewer_id = ls.get("userid")
    const acceptBgColor = "rgba(75, 192, 192, 0.2)"
    const acceptBorderColor = "rgb(75, 192, 192)"
    const rejectBgColor = "rgba(255, 99, 132, 0.2)"
    const rejectBorderColor = "rgb(255, 99, 132)"
    const dataHorizontal = this.state.dataHorizontal;
    var acceptance = []
    var rejection = []

    fetch("https://ubs-app-api-dev.herokuapp.com/api/v1/getCount/" + reviewer_id)
      .then((res) => res.json())
      .then((res) => {
        Object.keys(res).forEach(function (key) {
          if (key === "accepted_male_count") {
            acceptance.push(res.accepted_male_count)
          }
          else {
            rejection.push(res.declined_male_count)
          }
          if (key === "accepted_female_count") {
            acceptance.push(res.accepted_female_count)
          }
          else {
            rejection.push(res.declined_female_count)
          }

          if (key === "accepted_other_count") {
            acceptance.push(res.accepted_other_count)
          }
          else {
            rejection.push(res.declined_other_count)
          }
          if (key === "accepted_undisclosed_count") {
            acceptance.push(res.accepted_undisclosed_count)
          }
          else {
            rejection.push(res.declined_undisclosed_count)
          }

        });

        dataHorizontal.datasets[0].data = acceptance;
        dataHorizontal.datasets[0].backgroundColor = new Array(acceptance.length).fill(acceptBgColor);
        dataHorizontal.datasets[0].borderColor = new Array(acceptance.length).fill(acceptBorderColor);

        dataHorizontal.datasets[1].data = rejection;
        dataHorizontal.datasets[1].backgroundColor = new Array(rejection.length).fill(rejectBgColor);
        dataHorizontal.datasets[1].borderColor = new Array(rejection.length).fill(rejectBorderColor);



        this.setState({ dataHorizontal })

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
            <br />
            <Tabs defaultActiveKey="GenderCategoryInsight" transition={false} id="noanim-tab-example">



              <Tab eventKey="GenderCategoryInsight" title=" Gender(category) Insight ">
                <div>
                  <br />
                  <h3 className="text-center"> Gender(category) Insight </h3>
                  <HorizontalBarGraph inputData={this.state.dataHorizontal} barChartOptions={this.barChartOptions} height={450} />
                </div>
              </Tab>
              <Tab eventKey="EthnicityCategoryInsight" title=" Ethnicity(category) Insight ">
                <div>
                  <br />
                  <h3 className="text-center"> Ethnicity(category) Insight </h3>
                  <HorizontalBarGraph inputData={this.state.dataHorizontal} barChartOptions={this.barChartOptions} height={450} />
                </div>
              </Tab>
              {/* <Tab eventKey="Rate" title=" Categories Rate% ">
                <Row>
                  <Col>
                    <br /><br />     <br /><br />

                    <h3 className="text-center">Male Application Analysis</h3>
                    <br />
                    <DoughnutChart inputData={this.state.dataDoughnutMale} height={220} />

                  </Col>
                  <Col>
                    <br /><br />     <br /><br />

                    <h3 className="text-center">Female Application Analysis</h3>
                    <br />
                    <DoughnutChart inputData={this.state.dataDoughnutFemale} height={220} />

                  </Col>
                </Row>
                <br />
              </Tab> */}
            </Tabs>

          </Container>
        </div>
      </>
    );
  }
}

export default HomeHR;
