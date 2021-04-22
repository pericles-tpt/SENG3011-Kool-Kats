import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {getDisease} from './RequestData'
const ChangeInCasesOverTime = ({show, startDate, endDate, location, disease}) => {
    const [showChart, setShowChart] = useState('block')
    const [cases, setCases] = useState([])
    const [numValues, setNumValues] = useState(5)
    useEffect(() => {
        if (show) {
            setShowChart('block')
        } else {
            setShowChart('none')
        }
    }, [show])
    useEffect(() => {
        async function getInfo() {
            console.log(startDate, endDate)
            var endYear = new Date().getFullYear()
            var endMonth = new Date().getMonth()
            var endDay = new Date().getDate()
            if (endDate) {
                endYear = parseInt(endDate.split('-')[0])
                endMonth = parseInt(endDate.split('-')[1])
                endDay = parseInt(endDate.split('-')[2].split('T')[0])
            }
            console.log(endYear, endMonth, endDay)
            var country = location
            if (location.toLowerCase() === 'world') {
                country = null
            } 
            const startYear = parseInt(startDate.split('-')[0])
            const startMonth = parseInt(startDate.split('-')[1])
            const startDay = parseInt(startDate.split('-')[2])
            console.log("================")
            console.log(`startYear: ${startYear + 1}, startMonth: ${startMonth}, startDay: ${startDay}`)
            console.log((new Date(startYear+1, startMonth-1, startDay)).toISOString())
            const start = await getDisease(startDate, new Date(startYear+1, startMonth-1, startDay).toISOString(), disease, country)
            const yr1 = await getDisease(startDate, new Date(endYear-5, endMonth-1, endDay).toISOString(), disease, country)
            const yr2 = await getDisease(startDate, new Date(endYear-4, endMonth-1, endDay).toISOString(), disease, country)
            const yr3 = await getDisease(startDate, new Date(endYear-3, endMonth-1, endDay).toISOString(), disease, country)
            const yr4 = await getDisease(startDate, new Date(endYear-2, endMonth-1, endDay).toISOString(), disease, country)
            const yr5 = await getDisease(startDate, new Date(endYear-1, endMonth-1, endDay).toISOString(), disease, country)
            const yr6 = await getDisease(startDate, endDate, disease, location)
            const currCases = await getDisease(startDate, new Date().toISOString(), disease, country)
            const stats = [start, yr1, yr2, yr3, yr4, yr5, yr6]
            var opts = {
                chart: {
                    type: 'spline'
                },
                credits: {
                    enabled: false,
                },
                title: {
                    text: 'Change in cases of diseases over time'
                },
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: startYear
                },
                xAxis: {
                    title: {
                        text: 'Year'
                    },
                    categories: [endYear-5, endYear-4, endYear-3, endYear-2, endYear-1, endYear]
                },
                yAxis: {
                    title: {
                        text: 'Number of Cases'
                    }
                },
                series: []
            }
            var values = 5
            if (endYear != 2021) {
                opts.xAxis.categories.push(2021)
                values += 1
            }
            if (startYear < endYear-5) {
                opts.xAxis.categories.unshift(startYear)
                values += 1
            }
            setNumValues(values)
            var dict = {}
            console.log(stats)
            for (var stat in stats) {
                for (var indx in stats[stat]) {
                    const diseaseName = stats[stat][indx].name
                    if (diseaseName in dict) {
                        dict[diseaseName].push(stats[stat][indx].cases)
                    } else {
                        dict[diseaseName] = [stats[stat][indx].cases]
                    }
                    
                }
            }
            console.log(dict)
            for (var key in dict) {
                if (key === '') {
                    continue
                }
                while (dict[key].length < numValues) {
                    dict[key].push(dict[key][dict[key].length-1])
                }
                opts.series.push({name: key, data: dict[key]})
            }
            for (var dis in disease) {
                if (dis === '') {
                    continue
                }
                if (!(disease[dis] in dict)) {
                    var ddata = []
                    while (ddata.length < numValues) {
                        ddata.push(0)
                    }
                    opts.series.push({name: disease[dis], data: ddata})
                }
            }
            setOptions(opts)
        }
        try {
            getInfo()
        } catch {
            setCases('Not enough information found')
        }
    }, [disease, startDate, endDate, location])
    const [options, setOptions] = useState({
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Change in cases of diseases over time'
        },
        series: [
          {
            data: [0,0,0,0,0,0,0],
            name: disease
          }
        ]
      })
    return (
        <Container 
            className="justify-content-md-center" 
            style={{
                margin: '5px', 
                display: showChart
            }}>
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

export default ChangeInCasesOverTime;