import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PieChart from "./PieChart";
import Button from "react-bootstrap/Button";
import "./Information.css";
import axios from "axios";
import {
  getPopularDiseases,
  getOccurrences,
  getVaccinationPercentage,
  getStateRestrictionAus,
} from "./RequestData";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import InfoNavBar from "./InfoNavBar";

function Information({ diseases, startDate, endDate, country }) {
  const [startDateString, setStartDateString] = useState("");
  const [endDateString, setEndDateString] = useState("");
  const [data, setData] = useState([]);
  const [graphTitle, setGraphTitle] = useState("");
  const [showTopDiseases, setShowTopDiseases] = useState("block");

  useEffect(() => {
    startDate
      ? setStartDateString(startDate.toISOString().split("T")[0])
      : setStartDateString("1997-01-01");
  }, [startDate]);

  useEffect(() => {
    endDate
      ? setEndDateString(endDate.toISOString().split("T")[0])
      : setEndDateString("2022-01-01");
  }, [endDate]);

  useEffect(() => {
    fetchData();
  }, [startDateString, endDateString, diseases, country]);

  function fetchData() {
    if (country === "World" && diseases.length > 0) {
      setGraphTitle(`Top Countries with Occurences of Selected Disease(s)`);
      console.log("calling getOccurences");
      getOccurrences(diseases, startDateString, endDateString)
        .then((r) => {
          setData(
            r.locations.map((item) => {
              return {
                name: item.name,
                y: item.occurrences,
              };
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (country !== "World") {
      // country selected so get top diseases in that country
      setGraphTitle(`Top Diseases in ${country}`);
      console.log("calling getPopularDisases");
      getPopularDiseases(startDateString, endDateString, country)
        .then((r) => {
          console.log(r);
          setData(
            r.rankings.map((item) => {
              return {
                name: item.name,
                y: item.occurrences,
              };
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="divOutline" style={{ overflow: "scroll" }}>
      <Container>
        <h4>Information</h4>
        <p>Country: {country}</p>
        <Row>
          <InfoNavBar
            diseases={diseases}
            startDate={startDateString}
            endDate={endDateString}
            country={country}
            setShowTopDiseases={setShowTopDiseases}
          />
        </Row>
        <div style={{ display: showTopDiseases }}>
          {diseases.length > 0 || country !== "World" ? (
            <PieChart data={data} graphTitle={graphTitle} />
          ) : (
            <p>Please select a disease or a country for further information</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Information;
