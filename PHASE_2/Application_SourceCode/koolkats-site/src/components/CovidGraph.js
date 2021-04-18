import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import "bootstrap/dist/css/bootstrap.min.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {getCOVIDCases, crdInRange} from './RequestData'
import moment from 'moment'
const CovidGraph = ({show, startDate, endDate, location}) => {
    const [totalCases, setTotalCases] = useState(0)
    const [totalDeaths, setTotalDeaths] = useState(0)
    const [totalRecovered, setTotalRecovered] = useState(0)
    const [covidData, setCovidData] = useState({})
    const [cases, setCases] = useState([0,0,0,0,0,0])
    const [deaths, setDeaths] = useState([0,0,0,0,0,0])
    const [recovered, setRecovered] = useState([0,0,0,0,0,0])
    const [options, setOptions] = useState({
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Change in cases of COVID-19 over time'
        },
        series: [
          {
            data: [1, 2, 1, 4, 3, 6],
            name: 'series-1'
          }
        ]
      })
    useEffect(() => {
        async function getData() {
            var country = location
            if (country.toLowerCase() === 'world') {
                country = 'all'
            }
            const data = await getCOVIDCases(country)
            setCovidData(data)
        }
        getData()
    }, [startDate, endDate, location])
    useEffect(() => {
        async function getInfo() {
            var endDateObj = new Date()
            var endYear = endDateObj.getFullYear()
            var endMonth = endDateObj.getMonth()
            var endDay = endDateObj.getDate()
            if (endDate) {
                endYear = parseInt(endDate.split('-')[0])
                endMonth = parseInt(endDate.split('-')[1])
                endDay = parseInt(endDate.split('-')[2].split('T')[0])
                endDateObj = new Date(endYear, endMonth, endDay)
            }
            var country = location
            if (location.toLowerCase() === 'world') {
                country = 'all'
            } 
            setTotalCases(crdInRange(covidData, country, '2020-01-22', new Date().toISOString().split('T')[0], 0))
            setRecovered(crdInRange(covidData, country, '2020-01-22', new Date().toISOString().split('T')[0], 1))
            setDeaths(crdInRange(covidData, country, '2020-01-22', new Date().toISOString().split('T')[0], 2))
            getCases(endDateObj)
            getDeaths(endDateObj)
            getRecovered(endDateObj)
        }
        async function getCases(endDateObj) {
            const date1 = moment(endDateObj).subtract(5, 'months').format('YYYY-MM-DD')
            const date2 = moment(endDateObj).subtract(4, 'months').format('YYYY-MM-DD')
            const date3 = moment(endDateObj).subtract(3, 'months').format('YYYY-MM-DD')
            const date4 = moment(endDateObj).subtract(2, 'months').format('YYYY-MM-DD')
            const date5 = moment(endDateObj).subtract(1, 'months').format('YYYY-MM-DD')
            const mnth1 = crdInRange(covidData, location, startDate, date1, 0)
            const mnth2 = crdInRange(covidData, location, startDate, date2, 0)
            const mnth3 = crdInRange(covidData, location, startDate, date3, 0)
            const mnth4 = crdInRange(covidData, location, startDate, date4, 0)
            const mnth5 = crdInRange(covidData, location, startDate, date5, 0)
            const mnth6 = crdInRange(covidData, location, startDate, endDateObj.toISOString().split('T')[0], 0)
            setCases([mnth1, mnth2, mnth3, mnth4, mnth5, mnth6])

        }
        async function getDeaths(endDateObj) {
            const date1 = moment(endDateObj).subtract(5, 'months').format('YYYY-MM-DD')
            const date2 = moment(endDateObj).subtract(4, 'months').format('YYYY-MM-DD')
            const date3 = moment(endDateObj).subtract(3, 'months').format('YYYY-MM-DD')
            const date4 = moment(endDateObj).subtract(2, 'months').format('YYYY-MM-DD')
            const date5 = moment(endDateObj).subtract(1, 'months').format('YYYY-MM-DD')
            const mnth1 = crdInRange(covidData, location, startDate, date1, 2)
            const mnth2 = crdInRange(covidData, location, startDate, date2, 2)
            const mnth3 = crdInRange(covidData, location, startDate, date3, 2)
            const mnth4 = crdInRange(covidData, location, startDate, date4, 2)
            const mnth5 = crdInRange(covidData, location, startDate, date5, 2)
            const mnth6 = crdInRange(covidData, location, startDate, endDateObj.toISOString().split('T')[0], 2)
            setDeaths([mnth1, mnth2, mnth3, mnth4, mnth5, mnth6])
        }
        async function getRecovered(endDateObj) {
            const date1 = moment(endDateObj).subtract(5, 'months').format('YYYY-MM-DD')
            const date2 = moment(endDateObj).subtract(4, 'months').format('YYYY-MM-DD')
            const date3 = moment(endDateObj).subtract(3, 'months').format('YYYY-MM-DD')
            const date4 = moment(endDateObj).subtract(2, 'months').format('YYYY-MM-DD')
            const date5 = moment(endDateObj).subtract(1, 'months').format('YYYY-MM-DD')
            const mnth1 = crdInRange(covidData, location, startDate, date1, 1)
            const mnth2 = crdInRange(covidData, location, startDate, date2, 1)
            const mnth3 = crdInRange(covidData, location, startDate, date3, 1)
            const mnth4 = crdInRange(covidData, location, startDate, date4, 1)
            const mnth5 = crdInRange(covidData, location, startDate, date5, 1)
            const mnth6 = crdInRange(covidData, location, startDate, endDateObj.toISOString().split('T')[0], 1)
            setRecovered([mnth1, mnth2, mnth3, mnth4, mnth5, mnth6])
        }
        try {
            getInfo()
        } catch {
            setTotalCases('Not enough information found')
        }
    }, [covidData])
    useEffect(() => {
        var endDateObj = new Date()
        var endYear = endDateObj.getFullYear()
        var endMonth = endDateObj.getMonth()
        var endDay = endDateObj.getDate()
        if (endDate) {
            endYear = parseInt(endDate.split('-')[0])
            endMonth = parseInt(endDate.split('-')[1])
            endDay = parseInt(endDate.split('-')[2].split('T')[0])
            endDateObj = new Date (endYear, endMonth, endDay)
        }
        const date1 = moment(endDateObj).subtract(6, 'months').format('YYYY-MM-DD')
        const date2 = moment(endDateObj).subtract(5, 'months').format('YYYY-MM-DD')
        const date3 = moment(endDateObj).subtract(4, 'months').format('YYYY-MM-DD')
        const date4 = moment(endDateObj).subtract(3, 'months').format('YYYY-MM-DD')
        const date5 = moment(endDateObj).subtract(2, 'months').format('YYYY-MM-DD')
        const date6 = endDate.split('T')[0]
        var opts = {
            chart: {
                type: 'spline'
            },
            credits: {
                enabled: false,
            },
            title: {
                text: 'Change in cases of COVID-19 over time'
            },
            xAxis: {
                title: {
                    text: 'Date'
                },
                type: 'datetime', 
                categories: [date1, date2, date3, date4, date5, date6]
            },
            yAxis: {
                title: {
                    text: 'Number of Cases'
                }
            },
            series: [{
                name: 'Cases',
                data: cases
            },
            {
                name: 'Deaths',
                data: deaths
            },
            {
                name: 'Recovered',
                data: recovered
            }]
        }
        setOptions(opts)
    }, [cases, recovered, deaths])
    return (
        <Container 
            className="justify-content-md-center" 
            style={{
                margin: '5px', 
                display: show
            }}>
            <Row className="justify-content-md-center">
                Total Cases: {totalCases}
            </Row>
            <Row className="justify-content-md-center">
                Total Deaths: {totalDeaths}
            </Row>
            <Row className="justify-content-md-center">
                Total Recovered: {totalRecovered}
            </Row>
            <Row className="justify-content-md-center">
            <div
                style={{
                    width: '400px',
                    height: '300px'
                }}
            >
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            </Row>
        </Container>
    )
}

export default CovidGraph;