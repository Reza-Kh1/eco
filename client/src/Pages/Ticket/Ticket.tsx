import { useForm } from "react-hook-form";
import InputForm from "../../components/InputForm/InputForm";
import { Accordion, AccordionBody, AccordionHeader, Button, Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaAngleDown, FaCheck, FaInfo } from "react-icons/fa";
import { MdTitle } from "react-icons/md";
import { useSelector } from "react-redux";
import { ProfileUserType } from "../../types/type";
type FormInput = {
  subject: string
  text: string
}
type DataTicket = {
  id: number
  name: string
  createdAt: Date
  status: boolean
  text: string
  replies: { text: string }[]
}
export default function Ticket() {
  const { register, handleSubmit } = useForm<FormInput>()
  const [allData, setAllData] = useState<DataTicket[]>([])
  const [support, setSupport] = useState<string>()
  const [open, setOpen] = useState<number>()
  const createTicket = (form: FormInput) => {
    console.log(form);
    setAllData([])

  }
  const getData = () => {
console.log(support);

  }
  const userInfo = useSelector((state: ProfileUserType) => state.user)
  const handleOpen = (value: number) => setOpen(value)
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
      {userInfo.type === 'USER' ? (
        <>
          <div className="w-full mt-3 p-2 rounded-md bg-blue-100  dark:bg-blue-400 text-black shadow-md mb-4">
            <h3 className="text-h1-light dark:text-h1-dark">تیکت جدید ثبت کنید</h3>
          </div>
          <form onSubmit={handleSubmit(createTicket)} className="flex flex-wrap items-center">
            <div className="w-1/2 pl-2">
              <InputForm name="subject" type="text" label="موضوع تیکت" icon={<MdTitle />} required register={register} />
            </div>
            <div className="w-1/2 pr-2">
              <span className="text-sm text-span-light dark:text-span-dark">گیرنده پیام را انتخاب کنید</span>
              <div dir="ltr" className="mt-1">
                <Select className="text-span-light dark:text-span-dark" placeholder
                onChange={(value: any) => setSupport(value)} label="انتخاب کنید">
                  <Option value="مدیر سایت">مدیر سایت</Option>
                  <Option value="پشتیبانی">پشتیبانی</Option>
                  <Option value="بازرس اطلاعات">بازرس اطلاعات</Option>
                </Select>
              </div>
            </div>
            <div className="mt-3 w-full">
              <textarea className="w-full rounded-md p-2 dark:bg-gray-700 dark:text-span-dark shadow-md focus-visible:outline-none" {...register("text")} required rows={6}></textarea>
            </div>
            <div className="w-1/6 mt-3">
              <Button className="w-full" variant="gradient" color="green" placeholder>
                ثبت
              </Button>
            </div>
          </form >
          <div className="w-full mt-3 p-2 rounded-md bg-blue-100  dark:bg-blue-400 text-black shadow-md mb-4">
            <h3 className="text-h1-light dark:text-h1-dark">
              تیکت هایی که قبلا ثبت کرده اید
            </h3>
          </div>
          {
            allData?.length ? (
              allData?.map((i) => (
                <Accordion
                placeholder
                  className="bg-custom-dark my-3 dark:bg-custom-light p-2 rounded-md"
                  key={i.id}
                  open={open === i.id}
                  icon={
                    <FaAngleDown
                      className={`${i.id === open ? "rotate-180" : ""
                        } h-5 w-5 transition-transform`}
                    />
                  }
                >
                  <AccordionHeader
                  placeholder
                    className="text-h1-light dark:text-h1-dark text-lg"
                    onClick={() => handleOpen(i.id)}
                  >
                    <div className="w-full flex justify-between pl-3">
                      <div className="flex gap-2">
                        <span>{i.name}</span>
                        <span>
                          ({new Date(i?.createdAt).toLocaleDateString("fa")})
                        </span>
                      </div>
                      {i.status ? (
                        <>
                          <div className="bg-green-300 text-gray-900 px-3 py-2 rounded-md text-sm">
                            <span>پاسخ داد شده</span>
                            <FaCheck className="inline mr-2" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-red-300 px-3 py-2 text-gray-900 rounded-md text-sm">
                            <span>پاسخ داد نشده</span>
                            <FaInfo className="inline mr-2" />
                          </div>
                        </>
                      )}
                    </div>
                  </AccordionHeader>
                  <AccordionBody>
                    <div className="w-full">
                      <div className="w-8/12 bg-slate-300 dark:bg-slate-300 rounded-md shadow-md p-2 ml-auto">
                        <span className="text-h1-light dark:text-h1-dark text-lg">
                          {i.name}
                        </span>
                        <p className="text-p-light dark:text-p-dark mt-3">{i.text}</p>
                      </div>
                      {i.replies?.length ? (
                        <div className="w-8/12 bg-slate-300 dark:bg-slate-300 mt-3 rounded-md shadow-md p-2 mr-auto">
                          <span className="text-h1-light dark:text-h1-dark text-lg">
                            پاسخ ادمین
                          </span>
                          <p className="text-p-light dark:text-p-dark mt-3">
                            {i.replies?.map((respown, index) => (
                              <p key={index}>{respown.text}</p>
                            ))}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </AccordionBody>
                </Accordion>
              ))
            ) : (
              <>
                <div className="text-center bg-orange-300 dark:bg-orange-400 shadow-md p-3 rounded-md">
                  <span className="text-gray-900">
                    هیچ تیکتی تاکنون ثبت نکرده اید
                  </span>
                </div>
              </>
            )
          }
        </>
      ) : (
        <>
          <div className="w-full mt-3 p-2 rounded-md bg-blue-100  dark:bg-blue-400 text-black shadow-md mb-4">
            <h3 className="text-h1-light dark:text-h1-dark">تمامیه پیام ها را پاسخ داده اید !</h3>
          </div>
        </>
      )}

    </div >
  )
}
