import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PieChart from "./PieChart";
import "./Information.css";
import axios from "axios";

//bug 1: In the pie chart, different diseases for the same country will show separately
//bug 2: cannot select country(only showing the whole world)
//bug 3: It may keep fetching data when the website is running
function Information({ diseases, startDate, endDate, country }) {
  // axios.get('http://52.87.94.130:5000/occurrences?keyTerms=')
  //     .then(res => {
  //         this.setState({ fetchData: res.data })
  //     })

  const [startDateString, setStartDateString] = useState("");
  const [endDateString, setEndDateString] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    startDate
      ? setStartDateString(startDate.toISOString().split("T")[0] + "T00:00:00")
      : setStartDateString("1997-01-01T00:00:00");
  }, [startDate]);

  useEffect(() => {
    console.log(startDate);
    endDate
      ? setEndDateString(endDate.toISOString().split("T")[0] + "T00:00:00")
      : setEndDateString("1997-01-01T00:00:00");
  }, [endDate]);

  useEffect(() => {
    fetchData();
  }, [startDateString, endDateString, diseases, country]);

  function fetchData() {
    console.log("fetching data for graph");
    const request =
      "http://52.87.94.130:5000/occurrences?keyTerms=" +
      diseases +
      "&startDate=" +
      startDateString +
      "&endDate=" +
      endDateString;
    console.log(request);
    {
      axios
        .get(request)
        .then((res) => {
          console.log(res);
          // setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="divOutline">
      <h1>Information</h1>
      <p>Country: {country}</p>
      <p>Selected Diseases: {diseases.join(", ")}</p>
      <p>Start Date: {startDateString.replace("T", " ")}</p>
      <p>End Date: {endDateString.replace("T", " ")}</p>

      <div>
        <PieChart data={data} />
      </div>
      {data}
      <div>
        <Link to="/Watch" className="info-links">
          View related articles
        </Link>
      </div>
    </div>
  );
}

//   componentDidMount() {
//     // setInterval(() => {
//     //     this.setState({
//     //         country: this.props.country,
//     //         selectedDiseases: this.props.diseases.join(', '),
//     //         startDate: this.props.startDate != null ? this.props.startDate.toISOString().split("T")[0] + "T00:00:00" : null,
//     //         endDate: this.props.endDate != null ? this.props.endDate.toISOString().split("T")[0] + "T00:00:00" : null,
//     //         data: this.fetchData(this.state.selectedDiseases, this.state.startDate, this.state.endDate)
//     //     })
//     // }, 2000);
//     console.log("component did mount");
//     this.setState({
//       country: this.props.country,
//       selectedDiseases: this.props.diseases.join(", "),
//       startDate:
//         this.props.startDate != null
//           ? this.props.startDate.toISOString().split("T")[0] + "T00:00:00"
//           : null,
//       endDate:
//         this.props.endDate != null
//           ? this.props.endDate.toISOString().split("T")[0] + "T00:00:00"
//           : null,
//     //   data: this.fetchData(
//     //     this.state.selectedDiseases,
//     //     this.state.startDate,
//     //     this.state.endDate
//     //   ),
//     });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log("map component did update triggered");
//     console.log(prevProps);
//     console.log(prevState);
//   }

//   shouldComponentUpdate() {
//     if (this.state.oldData != this.state.data) {
//       this.setState({
//         oldData: this.state.data,
//       });
//       return true;
//     } else {
//       return false;
//     }
//   }

//     console.log(this.state.fetchData);
//     if (this.state.fetchData == null) {
//       return null;
//     }

//     var data = [];
//     for (var i = 0; i < this.state.fetchData.locations.length; i++) {
//       var tempData = [
//         this.state.fetchData.locations[i].name,
//         this.state.fetchData.locations[i].occurrences,
//       ];
//       data.push(tempData);
//     }
//     return data;
//   }
//   render() {
//     return (
//       <div className="divOutline">
//         <h1>Information</h1>
//         <p>Country: {this.props.country}</p>
//         <p>Selected Diseases: {this.state.selectedDiseases}</p>
//         <p>
//           Start Date:{" "}
//           {this.state.startDate
//             ? this.state.startDate.replace("T", " ")
//             : "1997-01-01 00:00:00"}
//         </p>
//         <p>
//           End Date:{" "}
//           {this.state.endDate
//             ? this.state.endDate.replace("T", " ")
//             : "2022-01-01 00:00:00"}
//         </p>

//         <div>
//           <PieChart data={this.state.data} />
//         </div>

//         <div>
//           <Link to="/Watch" className="info-links">
//             View related articles
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

export default Information;
