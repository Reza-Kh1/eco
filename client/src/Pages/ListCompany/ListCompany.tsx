import InfoCompany from '../../components/InfoCompany/InfoCompany'
import { Button, Dialog, DialogBody, } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaExclamation } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/slice/user'
import { Pagination } from '../../components/Pagination/Pagination'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
export default function ListCompany() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false);
  const [listCompany, setListCompany] = useState<any[]>([])
  const [infoCompany, setInfoCompany] = useState<any>()
  const [Paginations, setPaginations] = useState<number>()
  const [search, getSerch] = useState<string>()
  const navigate = useNavigate()
  const location = useLocation()
  const { skip }: any = queryString.parse(location.search);
  const getListCompany = () => {
    axios.get(`company/getAllComany` + location.search).then(({ data }) => {
      setListCompany(data.companies)
      setPaginations(data.totalPages)
    }).catch((err) => {
      if (err === "Session timed out, please login again") {
        toast.error("دوباره وارد حساب کاربری شوید")
        dispatch(logOut())
      } else {
        toast.error("گرفتن اطلاعات شرکت ها با خطا روبرو شد")
      }
    })
  }
  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (!search) return
    const body = {
      skip: 1,
      text: search,
      take: import.meta.env.VITE_PUBLIC_TAKE
    } as any
    const query = new URLSearchParams(body)
    navigate(`/admin/list-company?${query}`)
    axios.get(`company/getAllComany?${query}`).then(({ data }) => {
      setListCompany(data.companies)
      setPaginations(data.totalPages)
    }).catch((err) => {
      if (err === "Session timed out, please login again") {
        toast.error("دوباره وارد حساب کاربری شوید")
        dispatch(logOut())
      } else {
        toast.error("گرفتن اطلاعات شرکت ها با خطا روبرو شد")
      }
    })
  }
  const getInfoCompany = (id: number) => {
    axios.get("company/getComanyInfo/" + id).then(({ data }) => {
      setOpen(true)
      setInfoCompany(data)
    }).catch(() => { toast.success("با خطا روبرو شدیم") })
  }
  useEffect(() => {
    getListCompany()
  }, [skip])
  return (
    <div className='w-full flex flex-wrap' style={{ height: 'calc(100% - 80px)' }}>
      <div className="bg-gray-100 dark:bg-gray-700 p-2 py-5 rounded-md h-full flex flex-col justify-between w-full">
        <div className=" w-full flex justify-between">
          <span className="text-tag-head-light dark:text-tag-head-dark">لیست شرکت ها</span>
          <form onSubmit={searchHandler} className="relative">
            <input value={search} onChange={({ target }) => getSerch(target.value)} className="rounded-lg p-2 focus-visible:outline-none shadow-lg dark:bg-gray-400 dark:placeholder:text-gray-700 focus-visible:shadow-blue-100" type="text" placeholder="جستجو ..." />
            <button aria-hidden="true" type="submit" className="absolute flex items-center justify-center left-5 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3">
              <BsSearch className="inline" />
            </button>
          </form>
        </div>
        {listCompany.length ? (
          <>
            <table className="w-full text-sm text-left rtl:text-right mt-4 text-gray-500 dark:text-gray-400 table-rounded">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 text-center py-2">
                    #
                  </th>
                  <th scope="col" className="px-3 text-center py-2">
                    شرکت
                  </th>
                  <th scope="col" className="px-3 text-center py-2">
                    سال تاسیس
                  </th>
                  <th scope="col" className="py-2 px-3 text-center">
                    محصول
                  </th>
                  <th scope="col" className="py-2 px-3 text-center">
                    حوزه فناوری
                  </th>
                  <th scope="col" className="px-3 text-center py-2">
                    اطلاعات بیشتر
                  </th>
                </tr>
              </thead>
              <tbody>
                {listCompany.map((i, index) => (
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
                      <Button placeholder variant='gradient' color='blue' className='font-medium py-3 px-5' onClick={() => getInfoCompany(i?.id)}>
                        <span>اطلاعات</span>
                        <i><FaExclamation className="inline text-gray-50" /></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='w-full flex mt-4 rounded-md p-2 justify-between'>
              {Paginations && (
                <Pagination allPage={Paginations} page={skip} />
              )}
            </div>
          </>
        ) : (
          <div className='flex justify-center items-center mb-5'>
            <span>اطلاعاتی برای نمایش وجود ندارد</span>
          </div>
        )}
      </div>
      <Dialog placeholder  open={open} animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }} handler={setOpen} size={"xl"}>
        <DialogBody  placeholder className="h-[42rem] dialog-company overflow-y-auto bg-gray-700 rounded-md">
          {infoCompany && (
            <InfoCompany id={infoCompany} />
          )}
          <div className="text-left mt-4">
            <Button placeholder  variant="gradient" color="red" onClick={() => setOpen(false)}>
              <span>بستن</span>
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  )
}
