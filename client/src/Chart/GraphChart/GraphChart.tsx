import React, { useEffect, useRef } from "react";
import ReactEcharts from "echarts-for-react";

function GraphChart({ graph }: any) {
    const [option, setOption] = React.useState({});
    const chartRef = useRef(null);
    const getData = async () => {

        graph.nodes.forEach(function (node: any) {
            node.label = {
                show: node.symbolSize > 30
            };
        });
        setOption({
            title: {
                text: 'Les Miserables',
                subtext: 'Default layout',
                top: 'bottom',
                left: 'right'
            },
            tooltip: {},
            // legend: [
            //     {
            //         // selectedMode: 'single',
            //         data: graph.categories.map(function (a) {
            //             return a.name;
            //         })
            //     }
            // ],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    layout: 'circular',
                    name: '',
                    type: 'graph',
                    // layout: 'none',
                    data: graph.nodes,
                    links: graph.links,
                    categories: graph.categories,
                    roam: true,
                    label: {
                        position: 'right',
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.5
                    },
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: 10
                        }
                    }
                }
            ]
        });
    }
    useEffect(() => {
        if (!graph.nodes || !graph.links) return;
        if (chartRef.current) {
            getData()
        }
    }, [graph]);

    return <ReactEcharts ref={chartRef} option={option} style={{ height: '100%' }} />;
}

export default GraphChart;
