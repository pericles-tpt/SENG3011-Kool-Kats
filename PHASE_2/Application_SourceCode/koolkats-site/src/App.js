import logo from "./logo.png";
import React from "react";
import FilterInputs from "./components/FilterInputs";
import getDisease, { getArticles, getVaccinationPercentage, getStateRestrictionAus } from "./components/RequestData";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import MapChart from "./components/MapChart.js";
import Information from "./components/Information.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Image from 'react-bootstrap/Image'

function App() {
  const [selectedDiseases, setSelectedDiseases] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState("World");
  // const [startDate, setStartDate] = React.useState(new Date(2021, 0, 1));
  const [startDate, setStartDate] = React.useState(new Date(2021, 0, 1));
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

  /*Promise.resolve(getVaccinationPercentage('Australia').then(function(v) {
    console.log(v.data)
  }))*/

  return (
    <div className="App">
      <header>
      </header>
      <br></br>
      <Image src={logo} alt="Logo" roundedCircle style={{width: '10%'}}/>
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
      <div class="align-items-start d-flex results">
        <MapChart
          selectedDiseases={selectedDiseases}
          startDate={startDate}
          endDate={endDate}
          setSelectedCountry={setSelectedCountry}
        />
        {showInformation && (
          <Router>
            <Information
              diseases={selectedDiseases}
              startDate={startDate}
              endDate={endDate}
              country={selectedCountry}
            />
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;
