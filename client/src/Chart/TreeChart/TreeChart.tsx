import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
function TreeChart({ data, title }: any) {
    const chartRef = useRef(null);
    let myChart: any = null;
    const name = title === "totalsales" ? "شاخص کل شرکت ها" : title === "SalesForAllCompanyOnSpecificDate" ? "فروش" : title === "employeesForAllCompanyOnSpecificDate" ? "کارمندان" : title === "KnowledgeSalesForAllCompanyOnSpecificDate" ? "فروش دانش بنیان" : "صادرات"
    const getData = async () => {
        if (chartRef.current) {
            if (myChart !== null) {
                myChart.dispose();
            }
            myChart = echarts.init(chartRef.current);
            myChart.showLoading();
            myChart.hideLoading();
            // const formatUtil = echarts.format;
            function getLevelOption() {
                return [
                    {
                        itemStyle: {
                            borderWidth: 0,
                            gapWidth: 5
                        }
                    },
                    {
                        itemStyle: {
                            gapWidth: 1
                        }
                    },
                    {
                        colorSaturation: [0.35, 0.5],
                        itemStyle: {
                            gapWidth: 1,
                            borderColorSaturation: 0.6
                        }
                    }
                ];
            }
            myChart.setOption({
                // title: {
                //     text:"چارت ها",
                //     left: 'center'
                // },
                tooltip: {
                    formatter: function (info: any) {
                        var value = info.value;
                        let treePathInfo = info.treePathInfo;
                        let treePath = [];
                        for (var i = 1; i < treePathInfo.length; i++) {
                            treePath.push(treePathInfo[i].name);
                        }
                        const div = treePathInfo.map((i: { name: string }, index: number) => { if (index) { return `<p class="tooltip-treechart">${i.name}</p>` } }).join('');
                        return [
                            '<div class="tooltip-title">' +
                            div +
                            '</div>',
                            '<div class="tooltip-treechart">مقدار: ' + Number(value).toLocaleString("fa") + '</div>'
                        ].join('');
                    }
                },
                series: [
                    {
                        name: name,
                        type: 'treemap',
                        nameTextStyle: {
                            fontFamily: "iransans",
                            fontSize: "14px",
                        },
                        visibleMin: 300,
                        label: {
                            show: true,
                            formatter: '{b}',
                            textStyle: {
                                fontFamily: "iransans",
                            },
                        },
                        itemStyle: {
                            borderColor: '#fff'
                        },
                        levels: getLevelOption(),
                        data: data
                    }
                ]
            });
        }
    }
    useEffect(() => {
        getData()
        return () => {
            if (myChart !== null) {
                myChart.dispose();
                myChart = null;
            }
        };
    }, [data]);
    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
}
export default TreeChart;