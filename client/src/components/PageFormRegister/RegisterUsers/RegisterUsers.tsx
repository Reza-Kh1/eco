import { toast } from "react-toastify"
import { Button } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import InputForm from "../../InputForm/InputForm"
import SubmitBtn from "../../SubmitBtn/SubmitBtn"
import { FaCheck, FaExclamation, FaPen } from "react-icons/fa"
import { TbNumbers } from "react-icons/tb";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux"
import { FormRegisterType } from "../../../types/type"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { checkFlags, setCompanyId } from "../../../redux/slice/formRegister"
import { getCompanyId } from "../actions"
import { useForm } from "react-hook-form"
import { logOut } from "../../../redux/slice/user"
import ShowMsg from "../ShowMsg"
export default function RegisterUsers() {
  const selectFormRegister = useSelector((state: FormRegisterType) => state.form)
  const [listDate, setListDate] = useState<any[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const dispatch = useDispatch()
  const { register, setValue, getValues } = useForm()
  const navigate = useNavigate()
  const createhandler = (time: string) => {
    const value = getValues(time)
    const body = {
      companyId: selectFormRegister?.companyId,
      date: time,
      quantity: value.replace(/,/g, '')
    }
    axios.post("employees/postEmployees", body).then(() => {
      toast.success("رکورد اضافه شد")
      getList()
    }).catch((err) => { toast.error(err) })
  }
  const editHandler = (num: number, id: string) => {
    const value = getValues((num).toString())
    const body = {
      quantity: value.replace(/,/g, "")
    }
    axios.put(`employees/updateEmployee/${id}`, body).then(() => { toast.success("با موفقیت ذخیره شد"), getList(), setEditId(null) }).catch(() => toast.error("اطلاعات ذخیره نشد"))
  }
  const getData = async () => {
    let data: any
    if (!selectFormRegister.companyId) {
      data = await getCompanyId()
      if (data.error) {
        if (data.error.response.status === 403) {
          dispatch(logOut())
          navigate("/")
        }
        console.log(data.error);
      }
      if (data && !data.error) {
        dispatch(setCompanyId(data))
      }
    }
  }
  const getList = async () => {
    if (!selectFormRegister?.companyId) return
    axios.get(`employees/allEmployeesOfCompany/${selectFormRegister?.companyId}`).then(({ data }) => {
      if (data?.flags) {
        dispatch(checkFlags(data.flags))
      }
      let newList = selectFormRegister.listLimitedYear
      let boxData: any = []
      newList.map((year) => {
        const somy = data.list.some((i: any) => {
          if (i.date === Number(year)) {
            boxData.push(i)
            setValue(year, Number(i.quantity).toLocaleString("en"))
            return true
          }
          return false
        })
        if (!somy) {
          boxData.push(year)
        }
      })
      setListDate(boxData || [])
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    getList()
  }, [selectFormRegister?.companyId])
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="w-full min-h-80 flex flex-col justify-between">
      <div>
        <span className="text-2xl mt-2 text-blue-400 text-center mb-5 block">کارمندان</span>
        <div className="flex flex-wrap">
          <table className="w-full text-sm text-left rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3 text-center">
                  سال
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  تعداد کارمندان
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  وضعیت                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  عملیات
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  پیام ها
                </th>
              </tr>
            </thead>
            <tbody>
              {listDate && listDate.map((i, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-2 py-2 text-center">
                    {Number(i?.date || i).toLocaleString("fa").replace(/٬/g, "")}
                  </td>
                  <td className="px-1 py-2 text-center">
                    {i?.date ? (<>
                      {i.date === editId ? (<InputForm register={register}
                        onInput={(e) => {
                          const value = e.target.value;
                          const comma = value.replace(/,/g, '')
                          const formattedValue = comma.replace(/[^0-9,]/g, '');
                          e.target.value = Number(formattedValue).toLocaleString("en");
                        }} name={`${i.date}`} type="text" required icon={<TbNumbers />} />) : (
                        <span>{Number(i.quantity).toLocaleString("fa")}</span>
                      )}
                    </>) : (
                      <InputForm register={register}
                        onInput={(e) => {
                          const value = e.target.value;
                          const comma = value.replace(/,/g, '')
                          const formattedValue = comma.replace(/[^0-9,]/g, '');
                          e.target.value = Number(formattedValue).toLocaleString("en");
                        }} name={i} type="text" required icon={<TbNumbers />} />
                    )}
                  </td>
                  <td className="px-1 py-2 text-center">

                    {i?.evalApproved === true ? (
                      <span className="rounded-md px-2 text-xs text-gray-900 py-1 bg-green-300">تایید شده</span>
                    ) : i?.evalApproved === false ? (
                      <span className="rounded-md px-2 text-xs text-gray-900 py-1 bg-red-100">تایید نشده</span>
                    ) : (
                      <span className="rounded-md px-2 text-xs text-gray-900 py-1 bg-gray-200">ثبت نشده</span>
                    )}
                  </td>
                  <td className="px-1 py-2 text-center">
                    {i?.date ? (
                      <>
                        {i.date === editId ? (
                          <Button placeholder variant="gradient" className="px-5 font-medium ml-2 py-2" color="deep-orange" onClick={() => editHandler(i.date, i.id)}>ذخیره<FaCheck className="inline-block mr-2" /></Button>
                        ) : (
                          <Button placeholder variant="gradient" className="px-5 font-medium ml-2 py-2" color="blue" onClick={() => setEditId(i.date)}>ویرایش<FaPen className="inline-block mr-2" /></Button>
                        )}
                      </>
                    ) : (
                      <Button placeholder variant="gradient" className="px-5 font-medium ml-2 py-2" color="blue-gray" onClick={() => createhandler(i)}>ثبت<FaExclamation className="inline-block mr-2" /></Button>
                    )}
                  </td>
                  <td className="px-1 py-2 text-center">
                    <ShowMsg value={i.msg}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div >
      <div className="w-full flex justify-between mt-5">
        <div className="w-2/12">
          <Link to={"/admin/form-register/information"}>
            <SubmitBtn type="button" value="صفحه قبلی" onClick={createhandler} iconRight={<FaArrowRightLong className="inline ml-3" />} classPlus={"w-full"} />
          </Link>
        </div>
        <div className="w-2/12">
          <Link to={"/admin/form-register/export"}>
            <SubmitBtn type="button" value="صفحه بعد" onClick={createhandler} icon={<FaArrowLeftLong className="inline mr-3" />} classPlus={"w-full"} />
          </Link>
        </div>
      </div>
    </div >
  )
}