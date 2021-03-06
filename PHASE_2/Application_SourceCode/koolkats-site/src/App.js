import logo from "./logo.png";
import React from "react";
import FilterInputs from "./components/FilterInputs";
import getDisease, {
  getArticles,
  getVaccinationPercentage,
  getStateRestrictionAus,
  getCOVIDCasesCountries,
  crdInRange,
} from "./components/RequestData";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import MapChart from "./components/MapChart.js";
import Information from "./components/Information.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Image from "react-bootstrap/Image";

function App() {
  const [selectedDiseases, setSelectedDiseases] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState("World");
  // const [startDate, setStartDate] = React.useState(new Date(2021, 0, 1));
  const [startDate, setStartDate] = React.useState(new Date(2010, 0, 1));
  const [endDate, setEndDate] = React.useState(new Date());

  const [showInformation, setShowInformation] = React.useState(false);

  // Promise.resolve(
  //   getArticles(
  //     "2000-01-01",
  //     "2020-01-01",
  //     ["listeriosis", "yellow fever"],
  //     "France"
  //   ).then(function (v) {
  //     console.log(v.articles[0]);
  //   })
  // );

  /*Promise.resolve(getStateRestrictionAus().then(function(v) {
    console.log(v.data[0].rules[0])
  }))*/

  // Promise.resolve(getVaccinationPercentage('Australia').then(function(v) {
  //   console.log(v)
  // }))

  Promise.resolve(getCOVIDCasesCountries('Australia,UK,US').then(function(v) {
    console.log(v)
    console.log('cases ' + crdInRange(v, 'Australia', '2021-03-18', '2025-04-18', 1))
  }))

  return (
    <div className="App">
      <header></header>
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col>
            <Image src={logo} alt="Logo" className="logo" roundedCircle />
          </Col>
          <Col xs={10}>
            <FilterInputs
              selectedDiseases={selectedDiseases}
              setSelectedDiseases={setSelectedDiseases}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              showInformation={showInformation}
              setShowInformation={setShowInformation}
              setSelectedCountry={setSelectedCountry}
            />
          </Col>
        </Row>
      </Container>

      <div class="align-items-start d-flex results">
        <MapChart
          selectedDiseases={selectedDiseases}
          startDate={startDate}
          endDate={endDate}
          setSelectedCountry={setSelectedCountry}
        />
        {showInformation && (
          <Information
            diseases={selectedDiseases}
            startDate={startDate}
            endDate={endDate}
            country={selectedCountry}
          />
        )}
      </div>
    </div>
  );
}

export default App;
