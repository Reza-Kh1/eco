import { useForm } from 'react-hook-form';
import InputForm from '../../components/InputForm/InputForm';
import { Option, Select } from "@material-tailwind/react";
import { BsSearch } from 'react-icons/bs';
import { FaPhone, FaRegUser } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import { Pagination } from '../../components/Pagination/Pagination';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
type userHandleType = {
  keycode: "treemap" | "users" | "sale"
  phone: string
  type: string
}
export default function Users() {
  const [dataUser, setDataUser] = useState<any>([])
  const [change, setChange] = useState<string>()
  const [allPages, setAllPages] = useState<number>()
  const [search, setSearch] = useState<string>()
  const location = useLocation()
  const { skip }: any = queryString.parse(location.search);
  const { handleSubmit, register, reset } = useForm<userHandleType>()
  const navigate = useNavigate()
  const handleAction = (form: userHandleType) => {
    const body = {
      phoneNumber: form.phone,
      type: change,
      melliNumber: form.keycode,
      password: ""
    }
    axios.post(`users/register${location.search}`, body).then(() => {
      toast.success("کاربر ثبت شد")
        , getData(), reset(), setChange("")
    }).catch(() => { toast.error("عملیات با خطا روبرو شد") })
  }
  const serchHandler = (event: React.FormEvent) => {
    if (!search) return
    event.preventDefault()
    const body = {
      skip: 1,
      text: search,
      take: 3
    } as any
    const query = new URLSearchParams(body)
    navigate(`/admin/users?${query}`)
    axios.get(`users/findUsers?${query}`).then(({ data }) => {
      setDataUser(data.users),
        setAllPages(data.totalPages)
    }
    ).catch(() => toast.error("دربافت تمام کاربران با خطا مواجه شد !!!"))
  }
  const getData = async () => {
    axios.get("users/findUsers" + location.search).then(({ data }) => {
      setDataUser(data.users),
        setAllPages(data.totalPages)
    }
    ).catch(() => toast.error("دربافت تمام کاربران با خطا مواجه شد !!!"))
  }
  useEffect(() => {
    getData()
  }, [skip])

  return (
    <>
      <div className="w-full flex-wrap">
        <div className="w-full  bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
          <span className="text-lg text-span-light dark:text-span-dark">ثبت کارمند جدید</span>
          <form onSubmit={handleSubmit(handleAction)}
            className="flex justify-evenly flex-wrap items-end"
          >
            <div className="w-4/12 p-2">
              <InputForm
                name="phone"
                register={register}
                label="شماره تلفن کاربر"
                type="text"
                id="phone"
                placeholder="09121323131"
                icon={<FaPhone />}
                onInput={(e) => {
                  if (e.target.value.length < 2) {
                    return (e.target.value = e.target.value
                      .replace(/[^0]/g, "")
                      .slice(0, 11));
                  }
                  e.target.value = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 11);
                }}
                required
              />
            </div>
            <div className="w-4/12 p-2">
              <InputForm
                register={register}
                name="keycode"
                placeholder="002425547"
                label="کد ملی کاربر"
                type="text"
                id="key-code"
                icon={<FaRegUser />}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9]/g, "")
                    .slice(0, 10);
                }}
                required
              />
            </div>
            <div className="w-3/12 p-2">
              <div style={{ direction: "ltr" }} className="p-2 rounded-md">
                <Select
                  label="نقش کاربر"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 }
                  }}
                  className="text-span-light dark:text-span-dark"
                  onChange={(value: string) => setChange(value)}
                  value={change}
                >
                  <Option value="4">Evaluator</Option>
                  <Option value="3">Partial</Option>
                  <Option value="2">Full Access</Option>
                  <Option value="0">User</Option>
                  <Option value="1">Admin</Option>
                </Select>
              </div>
            </div>
            <div className="w-full mt-5">
              <SubmitBtn value='ثبت کاربر' type='submit' />
            </div>
          </form>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-2 py-5 mt-5 rounded-md w-full">
          <div className=" w-full flex justify-between">
            <span className="text-span-light dark:text-span-dark">لیست کارمندان ها</span>
            <form onSubmit={serchHandler} className="relative">
              <input onChange={({ target }) => setSearch(target.value)} value={search} className="rounded-lg p-2 focus-visible:outline-none shadow-lg dark:bg-gray-400 dark:placeholder:text-gray-600 focus-visible:shadow-blue-100" type="text" placeholder="جستجو ..." />
              <button aria-hidden="true" type="submit" className="absolute flex items-center justify-center left-5 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3">
                <BsSearch className="inline" />
              </button>
            </form>
          </div>
          {dataUser.length ? (
            <table className="w-full text-sm text-left rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    نام
                  </th>
                  <th scope="col" className="px-6 py-3">
                    تاریخ عضویت
                  </th>
                  <th scope="col" className="py-3 px-6">
                    شماره تلفن
                  </th>
                  <th scope="col" className="px-6 py-3">
                    کد ملی
                  </th>
                  <th scope="col" className="px-6 py-3">
                    کد شرکت
                  </th>
                  <th scope="col" className="px-6 py-3">
                    موقعیت
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataUser.map((i: any, index: number) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <td className="px-6 py-4">
                      {i?.userName}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(i.createdAt).toLocaleDateString("fa")}
                    </td>
                    <td className="px-6 py-4">
                      {Number(i.phoneNumber).toLocaleString("fa").replace(/٬/g, "")}
                    </td>
                    <td className="px-6 py-4">
                      {Number(i.melliNumber).toLocaleString("fa").replace(/٬/g, "")}
                    </td>
                    <td className="px-6 py-4">
                      {Number(i.companyNumber).toLocaleString("fa").replace(/٬/g, "")}
                    </td>
                    <td className="px-6 py-4">
                      {i.type === 0 ? "کاربر تایید نشده" : i.type === 1 ? "Admin" : i.type === 2 ? "Full Access" : i.type === 3 ? "Partial" : i.type === 4 ? "Evaualtor" : "کاربر تایید شده"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span>کاربری یافت نشد !</span>
          )}
          {allPages ? (
            <div className='w-full flex bg-gray-50 mt-4 rounded-md p-2 justify-between'>
              <Pagination allPage={allPages} page={skip} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
