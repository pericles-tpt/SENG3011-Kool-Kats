import React, { Component, setState } from 'react';
import { Link } from "react-router-dom";
import PieChart from "./PieChart";
import "./Information.css"

class Information extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: "world",
            data: [
                ['x1', 70.0],
                ['x2', 30.0],
            ]
        }
    }

    handleClick = () => {
        this.setState({ country: this.props.country })
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ country: this.props.country })
        }, 1000);
    }

    shouldComponentUpdate() {
        if (this.state.country != this.props.country) {
            return true
        } else {
            return false
        }
    }

    render() {

        return (
            <div className="divOutline">
                <h1>Information</h1>
                <text>Country: {this.state.country}</text>

                <div><PieChart data={this.state.data}/></div>

                <button onClick={this.handleClick}>Refresh</button>

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