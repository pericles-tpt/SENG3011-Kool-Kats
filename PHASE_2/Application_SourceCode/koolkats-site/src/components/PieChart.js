import React from 'react';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'



class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ data: this.props.data })
        }, 1000);
    }

    shouldComponentUpdate() {
        if (this.state.data != this.props.data) {
            return true
        } else {
            return false
        }
    }

    render() {
        const sss = {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: false,
                    alpha: 45,
                    beta: 0,
                }
            },
            title: {
                text: null,
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    depth: 20,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            colors: ['#0DD9D4', '#D62222', '#95D94C'],
            credits: {
                enabled: false
            },
            series: [{
                type: 'pie',
                name: 'persentage',
                data: this.state.data
            }]
        };

        return (
            <HighchartsReact highcharts={Highcharts} options={sss} />
        )
    }
}
export default PieChart;