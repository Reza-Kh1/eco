import { Button } from "@material-tailwind/react"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import SendMassage from "../SendMassage/SendMassage"
import axios from "axios"
import { toast } from "react-toastify"

type dataDashboard = {
    companyId: string
    evalApproved: boolean
    id: string
    motevali: string
    msg: string
    name: string
    quantity: null | number
    tedad: null | number
    type: number
    year: number
}
export default function TableTashilat({ allData, url }: { allData: dataDashboard[], url: string }) {
    const [data, setData] = useState<dataDashboard[]>(allData)
    const confirm = (id: string) => {
        const body = {
            evalApproved: true,
            id,
            section: url
        }
        axios.put("eval/checkInfo", body).then(() => {
            const newDatas = data.map((i) => {
                if (i.id === id) {
                    i.evalApproved = true
                }
                return i
            })
            setData(newDatas)
        }).catch((err) => {
            console.log(err)
            toast.warning("با خطا روبرو شدیم")
        })
    }
    const unConfirmed = (id: string) => {
        const body = {
            evalApproved: false,
            id,
            section: url
        }
        axios.put("eval/checkInfo", body).then(() => {
            const newDatas = data.map((i) => {
                if (i.id === id) {
                    i.evalApproved = false
                }
                return i
            })
            setData(newDatas)
        }).catch((err) => {
            console.log(err)
            toast.warning("با خطا روبرو شدیم")
        })
    }
    return (
        <div className='dark:bg-gray-700 shadow-md bg-gray-100 p-2 py-3 rounded-md mt-4 w-full'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-rounded">
                <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3  text-center">
                            سال
                        </th>
                        <th scope="col" className="px-6 py-3  text-center">
                            نوع
                        </th>
                        <th scope="col" className="py-3  text-center px-6">
                            متولی
                        </th>
                        <th scope="col" className="px-6 py-3  text-center">
                            عنوان
                        </th>
                        <th scope="col" className="px-6 py-3  text-center">
                            مبلغ (تومان)
                        </th>
                        <th scope="col" className="px-6 py-3  text-center">
                            تعداد
                        </th>
                        <th scope="col" className="px-6 py-3  text-center">
                            عملیات
                        </th>
                        <th scope="col" className="px-6 py-3  text-center">
                            پیام راهنمایی
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((i, index) => (
                        <tr key={index} className={`${i.evalApproved === null ? "bg-gray-100 dark:bg-gray-800" : i.evalApproved ? "bg-green-100 dark:bg-[#2fff656b] " : "bg-red-200 dark:bg-[#f83a3aad]"} dark:border-gray-700 border-b`}>
                            <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {i?.year}
                            </td>
                            <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {i?.type === 0 ? "مالی مستقیم" : i.type === 1 ? "مالی غیر مستقیم" : i?.type === 2 ? "خدمت" : i?.type === 3 ? "تسهیلگری" : "غیرمالی (سایر)"}
                            </td>
                            <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {i?.motevali}
                            </td>
                            <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {i?.name}
                            </td>
                            <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {Number(i?.quantity).toLocaleString("fa") || "---"}
                            </td>
                            <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {i?.tedad || "---"}
                            </td>
                            <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex gap-2 justify-center">
                                    <Button placeholder onClick={() => unConfirmed(i?.id)} variant="gradient" color="red" >
                                        <IoClose className="inline text-gray-50" />
                                    </Button>
                                    <Button placeholder onClick={() => confirm(i?.id)} variant="gradient" color="green" >
                                        <FaCheck className="inline text-gray-50" />
                                    </Button>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <SendMassage id={i.id} name="facilityInfo" classNmae="mt-3" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}
