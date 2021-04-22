import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import "bootstrap/dist/css/bootstrap.min.css";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {getCOVIDCases, getWorldCOVIDVaccination, getVaccinationPercentage} from './RequestData'
import moment from 'moment'
const CovidGraph = ({show, startDate, endDate, location}) => {
    const [totalCases, setTotalCases] = useState(0)
    const [totalDeaths, setTotalDeaths] = useState(0)
    const [totalRecovered, setTotalRecovered] = useState(0)
    const [covidData, setCovidData] = useState({cases: {}, recovered: {}, deaths: {}, timeline: {cases: {}, recovered: {}, deaths: {}}})
    const [cases, setCases] = useState([0,0,0,0,0,0])
    const [deaths, setDeaths] = useState([0,0,0,0,0,0])
    const [recovered, setRecovered] = useState([0,0,0,0,0,0])
    const [vaccinationPercentage, setVaccinationPercentage] = useState("...")
    const [worldVaccinationData, setWorldVaccinationData] = useState(0)
    const [xNum, setxNum] = useState(6)
    const [options, setOptions] = useState({
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Change in cases of COVID-19 over time'
        },
        series: [
          {
            data: [0,0,0,0,0,0],
            name: 'cases'
          },
          {
            data: [0,0,0,0,0,0],
            name: 'recovered'
          },
          {
            data: [0,0,0,0,0,0],
            name: 'deaths'
          }
        ]
      })
    useEffect(() => {
        async function getData() {
            var country = location
            if (country.toLowerCase() === 'world') {
                country = 'all'
            }
            console.log('getting covid data...')
            //setCovidData({cases: {}, recovered: {}, deaths: {}, timeline: {cases: {}, recovered: {}, deaths: {}}})
            const data = await getCOVIDCases(country)
            setCovidData(data)
            console.log('done getting covid data...')
        }
        getData()
    }, [location])
    useEffect(() => {
        console.log("start date/end date changed")
        var startYear, startMonth, startDay, startDateObj
        if (startDate) {
            startYear = parseInt(startDate.split('-')[0])
            startMonth = parseInt(startDate.split('-')[1])
            startDay = parseInt(startDate.split('-')[2])
            startDateObj = new Date (startYear, startMonth-1, startDay)
        }
        var endDateObj = new Date()
        var endYear, endMonth, endDay
        if (endDate) {
            endYear = parseInt(endDate.split('-')[0])
            endMonth = parseInt(endDate.split('-')[1])
            endDay = parseInt(endDate.split('-')[2])
            endDateObj = new Date (endYear, endMonth-1, endDay)
        }
        const minEndDate = moment(endDate).subtract(6, 'months').format('YYYY-MM-DD')
        if (moment(startDate).isBefore(minEndDate)) {
            setxNum(7)
        } else {
            setxNum(6)
        }
    }, [startDate, endDate])
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
                endDateObj = new Date(endYear, endMonth-1, endDay)
            }
            updateNumbers()
            getCases(endDateObj)
            getDeaths(endDateObj)
            getRecovered(endDateObj)
        }
        function updateNumbers() {
            const date = new Date()
            const dateString = moment(date).subtract(1, 'days').format('M/D/YY')
            console.log(covidData)
            if (location.toLowerCase() === 'world') {
                if (covidData.cases[dateString]) {
                    setTotalCases(covidData.cases[dateString])
                }
                if (covidData.recovered[dateString]) {
                    setTotalRecovered(covidData.recovered[dateString])
                }
                if (covidData.deaths[dateString]) {
                    setTotalDeaths(covidData.deaths[dateString])
                }
            } else {
                console.log(covidData.timeline)
                if (covidData.timeline) {
                    if (covidData.timeline.cases[dateString]) {
                        setTotalCases(covidData.timeline.cases[dateString])
                    }
                    if (covidData.timeline.recovered[dateString]) {
                        setTotalRecovered(covidData.timeline.recovered[dateString])
                    }
                    if (covidData.timeline.deaths[dateString]) {
                        setTotalDeaths(covidData.timeline.deaths[dateString])
                    }
                }
            }
        }
        function getCases(endDateObj) {
            const dateString = moment(endDateObj).subtract(1, 'days').format('M/D/YY')
            const date1 = moment(endDateObj).subtract(5, 'months').format('M/D/YY')
            const date2 = moment(endDateObj).subtract(4, 'months').format('M/D/YY')
            const date3 = moment(endDateObj).subtract(3, 'months').format('M/D/YY')
            const date4 = moment(endDateObj).subtract(2, 'months').format('M/D/YY')
            const date5 = moment(endDateObj).subtract(1, 'months').format('M/D/YY')
            var date0 = moment(startDate).format('M/D/YY')
            var mnth0 = 0, mnth1 = 0, mnth2 = 0, mnth3 = 0, mnth4 = 0, mnth5 = 0, mnth6 = 0
            if (location.toLowerCase() === 'world') {
                mnth1 = covidData.cases[date1]
                mnth2 = covidData.cases[date2]
                mnth3 = covidData.cases[date3]
                mnth4 = covidData.cases[date4]
                mnth5 = covidData.cases[date5]
                mnth6 = covidData.cases[dateString]
                if (xNum == 7) {
                    if (covidData.cases[date0]) {
                        mnth0 = covidData.cases[date0]
                    }
                }
            } else {
                mnth1 = covidData.timeline.cases[date1]
                mnth2 = covidData.timeline.cases[date2]
                mnth3 = covidData.timeline.cases[date3]
                mnth4 = covidData.timeline.cases[date4]
                mnth5 = covidData.timeline.cases[date5]
                mnth6 = covidData.timeline.cases[dateString]
                if (xNum == 7) {
                    if (covidData.timeline.cases[date0]) {
                        mnth0 = covidData.timeline.cases[date0]
                    }
                }
            }
            var caseNums = [mnth1, mnth2, mnth3, mnth4, mnth5, mnth6]
            if (xNum == 7) {
                caseNums.unshift(mnth0)
            }
            setCases(caseNums)
        }
        function getDeaths(endDateObj) {
            const dateString = moment(endDateObj).subtract(1, 'days').format('M/D/YY')
            const date1 = moment(endDateObj).subtract(5, 'months').format('M/D/YY')
            const date2 = moment(endDateObj).subtract(4, 'months').format('M/D/YY')
            const date3 = moment(endDateObj).subtract(3, 'months').format('M/D/YY')
            const date4 = moment(endDateObj).subtract(2, 'months').format('M/D/YY')
            const date5 = moment(endDateObj).subtract(1, 'months').format('M/D/YY')
            var date0 = moment(startDate).format('M/D/YY')
            var mnth0 = 0, mnth1 = 0, mnth2 = 0, mnth3 = 0, mnth4 = 0, mnth5 = 0, mnth6 = 0
            if (location.toLowerCase() === 'world') {
                mnth1 = covidData.deaths[date1]
                mnth2 = covidData.deaths[date2]
                mnth3 = covidData.deaths[date3]
                mnth4 = covidData.deaths[date4]
                mnth5 = covidData.deaths[date5]
                mnth6 = covidData.deaths[dateString]
                if (xNum == 7) {
                    if (covidData.deaths[date0]) {
                        mnth0 = covidData.deaths[date0]
                    }
                }
            } else {
                mnth1 = covidData.timeline.deaths[date1]
                mnth2 = covidData.timeline.deaths[date2]
                mnth3 = covidData.timeline.deaths[date3]
                mnth4 = covidData.timeline.deaths[date4]
                mnth5 = covidData.timeline.deaths[date5]
                mnth6 = covidData.timeline.deaths[dateString]
                if (xNum == 7) {
                    if (covidData.timeline.deaths[date0]) {
                        mnth0 = covidData.timeline.deaths[date0]
                    }
                }
            }
            var deathNums = [mnth1, mnth2, mnth3, mnth4, mnth5, mnth6]
            if (xNum == 7) {
                deathNums.unshift(mnth0)
            }
            setDeaths(deathNums)
        }
        function getRecovered(endDateObj) {
            const dateString = moment(endDateObj).subtract(1, 'days').format('M/D/YY')
            const date1 = moment(endDateObj).subtract(5, 'months').format('M/D/YY')
            const date2 = moment(endDateObj).subtract(4, 'months').format('M/D/YY')
            const date3 = moment(endDateObj).subtract(3, 'months').format('M/D/YY')
            const date4 = moment(endDateObj).subtract(2, 'months').format('M/D/YY')
            const date5 = moment(endDateObj).subtract(1, 'months').format('M/D/YY')
            var date0 = moment(startDate).format('M/D/YY')
            var mnth0 = 0, mnth1 = 0, mnth2 = 0, mnth3 = 0, mnth4 = 0, mnth5 = 0, mnth6 = 0
            if (location.toLowerCase() === 'world') {
                mnth1 = covidData.recovered[date1]
                mnth2 = covidData.recovered[date2]
                mnth3 = covidData.recovered[date3]
                mnth4 = covidData.recovered[date4]
                mnth5 = covidData.recovered[date5]
                mnth6 = covidData.recovered[dateString]
                if (xNum == 7) {
                    if (covidData.recovered[date0]) {
                        mnth0 = covidData.recovered[date0]
                    }
                }
            } else {
                mnth1 = covidData.timeline.recovered[date1]
                mnth2 = covidData.timeline.recovered[date2]
                mnth3 = covidData.timeline.recovered[date3]
                mnth4 = covidData.timeline.recovered[date4]
                mnth5 = covidData.timeline.recovered[date5]
                mnth6 = covidData.timeline.recovered[dateString]
                if (xNum == 7) {
                    if (covidData.timeline.recovered[date0]) {
                        mnth0 = covidData.timeline.recovered[date0]
                    }
                }
            }
            var recNums = [mnth1, mnth2, mnth3, mnth4, mnth5, mnth6]
            if (xNum == 7) {
                recNums.unshift(mnth0)
            }
            setRecovered(recNums)
        }
        try {
            getInfo()
        } catch {
            setTotalCases('Not enough information found')
        }
    }, [covidData])
    useEffect(() => {
        console.log("xNum: ", xNum)
        var endDateObj = new Date()
        if (endDate) {
            const endYear = parseInt(endDate.split('-')[0])
            const endMonth = parseInt(endDate.split('-')[1])
            const endDay = parseInt(endDate.split('-')[2].split('T')[0])
            endDateObj = new Date (endYear, endMonth, endDay)
        }
        const date0 = moment(startDate).format('YYYY-MM-DD')
        const date1 = moment(endDateObj).subtract(6, 'months').format('YYYY-MM-DD')
        const date2 = moment(endDateObj).subtract(5, 'months').format('YYYY-MM-DD')
        const date3 = moment(endDateObj).subtract(4, 'months').format('YYYY-MM-DD')
        const date4 = moment(endDateObj).subtract(3, 'months').format('YYYY-MM-DD')
        const date5 = moment(endDateObj).subtract(2, 'months').format('YYYY-MM-DD')
        const date6 = endDate.split('T')[0]
        var graphOpts = {
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
        // if start date before graph
        if (xNum == 7) {
            graphOpts.xAxis.categories.unshift(date0)
        }
        setOptions(graphOpts)
    }, [cases, recovered, deaths, xNum, startDate, endDate])
    useEffect(() => {
        async function getVaccinationInfo() {
            var percentage = 0
            if (location.toLowerCase() === 'world') {
                const res = await getWorldCOVIDVaccination()
                setWorldVaccinationData(res)
            } else {
                percentage = await getVaccinationPercentage(location)
                if (percentage === 'n/a') {
                    percentage = null
                }
            }
            setVaccinationPercentage(percentage)
        }
        getVaccinationInfo()
      }, [location])
    useEffect(() => {
        const date = new Date()
        const dateString = moment(date).subtract(1, 'days').format('M/D/YY')
        var totalVaccinations = worldVaccinationData[dateString]
        setVaccinationPercentage(((totalVaccinations/7900000000)*100).toFixed(2))
    }, [worldVaccinationData])
    return (
        <Container 
            className="justify-content-md-center" 
            style={{
                margin: '5px', 
                display: show
            }}>
            <Row className="justify-content-md-center">
                💉 {(vaccinationPercentage) ? 'COVID-19 Vaccination Percentage: ' + vaccinationPercentage + '%' : 'Could not find COVID-19 vaccination percentage'}
            </Row>
            <Row className="justify-content-md-center">
                🦠 Cases: {totalCases}
            </Row>
            <Row className="justify-content-md-center">
                💀 Deaths: {totalDeaths}
            </Row>
            <Row className="justify-content-md-center">
                🏃 Recovered: {totalRecovered}
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