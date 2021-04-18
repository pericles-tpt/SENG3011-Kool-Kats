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
import { getOccurrences, getCOVIDCasesCountries } from "./RequestData";
import { time } from "highcharts";

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
    var covid = false;
    for (var j = 0; j < selectedDiseases.length; j++) {
      if (selectedDiseases[j] === "COVID-19") {
        covid = true;
      }
    }
    fetchData(diseases, start, end, covid);
  }, [selectedDiseases, startDate, endDate]);

  async function fetchData(diseases, start, end, covid) {
    var results = await getOccurrences(diseases, start, end)
      .then((res) => {
        // Set Max
        //console.log(res.locations);
        var tempLocation = res.locations;
        var length = tempLocation.length;
        var tempMax = 1;
        //setMax(1);
        //console.log(length);
        for (var i = 0; i < length; i++) {
          if (tempLocation[i]["cases"] > tempMax) {
            tempMax = tempLocation[i]["cases"];
            console.log("max " + tempMax);
          }
        }
        setMax(tempMax);
        setData(res.locations);
        var countries = [];
        for (var i = 0; i < length; i++) {
          countries[i] = tempLocation[i]["name"];
        }
        console.log(tempLocation);
        console.log(countries);
        var countriesQuery = countries.join(",");
        console.log(countriesQuery);
        const date1 = start;
        const date2 = end;

        const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000;

        const diffInMilliseconds = new Date(date1).getTime() - new Date(date2).getTime();
        const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS;
        var noDays = Math.floor(Math.abs(diffInDays));
        var results = {'Days': noDays, 'Countries': countriesQuery};
        return results;
        
      });
      var countriesQuery = results['Countries'];
      var noDays = results['Days'];
      if (covid) {
        await getCOVIDCasesCountries(countriesQuery, noDays).then(res => {
            //console.log(res);
            var timeline_length = res.length;
            var timeline = {};
            if (timeline_length > 1) {
              for (var i = 0; i < timeline_length; i++) {
                
                if (!(res[i] == null)) {
                  //console.log(res[i]);
                  timeline[res[i]['country']] = res[i]['timeline']['cases'];
                  //timeline.push(res[i]['timeline']['cases']);
                }
              }
          } else {
            timeline[res[0]['country']] = res[0]['timeline']['cases'];
          }

            // Get total
            var total = 0;
            var total_length = timeline.length;
            for (var key in timeline) {
              var cases_length = timeline[key];
              var total = 0;
              for (var time in timeline[key]) {
                total += timeline[key][time];
              }
              timeline[key]['total'] = total;
              
            }
            console.log(timeline);
          
          var new_data = data;
          console.log(new_data);

            for (var d in timeline) {
              var length = new_data.length;
              if (!(d == undefined)) {
                var Found = false;
              for (var i = 0; i < length; i++) {
                //console.log(new_data[i]["name"])
                if (new_data[i]["name"].toLowerCase() === d.toLowerCase() || new_data[i]["name"].toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(new_data[i]["name"].toLowerCase())) {
                  console.log('Country ' + d + timeline[d]['total']);
                  new_data[i]["cases"] += timeline[d]['total'];
                  Found = true;
                }
              }
              // Handle the case the country wasn't found
              if (!Found) {
                console.log('Country ' + d + timeline[d]['total']);
                var list_item = {};
                list_item["name"] = d;
                list_item["cases"] = timeline[d]["total"];
                new_data.push(list_item);
              }
            }
            // Get data
            setData(new_data);
          }
        });
      }
  }

  const color = scaleLinear().domain([0, 3]).range(["#ffedea", "#ff5233"]);

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
