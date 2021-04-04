import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import axios from 'axios'
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([1, 25])
  .range(["#ffedea", "#ff5233"]);

const MapChart = ({
  selectedDiseases,
  startDate,
  endDate } ) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    var diseases = selectedDiseases.join(', ');
    var start = '';
    var end = '';
    if  (startDate != null) {
      start = startDate.toISOString().split("T")[0] + "T00:00:00";
      console.log(start)
    }
    if (endDate != null) {
      end = endDate.toISOString().split("T")[0] + "T00:00:00";
    }
    //console.log(start)

    //var mydata = [{'name': 'Ukraine', 'heat' : 25}, {'name' : 'Australia', 'heat' : 100}, {'name' : 'united', 'heat' : 100}, {'name' : 'Africa', 'heat' : 100}];
    if (startDate != null && endDate != null) {
    axios.get('http://52.87.94.130:5000/occurrences?keyTerms=' + diseases +'&startDate=' +start +'&endDate=' +end)
      .then(res => {
        // Set Max
        const mydata = res.data;
        setData(mydata.locations);
      })
    //csv(`/vulnerability.csv`).then((data) => {
    //});
    } else if (startDate != null && endDate == null) {
      axios.get('http://52.87.94.130:5000/occurrences?keyTerms=' + diseases +'&startDate=' +start)
      .then(res => {
        // Set Max
        const mydata = res.data;
        setData(mydata.locations);
      })
    } else if (startDate == null && endDate != null) {

      axios.get('http://52.87.94.130:5000/occurrences?keyTerms=' + diseases +'&startDate=1997-01-01T00:00:00' +'&endDate=' +end)
      .then(res => {
        const mydata = res.data;
        setData(mydata.locations);
      })
    }
  }, [selectedDiseases, startDate, endDate]);

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s['name'].toLowerCase().includes(geo.properties.NAME.toLowerCase()) || geo.properties.NAME.toLowerCase().includes(s['name'].toLowerCase()) );
             
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d['occurrences']) : "#F5F4F6"}
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