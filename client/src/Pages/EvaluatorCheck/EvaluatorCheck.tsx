import { Button } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import { useNavigate, useParams } from "react-router-dom"
import TableComponent from "../../components/TableComponent/TableComponent"
import { toast } from "react-toastify"
import SendMassage from "../../components/SendMassage/SendMassage"
import { GiAtom } from "react-icons/gi"
import TableTashilat from "../../components/TableTashilat/TableTashilat"
import axios from "axios"
type FacilityType = {
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
type InformationType = {
  application: string
  product: string
  technologyField: string
  date: string
  evalApproved: boolean
  id: string
  msg: string
  name: string
  userId: string
}
type TableType = {
  companyId: string
  evalApproved: boolean
  id: string
  msg: string
  quantity: number
  year: number
}
export default function EvaluatorCheck() {
  const { name } = useParams()
  const [information, setInformation] = useState<InformationType>()
  const [facility, setFacility] = useState<FacilityType[]>([])
  const [employee, setEmployee] = useState<TableType[]>([])
  const [knowledge, setKnowledge] = useState<TableType[]>([])
  const [sale, setSale] = useState<TableType[]>([])
  const [exportInfo, setExportInfo] = useState<TableType[]>([])
  const navigate = useNavigate()
  const getData = () => {
    axios.get(`eval/evalgetInfo/${name}`).then(({ data }) => {
      setInformation(data.companyInfo)
      setEmployee(data.employeeInfo)
      setFacility(data.facilityInfo)
      setKnowledge(data.kSaleInfo)
      setSale(data.saleInfo)
      setExportInfo(data.exportInfo)
    }).catch((err) => {
      console.log(err)
    })
  }
  const accessInfo = (value: boolean) => {
    const body = {
      section: "companyInfo",
      id: information?.id,
      evalApproved: value
    }
    if (value) {
      axios.put("eval/checkInfo", body).then(() => {
        if (information) {
          setInformation({ ...information, evalApproved: true })
        }
      }).catch((err) => {
        console.log(err);
      })
    } else {
      axios.put("eval/checkInfo", body).then(() => {
        if (information) {
          setInformation({ ...information, evalApproved: true })
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
  const accessForm = () => {
    console.log("ok");

    axios.get(`eval/completeEval/${information?.id}`).then(({ data }) => {
      console.log(data);
      navigate(-1), toast.success("ارزیابی ذخیره شد")

    }).catch((err) => {
      console.log(err);

      toast.warning("با خطا روبرو شدیم")
    })
  }
  useEffect(() => {
    getData()
  }, [])
  const InfoCompany = ({ name, value }: {
    name: string | undefined
    value: string | undefined
  }) => {
    return (
      <div>
        <span className="dark:text-span-dark text-span-light">{name || ""}</span>
        <p className="bg-gray-200 dark:bg-gray-700 dark:text-span-dark text-span-light p-2 rounded-md mt-1">{value || ""}</p>
      </div>
    )
  }
  return (
    <div className="w-full">
      {information && (
        <>
          <div className={`rounded-md shadow-md p-2 ${information?.evalApproved === null ? "bg-gray-100 dark:bg-gray-800" : information?.evalApproved ? "bg-green-100 dark:bg-[#2fff656b]" : "bg-red-200 dark:bg-[#f83a3aad]"}`}>
            <div className="w-full mt-3 p-2 rounded-md bg-blue-100  dark:bg-blue-400 dark:text-gray-50 text-span-light shadow-md mb-4">
              <h3 className="text-h1-light dark:text-h1-dark">شرکت مپنا</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <InfoCompany name="نام شرکت :" value={information?.name} />
              <InfoCompany name="حوزه فناوری :" value={information?.technologyField} />
              <InfoCompany name="حوزه کاربرد محصولات :" value={information?.application} />
              <InfoCompany name="حوزه محصولات :" value={information?.product} />
              <InfoCompany name="سال تاسیس :" value={information?.date} />
              <div className="flex gap-2 justify-center items-center">
                <Button placeholder variant="gradient" color="red" onClick={() => accessInfo(false)}>
                  <IoClose className="inline text-gray-50" />
                </Button>
                <Button placeholder variant="gradient" color="green" onClick={() => accessInfo(true)} >
                  <FaCheck className="inline text-gray-50" />
                </Button>
              </div>
            </div>
          </div>
          <SendMassage id={information.id} name="companyInfo" classNmae="mt-3" value="به بخش اطلاعات" />
        </>
      )
      }
      <div>
        <div className="w-full mt-3 p-2 rounded-md bg-blue-100  dark:bg-blue-400 dark:text-gray-50 text-span-light shadow-md mb-4">
          <h3 className="text-h1-light dark:text-h1-dark">تعداد کارمندان</h3>
        </div>
        {employee.length && (
          <TableComponent url="employeeInfo" data={employee} head={["سال تاسیس", "تعداد کارمندان", "عملیات"]} />
        )}
      </div>
      <div>
        <div className="w-full mt-3 p-2 rounded-md bg-blue-100  dark:bg-blue-400 dark:text-gray-50 text-span-light shadow-md mb-4">
          <h3 className="text-h1-light dark:text-h1-dark">میزان فروش</h3>
        </div>
        {sale.length && (
          <TableComponent url="saleInfo" data={sale} head={["سال تاسیس", "مبلغ فروش", "عملیات"]} />
        )}
      </div>
      <div>
        <div className="w-full mt-3 p-2 rounded-md bg-blue-100  dark:bg-blue-400 dark:text-gray-50 text-span-light shadow-md mb-4">
          <h3 className="text-h1-light dark:text-h1-dark">میزان فروش دانش بنیان</h3>
        </div>
        {knowledge.length && (
          <TableComponent url="kSaleInfo" data={knowledge} head={["سال تاسیس", "مبلغ فروش", "عملیات"]} />
        )}
      </div>
      <div>
        <div className="w-full mt-3 p-2 rounded-md bg-blue-100  dark:bg-blue-400 dark:text-gray-50 text-span-light shadow-md mb-4">
          <h3 className="text-h1-light dark:text-h1-dark">میزان صادرات</h3>
        </div>
        {exportInfo.length && (
          <TableComponent url="exportInfo" data={exportInfo} head={["سال تاسیس", "مبلغ صادرات", "عملیات"]} />
        )}
      </div>
      <div>
        <div className="w-full mt-3 p-2 rounded-md bg-blue-100  dark:bg-blue-400 dark:text-gray-50 text-span-light shadow-md mb-4">
          <h3 className="text-h1-light dark:text-h1-dark">تسهیلات شرکت ها</h3>
        </div>
        {facility.length && (
          <TableTashilat url="facilityInfo" allData={facility} />
        )}
      </div>
      <div className="w-full mt-3 flex justify-between">
        <div className="w-1/6">
          <Button placeholder variant="gradient" color="deep-orange" onClick={() => { navigate(-1), toast.success("ارزیابی ذخیره شد") }} className="w-full">
            <span>ذخیره و بازگشت</span>
          </Button>
        </div>
        <div className="w-1/6">
          <Button placeholder variant="gradient" color="indigo" onClick={accessForm} className="w-full">
            <span>تایید کردن اطلاعات</span>
            <GiAtom className="inline mr-2 text-lg" />
          </Button>
        </div>
      </div>
    </div >
  )
}
