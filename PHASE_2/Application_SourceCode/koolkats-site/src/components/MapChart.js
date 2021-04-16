import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { getOccurrences } from "./RequestData";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({
  selectedDiseases,
  setSelectedCountry,
  startDate,
  endDate,
}) => {
  const [data, setData] = useState([]);
  const [max, setMax] = useState(0);

  useEffect(() => {
    var diseases = selectedDiseases.join(", ");
    var start = "";
    var end = "";
    console.log(diseases);
    if (startDate != null) {
      start = startDate.toISOString().split("T")[0] + "T00:00:00";
      console.log(start);
    }
    if (endDate != null) {
      end = endDate.toISOString().split("T")[0] + "T00:00:00";
    }
    var cur_date = new Date().toISOString().split(".")[0];
    console.log(cur_date)
    if (startDate == null && endDate != null) {
      start = "1997-01-01T00:00:00";
    } else if (startDate != null && endDate == null) {
      end = cur_date;
    } else if (startDate == null && endDate == null) {
      start = "1997-01-01T00:00:00";
        end = cur_date;
    }

    console.log("fetching data for map");
    fetchData(diseases, start, end);
  }, [selectedDiseases, startDate, endDate]);

  async function fetchData(diseases, start, end) {
    await getOccurrences(diseases, start, end)
      .then((res) => {
        // Set Max
        console.log(res.locations);
        var tempLocation = res.locations;
        var length = tempLocation.length;
        var tempMax = 1;
        //setMax(1);
        console.log(length);
        for (var i = 0; i < length; i++) {
          if (tempLocation[i]["cases"] > tempMax) {
            tempMax = tempLocation[i]["cases"];
            console.log("max " + tempMax);
          }
        }
        setMax(tempMax);
        setData(res.locations);
      })
  }

  const color = scaleLinear().domain([0, 5]).range(["#ffedea", "#ff5233"]);

  const selectCountry = (country) => {
    if (!(country == undefined)) {
      console.log(`country selected: ${country}`);
      setSelectedCountry(country);
    }
  };

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
      // following three lines align item to start
      width={800}
      height={400}
      style={{ width: "100%", height: "auto" }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {/* changed from >0 to >=0 so that map still loads when there is no data */}
      {data.length >= 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find(
                (s) => 
                  s["name"]
                    .toLowerCase()
                    .includes(geo.properties.NAME.toLowerCase()) ||
                  geo.properties.NAME.toLowerCase().includes(
                    s["name"].toLowerCase()
                  ) || geo.properties.NAME.toLowerCase().includes("congo") && s["name"].toLowerCase().includes("congo")
              );

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? color(d["cases"]) : "#F5F4F6"}
                  onClick={() => {
                    selectCountry(geo.properties.NAME);
                  }}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;
