import { Button } from "@material-tailwind/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { FaExclamation } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { Pagination } from "../../components/Pagination/Pagination"
import queryString from "query-string"
type listCompanyType = {
    id: number
    date: Date
    name: string
    product: string
    technologyField: string
}
export default function Evaluator() {
    const location = useLocation()
    const { skip }: any = queryString.parse(location.search);
    const [allPage, setAllPage] = useState<number>()
    const [allData, setAllData] = useState<listCompanyType[]>([])
    const getData = () => {
        axios.get("company/getAllComany?take=10&skip=1").then(({ data }) => {
            console.log(data)
            setAllPage(data.totalPages)
            setAllData(data.companies)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getData()
    }, [skip])
    return (
        <div className="w-full">
            <div className="w-full mt-3 p-2 rounded-md bg-blue-100  dark:bg-blue-400 dark:text-gray-50 text-span-light shadow-md mb-4">
                <h3 className="text-h1-light dark:text-h1-dark">فرم های ارسال شده</h3>
            </div>
            {allData.length > 0 ? (
                <table className="w-full text-sm mb-4 text-left rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-3 py-2 text-center">
                                #
                            </th>
                            <th scope="col" className="px-3 py-2 text-center">
                                شرکت
                            </th>
                            <th scope="col" className="px-3 py-2 text-center">
                                سال تاسیس
                            </th>
                            <th scope="col" className="py-2 text-center px-3">
                                محصول
                            </th>
                            <th scope="col" className="py-2 text-center px-3">
                                حوزه فناوری
                            </th>
                            <th scope="col" className="px-3 py-2 text-center">
                                اطلاعات بیشتر
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData.map((i, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-3 py-2 text-center">
                                    {(index + 1).toLocaleString("fa")}
                                </td>
                                <td scope="row" className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {i?.name}
                                </td>
                                <td scope="row" className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {Number(i?.date).toLocaleString("fa").replace(/٬/g, "")}
                                </td>
                                <td scope="row" className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {i?.product}
                                </td>
                                <td scope="row" className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {i?.technologyField}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    <Link to={"/admin/evaluator-check/" + i.id}>
                                        <Button variant="gradient" color="green" >
                                            اطلاعات
                                            <FaExclamation className="inline text-gray-50" />
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="w-full b-gray-300 p-3 rounded-md">
                    <span>تمامی فرم هارا ارزیابی کرده اید!</span>
                </div>
            )}
            {allPage ? (
                <Pagination allPage={allPage} page={skip} />
            ) : null}
        </div>
    )
}