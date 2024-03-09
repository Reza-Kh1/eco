import { Option, Select } from "@material-tailwind/react";
import TreeChart from "../../Chart/TreeChart/TreeChart";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
export default function Dashboard() {
  const [filterChart, setFilterChart] = useState<string>("sales/SalesForAllCompanyOnSpecificDate")
  const [filterYear, setFilterYear] = useState<string>("1401")
  const [dataChart, setDataChart] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const actionHandler = async (year: string | null, chart: string | null) => {
    setLoading(true)
    if (chart) {
      setFilterChart(chart)
    }
    if (year) {
      setFilterYear(year)
    }
    axios.get(`${chart || filterChart}/${year || filterYear}`).then(({ data }) => {
      setDataChart(data)
      setLoading(false)
    }).catch((err) => console.log(err))
  }
  const ChartComponent = () => {
    return <>
      {dataChart.length ? (
        <TreeChart data={dataChart} title={filterChart} />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <span className="text-blue-gray-400 text-lg">اطلاعاتی برای نمایش وجود ندارد</span>
        </div>
      )}</>
  }
  useEffect(() => {
    actionHandler(null, null)
  }, [])
  return (
    <div className="w-full" style={{ height: 'calc(100% - 80px)' }}>
      <div className="w-full p-2 bg-gray-50 dark:bg-gray-800 rounded-md h-full">
        <span className="text-span-light dark:text-span-dark">
          داشبورد
        </span>
        <div className=" rounded-md mt-3 flex flex-wrap gap-2 p-2 text-span-light dark:text-span-dark">
          <div style={{ direction: "ltr" }} className="w-3/12">
            <Select
              label="انتخاب نمودار"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 }
              }}
              className="text-span-light dark:text-span-dark"
              value={filterChart}
              defaultValue={filterChart || ""}
              placeholder
              onChange={(value: any) => { setFilterChart(value), actionHandler(null, value) }}
            >
              <Option value="filters/totalsales">شاخص کل شرکت ها</Option>
              <Option value="sales/SalesForAllCompanyOnSpecificDate">فروش</Option>
              <Option value="employees/employeesForAllCompanyOnSpecificDate">کارمندان</Option>
              <Option value="knowledge/KnowledgeSalesForAllCompanyOnSpecificDate">فروش دانش بنیان</Option>
              <Option value="exports/ExportsForAllCompanyOnSpecificDate">صادرات</Option>
            </Select>
          </div>
          <div style={{ direction: "ltr" }} className="w-3/12">
            <Select
              label="سال"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 }
              }}
              placeholder
              onChange={(value: any) => { setFilterYear(value), actionHandler(value, null) }}
              value={filterYear}
              defaultValue={filterYear || ""}
              className="text-span-light dark:text-span-dark"
            >
              <Option value="1394">1394</Option>
              <Option value="1395">1395</Option>
              <Option value="1396">1396</Option>
              <Option value="1397">1397</Option>
              <Option value="1398">1398</Option>
              <Option value="1399">1399</Option>
              <Option value="1400">1400</Option>
              <Option value="1401">1401</Option>
              <Option value="1402">1402</Option>
            </Select>
          </div>
        </div>
        <div className="border border-blue-gray-300 overflow-hidden shadow-md shadow-gray-500 dark:shadow-blue-gray-500 h-5/6 mt-3 rounded-md w-full">
          {loading ? (
            <Loading />
          ) : (
            <ChartComponent />
          )}
        </div>
      </div>
    </div>
  )
}
