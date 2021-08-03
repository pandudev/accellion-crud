import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { Fragment } from 'react'
import Spinner from '../../components/Spinner'

const Chart = () => {
    const [covidCases, setCovidCases] = useState([])
    const [selectedCase, setSelectedCase] = useState({})
    const [regions, setRegions] = useState([])
    const [chartOption, setChartOption] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = e => {
        setSelectedCase(covidCases.find(c => c.countryRegion === e.target.value))
    }

    const setOption = () => {
        const option = {
            title: {
                text: `Covid-19 Cases in ${selectedCase.countryRegion}`
            },
            legend: {
                icon: 'circle',
                right: 0,
                data: ['Confirmed', 'Recovered', 'Deaths', 'Active']
            },
            grid: {
                top: 60,
                right: 24,
                bottom: 56,
                left: 24,
                containLabel: true,
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: selectedCase.provinceStates?.map(ps => ps.provinceState),
                axisTick: {
                    show: false
                },
                axisLabel: {
                    rotate: selectedCase.provinceStates?.length > 1 ? 0 : 90
                }
            },
            series:
                [
                    {
                        name: 'Confirmed',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: selectedCase?.provinceStates?.map(ps => ps.confirmed),
                    },
                    {
                        name: 'Recovered',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: selectedCase?.provinceStates?.map(ps => ps.recovered),
                    },
                    {
                        name: 'Deaths',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: selectedCase?.provinceStates?.map(ps => ps.deaths),
                    },
                    {
                        name: 'Active',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: selectedCase?.provinceStates?.map(ps => ps.active),
                    },
                ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
        }

        setChartOption(option);
    }

    const dataTransform = (data) => {
        const countryRegions = [...new Set(data.map(d => d.countryRegion))];

        setRegions(countryRegions.sort())

        const cases = countryRegions.map(cr => {
            const provinces = data.filter(d => d.countryRegion === cr);

            if (provinces.length === 1 && provinces[0].provinceState === null) {
                provinces[0].provinceState = cr
            }

            return {
                countryRegion: cr,
                provinceStates: [...provinces],
            }
        })

        setSelectedCase(cases[0])
        setCovidCases(cases)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://covid19.mathdro.id/api/confirmed').then(res => dataTransform(res.data)).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (selectedCase) {
            setOption();
        }
    }, [selectedCase])


    return (
        <Fragment>
            {isLoading ? (<Spinner />) : null}
            <Container className='py-3'>
                <select value={selectedCase.countryRegion} onChange={handleSelect}>
                    {
                        regions.map((reg, k) => (<option key={k}>{reg}</option>))
                    }
                </select>
                <ReactECharts style={{ 'height': selectedCase.provinceStates?.length > 1 ? selectedCase.provinceStates?.length * 50 : 300 }}
                    option={chartOption} className='chart'
                />
                {/* <pre>
                {JSON.stringify(selectedCase, null, 2)}
            </pre> */}
            </Container>
        </Fragment>
    )
}

export default Chart
