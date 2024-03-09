import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = () => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    // prettier-ignore
    let dataAxis = ['میهن', 'مپنا', 'پتروشیمی بندرعباس', 'فولاد اصفهان', 'پدیده', 'ایران خودرو', 'سایپا', 'کاله', 'فراز', 'اوج', 'بصیر', 'ازادی', 'نساجی', 'صنعت یزد', 'فردا موتور', 'کویر'];
    // prettier-ignore
    let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334];
    let yMax = 500;
    let dataShadow = [];

    for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    const option = {
        xAxis: {
            data: dataAxis,
            axisLabel: {
                inside: true,
                color: 'black'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999'
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                data: data
            }
        ]
    };

    useEffect(() => {
        let myChart :any;
        if (chartRef.current && echarts.getInstanceByDom(chartRef.current)) {
            myChart = echarts.getInstanceByDom(chartRef.current);
            myChart.dispose();
        }
        if (chartRef.current) {
            myChart = echarts.init(chartRef.current);
            myChart.setOption(option);
        }
    }, []);

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default BarChart;
