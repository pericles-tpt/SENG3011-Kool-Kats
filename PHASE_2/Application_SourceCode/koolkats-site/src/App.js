
import logo from "./logo.svg";
import React from "react";
import FilterInputs from "./components/FilterInputs";
import getDisease, { getArticles } from "./components/RequestData";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MapChart from './components/MapChart.js'


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
          endEndDate={setEndDate}
        />
      <MapChart 
        selectedDiseases={selectedDiseases}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

export default App;
