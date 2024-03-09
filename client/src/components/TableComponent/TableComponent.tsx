import { Button } from '@material-tailwind/react'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import SendMassage from '../SendMassage/SendMassage'
import axios from 'axios'
import { toast } from 'react-toastify'
type TableComponentType = {
    data: TableType[]
    head: string[]
    url: string
}
type TableType = {
    companyId: string
    evalApproved: boolean
    id: string
    msg: string
    quantity: number
    year: number
}
export default function TableComponent({ data, head, url }: TableComponentType) {
    const [allData, setAllData] = useState<TableType[]>(data)
    const confirm = (id: string) => {
        const body = {
            evalApproved: true,
            id,
            section: url
        }
        axios.put('eval/checkInfo', body).then(() => {
            const newDatas = allData.map((i) => {
                if (i.id === id) {
                    i.evalApproved = true
                }
                return i
            })
            setAllData(newDatas)

        }).catch((err) => {
            toast.warning("با خطا روبرو شدیم")
            console.log(err)
        })
    }
    const unConfirmed = (id: string) => {
        const body = {
            evalApproved: false,
            id,
            section: url
        }
        axios.put('eval/checkInfo', body).then(() => {
            const newDatas = allData.map((i) => {
                if (i.id === id) {
                    i.evalApproved = false
                }
                return i
            })
            setAllData(newDatas)
        }).catch((err) => {
            toast.warning("با خطا روبرو شدیم")
            console.log(err)
        })
    }
    return (
        <table className="w-full text-sm text-left rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
            <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-900 dark:text-gray-400">
                <tr>
                    {head.map((i, index) => (
                        <th key={index} scope="col" className="px-6 py-3 text-center">
                            {i}
                        </th>
                    ))}
                    <th scope="col" className="px-6 py-3 text-center">
                        پیام راهنمایی
                    </th>
                </tr>
            </thead>
            <tbody>
                {allData.length && allData.map((i, index) => (
                    <tr key={index} className={`${i.evalApproved === null ? "bg-gray-100 dark:bg-gray-800" : i.evalApproved ? "bg-green-100 dark:bg-[#2fff656b] " : "bg-red-200 dark:bg-[#f83a3aad]"} dark:border-gray-700 border-b`}>
                        <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {i.year}
                        </td>
                        <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {i.quantity}
                        </td>
                        <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex gap-2 justify-center">
                                <Button onClick={() => unConfirmed(i.id)} variant="gradient" color="red" >
                                    <IoClose className="inline text-gray-50" />
                                </Button>
                                <Button onClick={() => confirm(i.id)} variant="gradient" color="green" >
                                    <FaCheck className="inline text-gray-50" />
                                </Button>
                            </div>
                        </td>
                        <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <SendMassage id={i.id} name={url} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
