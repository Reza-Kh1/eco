import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
type InfoChart = {
    name: string,
    valueArray: number[]
}
type FunctionType = {
    data: any,
    year: {
        in: string
        to: string
    }
}
const NormalChart = ({ data, year }: FunctionType) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const colors = ['rgb(84, 112, 195)', 'rgb(238, 102, 102)', 'rgb(34, 216, 48)', 'rgb(216, 136, 34)', 'rgb(170, 49, 255)'];
    const timeYear = ["1394", "1395", "1396", "1397", "1398", "1399", "1400", "1401", "1402", "1403"]
    const optionBar = (data: any, yearArray: string[], nameChartY: string) => {
        const option = {
            color: colors,
            tooltip: {
                trigger: 'axis',
                position: function (pt: any) {
                    return [pt[0] + 10, pt[1] - 80];
                },
                confine: true,
                formatter: function (params: any) {
                    let result = `<div class="tooltip-normalchart">سال ${Number(params[0].name).toLocaleString("fa").replace(/٬/g, "")}`;
                    params.forEach((s: any) => {
                        let value = Number(s.value).toLocaleString("fa") ? Number(s.value).toLocaleString("fa") : "---";
                        result += `<br/><span style="display: inline-block; background-color: ${s.color}; width: 10px; height: 10px; border-radius: 50%; margin-left: 10px;"></span><span style="color: ${s.color}">${s.seriesName}</span> : ${value}`;
                    });
                    result += '</div>';
                    return result;
                }
            },
            legend: {},
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    data: yearArray,
                    name: "سال",
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },                    
                    nameTextStyle: {
                        fontFamily: "iransans",
                        fontSize: "14px",
                    },
                },
            ],
            yAxis: [
                {
                    splitNumber: 10,
                    name: nameChartY,
                    type: 'value',
                    nameLocation: "end",
                    nameTextStyle: {
                        fontFamily: "iransans",
                        fontSize: "13px",
                        padding: nameChartY === "نفر" || nameChartY === "دلار" ? [0, 35, 10, 0] : [0, 60, 10, 0]
                    }
                },
            ],
            series: data
        };
        let myChart: any;
        if (chartRef.current && echarts.getInstanceByDom(chartRef.current)) {
            myChart = echarts.getInstanceByDom(chartRef.current);
            myChart.dispose();
        }
        if (chartRef.current) {
            myChart = echarts.init(chartRef.current);
            myChart.setOption(option);
        }
        myChart.setOption(option);
        myChart.on('click', (params: any) => {
            if (params.componentType === 'series') {
                const { dataIndex, componentIndex, seriesName } = params;
                const yData = data[componentIndex].data
                const colorChoice = colors[componentIndex].replace(/\)/g, "")
                changeComponents(dataIndex, yData, colorChoice, seriesName)
            }
        });
        const changeComponents = (dataIndex: number, yData: string[], color: string, name: string) => {
            const subarray = yData.slice(0, dataIndex + 1);
            const sum = subarray.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
            const transparencySteps = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5];
            const recursiveAddArea = (index: any) => {
                if (index < transparencySteps.length) {
                    addAreaWithTransparency(transparencySteps[index], dataIndex, sum, color, name);
                    setTimeout(() => recursiveAddArea(index + 1), 50);
                }
            };
            recursiveAddArea(0);
        }
        const addAreaWithTransparency = (transparency: number, dataIndex: number, sum: number, colors: string, name: string) => {
            if (dataIndex === 0) {
                option.series[0].markArea.itemStyle = {}
                option.series[0].markArea.data = []
            }
            else {
                option.series[0].markArea.itemStyle = {
                    color: `${colors}, ${transparency})`
                }
                option.series[0].markArea.data = [
                    [
                        {
                            name: `${name} --  ${(sum).toFixed(3)}`,
                            xAxis: yearArray[0]
                        },
                        {
                            xAxis: yearArray[dataIndex]
                        }
                    ],
                ]
            }
            myChart.setOption(option);
        };
    }
    useEffect(() => {
        const result = timeYear.filter(i => i >= year.in && i <= year.to);
        let arrayNumber: number[] = []
        let nameChartY: string = ""
        let body: InfoChart[] = []
        let nameCompany: string = ""
        let reduceArray: number[] = []
        if (data.length) {
            data.forEach((item: any) => {
                arrayNumber = []
                result.map((timer) => {
                    const infoLittle = item.find((i: any) => (i.date).toString() === timer)
                    arrayNumber.push(infoLittle?.quantity || 0)
                    if (!nameCompany) {
                        nameCompany = infoLittle?.salesCompanies?.name || infoLittle?.knowledgeSalesCompanies?.name || infoLittle?.exportsCompanies?.name || infoLittle?.facilitiesCompanies?.name || infoLittle?.employeesCompanies?.name
                    }
                    if (infoLittle?.employeesCompanies?.name) {
                        nameChartY = "نفر"
                    }
                    if (infoLittle?.exportsCompanies?.name) {
                        nameChartY = "دلار"
                    }
                })
                let object = {
                    name: nameCompany || "",
                    valueArray: arrayNumber
                }
                reduceArray.push(...object.valueArray)
                nameCompany = ""
                body.push(object)
            })
        }
        if (reduceArray.length && nameChartY !== "نفر") {
            let divisionNumber = 0
            const maxNumber = reduceArray.reduce((a, b) => {
                if (a > b) {
                    return a
                } else {
                    return b
                }
            })
            const maxNumberLength = maxNumber.toString().length
            if (maxNumberLength < 7) {
                divisionNumber = 1000
                nameChartY = "هزار تومان"
            }
            if (maxNumberLength >= 7 && maxNumberLength < 10) {
                divisionNumber = 1000000
                if (nameChartY === "دلار") {
                    nameChartY = "میلیون دلار"
                } else {
                    nameChartY = "میلیون تومان"
                }
            }
            if (maxNumberLength > 10) {
                divisionNumber = 1000000000
                if (nameChartY === "دلار") {
                    nameChartY = "میلیارد دلار"
                } else {
                    nameChartY = "میلیارد تومان"
                }
            }
            body.map((i) => {
                i.valueArray = i.valueArray.map((number) => {
                    const gog = number / divisionNumber
                    return gog
                })
                return i
            })
        }
        const finish = body.map((i) => {
            if (!i.name) return
            return {
                name: i.name,
                type: 'line',
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
                data: i.valueArray,
                markArea: {
                    itemStyle: {
                        color: 'rgba(255, 173, 177, 0.4)'
                    },
                    data: [
                    ]
                }
            }
        })
        optionBar(finish, result, nameChartY)
    }, [year, data]);
    return <>
        < div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </>
};

export default NormalChart;
