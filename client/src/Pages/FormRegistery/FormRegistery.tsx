import { Button, IconButton } from "@material-tailwind/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FormRegisterType } from "../../types/type";
export default function FormRegister() {
  const { pathname } = useLocation()
  const linkNav = ["information", "users", "sales", "danesh-bonyan", "export", "facilities"]
  const selectForm = useSelector((state: FormRegisterType) => state.form)
  const SideBarForm = ({ url, value, status }: { url: string, value: string, status: string }) => {
    return (
      <Button placeholder variant="text" className={'m-0 p-0 rounded-md font-medium text-right'}>
        <NavLink to={url} className={`${status === "complete" ? "bg-green-200" : status === "pending" ? "bg-gray-200" : "bg-red-200"}  w-full block text-base rounded-md shadow-md shadow-brown-300 dark:shadow-brown-700  dark:text-black hover:bg-orange-400 transition-all py-2 px-4 text-md`} >{value}</NavLink>
      </Button>
    )
  }
  const NavBarForm = ({ url, index }: { url: string, index: number }) => {
    return (
      <IconButton placeholder variant="text">
        <NavLink to={url} className="shadow-brown-600 hover:bg-orange-400 transition-all dark:text-span-dark bg-gray-300 dark:bg-blue-gray-700 rounded-lg px-4 py-2 text-sm">{index}</NavLink>
      </IconButton>
    )
  }
  return (
    <div className="w-full form-register">
      <div className="flex justify-center mb-3">
        <div className="flex gap-2">
          {
            pathname.split("/")[3] !== "information" && (
              <NavLink to={linkNav[linkNav.indexOf(pathname.split("/")[3]) - 1]} className="shadow-brown-600 hover:bg-orange-400 transition-all bg-gray-300 rounded-lg px-4 py-2 text-sm flex items-center dark:bg-blue-gray-700 dark:text-span-dark"><FaArrowRight /></NavLink>
            )
          }
          {linkNav.map((i, index) => (
            <NavBarForm key={index} url={i} index={index + 1} />
          ))}
          {
            pathname.split("/")[3] !== "facilities" && (
              <NavLink to={linkNav[linkNav.indexOf(pathname.split("/")[3]) + 1]} className="shadow-brown-600 hover:bg-orange-400 transition-all bg-gray-300 rounded-lg px-4 py-2 text-sm flex items-center dark:bg-blue-gray-700 dark:text-span-dark"><FaArrowLeft /></NavLink>
            )
          }
        </div>
      </div>
      <div className="w-full flex">
        <div className=" p-1 w-10/12">
          <div className="w-full bg-gray-200 dark:bg-blue-gray-800 shadow-md p-2 rounded-md">
            <Outlet />
          </div>
        </div>
        <div className="p-1 w-2/12">
          <div className="flex-wrap rounded-md">
            <div className="flex-col flex gap-2">
              {selectForm.links && selectForm.links.map((i, index) => (
                <SideBarForm value={i.value} url={i.url} key={index} status={i.status} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
