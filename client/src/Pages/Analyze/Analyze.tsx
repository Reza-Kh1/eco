import { Suspense, useEffect, useState } from "react";
import {
  Card,
  Checkbox,
  List,
  ListItem, Select, Option,
  ListItemPrefix,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import GraphChart from "../../Chart/GraphChart/GraphChart";
import NormalChart from "../../Chart/NormlChart/NormalChart";
import { toast } from "react-toastify";
import axios from "axios";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/slice/user";
type ListCompanyType = {
  id: any,
  name: string
  status: boolean
}
type lcalUser = {
  id: string | null
  type: number | null
}
export default function Analyze() {
  const dispatch = useDispatch()
  const naviagate = useNavigate()
  const query = new URLSearchParams(window.location.search)
  const [userData, setUserData] = useState<lcalUser>()
  const local = localStorage.getItem("information")
  const role = JSON.parse(local || "")
  const gog = role?.type === 0 || role?.type === 5 ? "sales/salesOfCompanyByUserId" : "sales/salesOfCompany"
  const [chart, setChart] = useState<string>(query.get("chart") || gog)
  const [choiceCompany, setChoiceCompany] = useState<{ id: number, name: string, status: boolean }[]>([])
  const [getCompany, setCompany] = useState<ListCompanyType[]>([])
  const [yearSelector, setYearSelector] = useState({ in: "1394", to: "1401" })
  const [dataChart, setDataChart] = useState<any>([])
  const [open, setOpen] = useState(0);
  const [loading, setLoading] = useState<boolean>(false)
  const userChart = () => {
    console.log(role?.id);
    axios.get(`${chart}/${yearSelector.in}/${yearSelector.to}/${role?.id}`).then(({ data }) => {
      setDataChart([data])
    }).catch((err) => {
      console.log(err)
    })
  }
  const getFilterChart = async () => {
    if (role?.type === 0 || role?.type === 5) {
      userChart()
      return
    }
    if (chart === "graph") {
      getGraphData()
      return
    }
    if (!yearSelector.in || !yearSelector.to || !chart || !choiceCompany.length) return
    setLoading(true)
    try {
      const value = await Promise.all(
        choiceCompany.map(async (i) => {
          const { data } = await axios.get(`${chart}/${yearSelector.in}/${yearSelector.to}/${i.id}`);
          return data;
        })
      );
      console.log(value);

      setDataChart(value)
      setLoading(false)
    } catch (err) {
      toast.error("دریافت نمودار با خطا مواجه شد")
      setLoading(false)
    }
  }
  const filterCompany = (e: any) => {
    const gog = getCompany.map((i) => {
      if (i.id === e.target.id) {
        if (i.status !== true) {
          if (choiceCompany.length > 4 || (chart === "graph" && choiceCompany.length > 0)) {
            toast.warning("حداکثر انتخاب شرکت ها 5 عدد است")
          } else {
            i.status = !i.status
            choiceCompany.push(i)
          }
        } else {
          i.status = !i.status
          const newChocieCompany = choiceCompany.filter((item) => item.id !== i.id)
          setChoiceCompany(newChocieCompany)
        }
      }
      return i
    })
    setCompany(gog)
  }
  const deleteCompany = (id: number) => {
    const newCompany = getCompany.map((i) => {
      if (i.id === id) {
        i.status = !i.status
      }
      return i
    })
    const newChocieCompany = choiceCompany.filter((item) => item.id !== id)
    setChoiceCompany(newChocieCompany)
    setCompany(newCompany)
  }
  const getListCompany = () => {
    const roleUser = JSON.parse(local || "")
    if (roleUser?.type === 0 || roleUser?.type === 5) {
      return
    }
    axios.get("company/getAllComany?skip=1&take=300").then(({ data }) => {
      const newData = data.companies.map((item: any) => ({
        ...item,
        status: false
      }));
      if (query.get("name")) {
        const gog = newData.map((i: any) => {
          if (i.id === query.get("name")?.toString()) {
            i.status = true
            if (!choiceCompany.length) {
              choiceCompany.push(i)
            }
          }
          return i
        })
        setCompany(gog)
      } else {
        const limitCompany = newData.slice(0, 5)
        if (choiceCompany.length > 4) return
        limitCompany.forEach((i: ListCompanyType) => {
          i.status = true
          choiceCompany.push(i)
        })
        setCompany(newData)
      }
    }).catch((err) => {
      if (err === "Session timed out, please login again") {
        toast.error("دوباره وارد حساب کاربری شوید")
        dispatch(logOut())
        naviagate("/")
      } else {
        toast.error("گرفتن اطلاعات شرکت ها با خطا روبرو شد")
      }
    })
  }
  const getGraphData = async () => {
    if (!yearSelector.in || !choiceCompany.length) return
    if (choiceCompany.length > 1) {
      getCompany.filter((i) => i.status = false)
      setChoiceCompany([])
      setDataChart("")
      return toast.warning("لطفا فقط یه شرکت راانتخاب کنید")
    }
    if (!choiceCompany[0].name) return
    const url = ["graph/getAllConnections/" + yearSelector.in, `graph/getAllNodesOfCompanies/${choiceCompany[0].name}/${yearSelector.in}`]
    const gog = await Promise.all(
      url.map(async (i) => {
        const { data } = await axios.get(i);
        return data;
      })
    );
    const body = {
      links: gog[0],
      nodes: gog[1]
    }

    setDataChart(body)
  }
  useEffect(() => {
    if (local) {
      getListCompany()
      setUserData(JSON.parse(local))
    } else {
      dispatch(logOut())
      naviagate("/")
    }
  }, [])
  useEffect(() => {
    getFilterChart()
  }, [yearSelector, chart, choiceCompany.length])
  return (
    <>
      <div className="w-full flex flex-wrap" style={{ height: 'calc(100% - 80px)' }}>
        <div className="w-9/12 p-1 max-h-screen" style={{ height: 'calc(100vh - 95px)' }}>
          {
            loading ? <Loading /> : (
              <div className='bg-gray-50 shadow-md text-gray-50 dark:bg-[#100c2a] rounded-md w-full p-2 h-full flex flex-col justify-center'>
                <div className="h-full">
                  {dataChart ? (
                    <Suspense fallback={<div>loading ...</div>}>
                      {
                        chart === "graph" ? <div className="w-full h-full overflow-hidden bg-gray-100 border-blue-gray-800 border rounded-md shadow-md"> <GraphChart graph={dataChart} /></div>
                          : <NormalChart year={yearSelector} data={dataChart} />
                      }
                    </Suspense>
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      <span className="text-blue-gray-400 text-lg">اطلاعاتی برای نمایش وجود ندارد</span>
                    </div>
                  )}
                </div>
              </div>
            )
          }
        </div>
        <div className="w-3/12 p-1 min-h-full">
          <div className="w-full flex justify-around p-2 shadow-md bg-gray-50 dark:bg-gray-800 rounded-md min-h-full flex-wrap my-class overflow-y-auto overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
            <div className="flex flex-col w-full gap-2">
              {role?.type === 0 || role?.type === 5 ? (
                <div style={{ direction: "ltr" }}>
                  <Select
                    onChange={(value: string) => setChart(value)}
                    label="انتخاب نمودار"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 }
                    }}
                    className="text-span-light dark:text-span-dark"
                    value={chart}
                  >
                    <Option value="sales/salesOfCompanyByUserId">فروش</Option>
                    <Option value="knowledge/knowledgeSalesOfCompanyByUserId">فروش دانش بنیان</Option>
                    <Option value="exports/exportsOfCompanyByUserId">صادرات</Option>
                    <Option value="employees/employeesOfCompanyByUserId">کارمندان</Option>
                    <Option value="facilities/facilitiesOfCompanyByUserId">تسهیلات مالی</Option>
                  </Select>
                </div>
              ) : (
                <div style={{ direction: "ltr" }}>
                  <Select
                    onChange={(value: string) => setChart(value)}
                    label="انتخاب نمودار"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 }
                    }}
                    className="text-span-light dark:text-span-dark"
                    value={chart}
                  >
                    <Option value="sales/salesOfCompany">فروش</Option>
                    <Option value="knowledge/knowledgeSalesOfCompany">فروش دانش بنیان</Option>
                    <Option value="exports/exportsOfCompany">صادرات</Option>
                    <Option value="employees/employeesOfCompany">کارمندان</Option>
                    <Option value="facilities/facilitiesOfCompany">تسهیلات مالی</Option>
                    <Option value="graph">ارتباط</Option>
                  </Select>
                </div>)}

              <div style={{ direction: "ltr" }}>
                <Select
                  onChange={(value: string) => { setYearSelector({ ...yearSelector, in: value }) }}
                  label="از سال"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 }
                  }}
                  className="text-span-light dark:text-span-dark"
                  value={yearSelector.in}
                >
                  <Option value="1394">1394</Option>
                  <Option value="1395">1395</Option>
                  <Option value="1396">1396</Option>
                  <Option value="1397">1397</Option>
                  <Option value="1398">1398</Option>
                  <Option value="1399">1399</Option>
                  <Option value="1400">1400</Option>
                  <Option value="1401">1401</Option>
                </Select>
              </div>
              {chart !== "graph" && (
                <div style={{ direction: "ltr" }}>
                  <Select
                    label="تا سال"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 }
                    }}
                    className="text-span-light dark:text-span-dark"
                    onChange={(value: string) => { setYearSelector({ ...yearSelector, to: value }) }}
                    value={yearSelector.to}
                  >
                    <Option value="1394">1394</Option>
                    <Option value="1395">1395</Option>
                    <Option value="1396">1396</Option>
                    <Option value="1397">1397</Option>
                    <Option value="1398">1398</Option>
                    <Option value="1399">1399</Option>
                    <Option value="1400">1400</Option>
                    <Option value="1401">1401</Option>
                  </Select>
                </div>
              )}
              {userData?.type !== 0 && choiceCompany.length ? (
                <div className='w-full shadow-md rounded-md dark:shadow-[#5c86c4] dark:bg-[#4e5255] p-2 flex flex-wrap gap-2'>
                  <span className='text-span-light dark:text-span-dark w-full'>شرکت های فیلتر شده</span>
                  {getCompany.length && getCompany.map((i) => {
                    {
                      if (i.status) {
                        return <button onClick={() => deleteCompany(i.id)} key={i.id} className='px-3 py-1 rounded-md inline-block cursor-pointer text-gray-50 bg-blue-500 shadow-md'>{i.name} <IoClose className="inline" /></button>
                      }
                    }
                  })}
                </div>
              ) : null}
              {userData?.type !== 0 && (
                <Accordion placeholder={""} open={open === 1} animate={{
                  mount: { scale: 1 },
                  unmount: { scale: 0.9 },
                }} icon={open ? <IoIosArrowUp /> : <IoIosArrowDown />}>
                  <AccordionHeader placeholder={""} className={"text-base text-span-light dark:text-span-dark font-medium dark:shadow-gray-700 border-none dark:bg-[#4e5255] shadow-md pr-2 rounded-lg py-2"} onClick={() => setOpen(open === 1 ? 0 : 1)}>نمایش شرکت ها</AccordionHeader>
                  <AccordionBody>
                    <Card placeholder={""}>
                      <List placeholder={""} className="flex flex-col gap-3 bg-gray-100 dark:bg-gray-300 rounded-md">
                        {getCompany && getCompany.map((i) => (
                          <ListItem placeholder={""} className="p-0" key={i.id}>
                            <label
                              htmlFor={i.id}
                              className="flex w-full cursor-pointer items-center px-2 py-1"
                            >
                              <ListItemPrefix placeholder={""} className="mr-3">
                                <Checkbox
                                  crossOrigin={""}
                                  onChange={filterCompany}
                                  id={i.id}
                                  ripple={false}
                                  checked={i.status}
                                  className="hover:before:opacity-0"
                                  containerProps={{
                                    className: "p-0",
                                  }}
                                />
                              </ListItemPrefix>
                              <Typography placeholder={""} color="blue-gray" className="font-medium mr-2">
                                {i.name}
                              </Typography>
                            </label>
                          </ListItem>
                        ))}
                      </List>
                    </Card>
                  </AccordionBody>
                </Accordion>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}