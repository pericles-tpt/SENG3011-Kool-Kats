import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PieChart from "./PieChart";
import "./Information.css"

class Information extends Component {
    constructor() {
        super()
        this.state = {
            Country: "World",
            loading: false,
            searchedResults: [],
            searchedYet: false,
            foundResult: false
        }
    }

    render() {

        return (
            <div className="divOutline">
                <h1>Information</h1>
                <text>Country: </text>
                <text>World</text>

                <div><PieChart /></div>

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