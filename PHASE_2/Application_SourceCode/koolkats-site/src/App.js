import logo from "./logo.svg";
import React from "react";
import FilterInputs from "./components/FilterInputs";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [selectedDiseases, setSelectedDiseases] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date(2021, 0, 1));
  const [endDate, setEndDate] = React.useState(new Date());

  
  return (
    <div className="App">
      <header></header>
      <body>
        <FilterInputs
          selectedDiseases={selectedDiseases}
          setSelectedDiseases={setSelectedDiseases}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          endEndDate={setEndDate}
        />
      </body>
    </div>
  );
}

export default App;
