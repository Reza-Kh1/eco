import { useForm } from 'react-hook-form';
import InputForm from '../../components/InputForm/InputForm'
import { Option, Select } from '@material-tailwind/react'
import { FaPen } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
type dataDashboard = {
    date: number,
    type: 1 | 2 | 3 | 4 | 0,
    motevali: string,
    name: string,
    quantity: string | null,
    tedad: string | null,
}
type filterType = {
    trustee: string
    title: string
}
export default function Tashilat() {
    const location = useLocation()
    const { name, title }: any = queryString.parse(location.search);
    const [allData, setAllData] = useState<dataDashboard[]>([])
    const { register, handleSubmit, resetField } = useForm<filterType>()
    const [changeSelect, setChangeSelect] = useState({
        tashilate: "",
        orderBy: "",
        year: ""
    })
    const filterAction = (form: filterType) => {
        const body = {
            obj1: {
                title: form.title,
                trustee: form.trustee
            },
            obj2: {
                orderBy: changeSelect.orderBy,
                tashilate: changeSelect.tashilate,
                year: changeSelect.year
            }
        }
        console.log(body);
        axios.post(`facilities/filterFacilities/${name}`, body).then(({ data }) => {
            setAllData(data)
        }).catch((err) => {
            console.log(err);
        })
    }
    const deleteSearch = () => {
        getData()
        resetField("title")
        resetField("trustee")
        setChangeSelect({ orderBy: "", tashilate: "", year: "" })
    }
    const getData = () => {
        console.log(`facilities/allFacilitiesOfCompany/${name}`)
        axios.get(`facilities/allFacilitiesOfCompany/${name}`).then(({ data }) => {
            setAllData(data)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='w-full flex flex-wrap'>
            <div className=" w-full">
                <div className='flex justify-between w-full items-center'>
                    <span className="text-tag-head-light dark:text-tag-head-dark block mb-4">لیست تسهیلات {title ? title : ""}</span>
                    <div className='w-3/12 p-2 '>
                        <Link to={`/admin/analyze?chart=facilities/facilitiesOfCompany&name=${name}`} className='w-full block text-center py-2 text-sm hover:bg-orange-400 text-tag-head-light dark:text-tag-head-dark shadow-md rounded-md bg-gray-50 dark:bg-gray-700'>
                            تسهیلات شرکت ها نمایش نموداری
                        </Link>
                    </div>
                </div>
                <div className='flex justify-between flex-wrap gap-3 p-2 rounded-md items-center'>
                    <div className='w-full flex'>
                        <div className='w-3/12 p-2'>
                            <InputForm
                                register={register}
                                name="title"
                                label="اگر به دنبال عنوان خاصی هستید (اختیاری)"
                                type="text"
                                id="title"
                                classLabel='text-gray-700 mb-2 text-sm block'
                                placeholder="وام و ..."
                                icon={<FaPen />}
                            />
                        </div>
                        <div className='w-3/12 p-2'>
                            <InputForm
                                register={register}
                                name="trustee"
                                label="اگر به دنبال متولی خاصی هستید (اختیاری)"
                                type="text"
                                id="trustee"
                                classLabel='text-gray-700 mb-2 text-sm block'
                                placeholder="بانک و ..."
                                icon={<FaPen />}
                            />
                        </div>
                    </div>
                    <div className='w-full flex flex-wrap items-center'>
                        <div style={{ direction: "ltr" }} className='w-3/12 p-2'>
                            <Select
                                label="نوع"
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 }
                                }}
                                value={changeSelect.tashilate}
                                className="text-tag-head-light dark:text-tag-head-dark"
                                placeholder
                                onChange={(value: any) => setChangeSelect({ ...changeSelect, tashilate: value })}
                            >
                                <Option value="0">مالی مستقیم</Option>
                                <Option value="1">مالی غیر مستقیم</Option>
                                <Option value="2">خدمت</Option>
                                <Option value="3">تسهیلگری</Option>
                                <Option value="4">غیر مالی (سایر)</Option>
                            </Select>
                        </div>
                        <div style={{ direction: "ltr" }} className='w-3/12 p-2'>
                            <Select
                                label="سال"
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 }
                                }}
                                className="text-tag-head-light dark:text-tag-head-dark"
                                placeholder
                                onChange={(value: any) => setChangeSelect({ ...changeSelect, year: value })}
                                value={changeSelect.year}
                            >
                                <Option value="1389">1389</Option>
                                <Option value="1390">1390</Option>
                                <Option value="1391">1391</Option>
                                <Option value="1392">1392</Option>
                                <Option value="1393">1393</Option>
                                <Option value="1394">1394</Option>
                                <Option value="1395">1395</Option>
                                <Option value="1396">1396</Option>
                                <Option value="1397">1397</Option>
                                <Option value="1398">1398</Option>
                                <Option value="1399">1399</Option>
                                <Option value="1400">1400</Option>
                                <Option value="1401">1401</Option>
                                <Option value="1402">1402</Option>
                                <Option value="1403">1403</Option>
                            </Select>
                        </div>
                        <div style={{ direction: "ltr" }} className='w-3/12 p-2'>
                            <Select
                                label="مرتب سازی بر اساس"
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 }
                                }}
                                value={changeSelect.orderBy}
                                className="text-tag-head-light dark:text-tag-head-dark"
                                placeholder
                                onChange={(value: any) => setChangeSelect({ ...changeSelect, orderBy: value })}
                            >
                                <Option value="newest">جدید ترین</Option>
                                <Option value="oldest">قدیمی ترین</Option>
                                <Option value="price_ascending">مبلغ از کم ترین به بیش ترین</Option>
                                <Option value="price_descending">مبلغ از بیش ترین به کم ترین</Option>
                                <Option value="amount_ascending">تعداد از بیش ترین به کم ترین</Option>
                                <Option value="amount_descending">تعداد از بیش ترین به کم ترین</Option>
                            </Select>
                        </div>
                        <div className='w-3/12 flex gap-2 p-2'>
                            <SubmitBtn value='اعمال فیلتر' onClick={handleSubmit(filterAction)} type='submit' classPlus={"px-7"} />
                            <SubmitBtn value='پاک کردن فیلتر' onClick={deleteSearch} type='button' classPlus={"px-7 bg-red-400"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='dark:bg-gray-700 shadow-md bg-gray-100 p-2 py-3 rounded-md mt-4 w-full'>
                {allData.length ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-rounded">
                        <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    سال
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    نوع
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    متولی
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    عنوان
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    مبلغ (تومان)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    تعداد
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData.map((i, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        {index}
                                    </td>
                                    <td className="px-6 py-4">
                                        {i?.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        {i?.type === 0 ? "مالی مستقیم" : i.type === 1 ? "مالی غیر مستقیم" : i?.type === 2 ? "خدمت" : i?.type === 3 ? "تسهیلگری" : "غیرمالی (سایر)"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {i?.motevali}
                                    </td>
                                    <td className="px-6 py-4">
                                        {i?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {Number(i?.quantity).toLocaleString("fa") || "---"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {i?.tedad || "---"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <span className='text-span-light dark:text-span-dark'>اطلاعاتی برای نمایش وجود ندارد</span>
                )}
            </div>
        </div>
    )
}