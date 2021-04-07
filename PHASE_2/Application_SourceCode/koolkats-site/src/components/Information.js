import React, { Component, setState } from 'react';
import { Link } from "react-router-dom";
import PieChart from "./PieChart";
import "./Information.css"
import axios from 'axios'


//bug 1: In the pie chart, different diseases for the same country will show separately
//bug 2: cannot select country(only showing the whole world)
//bug 3: It may keep fetching data when the website is running
class Information extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: "world",
            selectedDiseases: [],
            startDate: null,
            endDate: null,
            fetchData: null,
            data: [],
            oldData: []
        }

        axios.get('http://52.87.94.130:5000/occurrences?keyTerms=')
            .then(res => {
                this.setState({ fetchData: res.data })
            })
    }


    componentDidMount() {
        setInterval(() => {
            this.setState({
                country: this.props.country,
                selectedDiseases: this.props.diseases.join(', '),
                startDate: this.props.startDate != null ? this.props.startDate.toISOString().split("T")[0] + "T00:00:00" : null,
                endDate: this.props.endDate != null ? this.props.endDate.toISOString().split("T")[0] + "T00:00:00" : null,
                data: this.fetchData(this.state.selectedDiseases, this.state.startDate, this.state.endDate)
            })
        }, 2000);
    }

    shouldComponentUpdate() {
        if (this.state.oldData != this.state.data) {
            this.setState({
                oldData: this.state.data
            })
            return true
        } else {
            return false
        }
    }

    fetchData(selectedDiseases, startDate, endDate) {
        if (startDate != null && endDate != null) {
            axios.get('http://52.87.94.130:5000/occurrences?keyTerms=' + this.state.selectedDiseases + '&startDate=' + this.state.startDate + '&endDate=' + this.state.endDate)
                .then(res => {
                    this.setState({ fetchData: res.data })
                })
        } else if (startDate != null) {
            axios.get('http://52.87.94.130:5000/occurrences?keyTerms=' + this.state.selectedDiseases + '&startDate=' + this.state.startDate)
                .then(res => {
                    this.setState({ fetchData: res.data })
                })
        } else if (endDate != null) {
            axios.get('http://52.87.94.130:5000/occurrences?keyTerms=' + this.state.selectedDiseases + '&endDate=' + this.state.endDate)
                .then(res => {
                    this.setState({ fetchData: res.data })
                })
        } else {
            axios.get('http://52.87.94.130:5000/occurrences?keyTerms=' + this.state.selectedDiseases)
                .then(res => {
                    this.setState({ fetchData: res.data })
                })
        }


        console.log(this.state.fetchData)
        if (this.state.fetchData == null) {
            return null
        }

        var data = []
        for (var i = 0; i < this.state.fetchData.locations.length; i++) {
            var tempData = [this.state.fetchData.locations[i].name, this.state.fetchData.locations[i].occurrences];
            data.push(tempData);
        }
        return data
    }

    render() {

        return (
            <div className="divOutline">
                <h1>Information</h1>
                <p>Country: {this.state.country}</p>
                <p>selectedDiseases: {this.state.selectedDiseases}</p>
                <p>startDate: {this.state.startDate}</p>
                <p>endDate: {this.state.endDate}</p>

                <div><PieChart data={this.state.data}/></div>

                <div>
                    <Link to="/Watch" className="info-links">
                        View related articles
                    </Link>
                </div>
            </div>
        );

    }
}


    export default Information