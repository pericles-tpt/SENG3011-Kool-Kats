
import logo from "./logo.svg";
import React from "react";
import FilterInputs from "./components/FilterInputs";
import getDisease, { getArticles } from "./components/RequestData";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MapChart from './components/MapChart.js'
import Information from './components/Information.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [selectedDiseases, setSelectedDiseases] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date(2021, 0, 1));
  const [endDate, setEndDate] = React.useState(new Date());

  Promise.resolve(getArticles('2000-01-01', '2020-01-01', ['listeriosis', 'yellow fever'], 'France').then(function(v) {
    console.log(v.articles[0])
  }))
  
  return (
    <div className="App">
      <header></header>
        <FilterInputs
          selectedDiseases={selectedDiseases}
          setSelectedDiseases={setSelectedDiseases}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          />
      <div>
        <MapChart 
          selectedDiseases={selectedDiseases}
          startDate={startDate}
          endDate={endDate}
        />
        <Router>
          <Information
            country="world"
            diseases={selectedDiseases}
            startDate={startDate}
            endDate={endDate}
          />
        </Router>
      </div>
    </div>
  );
}

export default App;
