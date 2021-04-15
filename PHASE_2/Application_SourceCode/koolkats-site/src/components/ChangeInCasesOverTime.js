import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {getDisease} from './RequestData'
const ChangeInCasesOverTime = ({show, startDate, endDate, location, disease}) => {
    const [change, setChange] = useState('')
    const [showChart, setShowChart] = useState('none')
    useEffect(() => {
        console.log(show)
        if (showChart === 'block') {
            setShowChart('none')
        } else {
            setShowChart('block')
        }
        console.log(showChart)
    }, [show])
    useEffect(() => {
        async function getInfo() {
            // get cases in 5 year
            const yr1 = await getDisease(startDate, endDate, disease, location)
            const yr2 = await getDisease(startDate, endDate, disease, location)
            const yr3 = await getDisease(startDate, endDate, disease, location)
            const yr4 = await getDisease(startDate, endDate, disease, location)
            const yr5 = await getDisease(startDate, endDate, disease, location)
            const yr6 = await getDisease(startDate, endDate, disease, location)
            // 
            console.log(yr5)
            setChange('')
            setOptions({
                chart: {
                  type: 'spline'
                },
                title: {
                  text: 'Change in cases of ' + disease + 'over time'
                },
                series: [
                  {
                    data: [yr1, yr2, yr3, yr5, yr6]
                  }
                ]
            })
        }
        try {
            getInfo()
        } catch {
            setChange('Not enough information found')
        }
    }, [disease, startDate, endDate, location])
    const [options, setOptions] = useState({
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Change in cases of ' + disease + 'over time'
        },
        series: [
          {
            data: [1, 2, 1, 4, 3, 6]
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