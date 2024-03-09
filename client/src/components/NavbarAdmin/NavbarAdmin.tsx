import { useEffect, useState } from "react";
// import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
// import { IconButton } from "@material-tailwind/react";
import DarkMode from "../DarkMode/DarkMode";
import { Link } from "react-router-dom";
import "./style.css";
export default function NavbarAdmin() {
  const [time, setTime] = useState({ week: "", date: "" });
  useEffect(() => {
    const date = new Date().toLocaleDateString("fa");
    const week = new Date().toLocaleDateString("fa", {
      weekday: "long",
    });
    setTime({ week, date });
  }, []);
  return (
    <>
      <div className="flex justify-between bg-gray-50 shadow-md dark:bg-[#484848] w-full rounded-md z-10 mb-3">
        <div className="flex w-4/12 justify-start items-center">
          {/* <Link to={"/admin/ticket"} className="icon-bell mr-5">
            <IconButton variant="text">
              <FaBell className="text-xl text-span-light dark:text-gray-200" />
            </IconButton>
            <span className="info-alert">0</span>
          </Link> */}
        </div>
        <div className="flex w-4/12 p-4 items-center justify-center text-span-light dark:text-gray-200">
          <span className="mx-2">({time.week})</span>
          <span>{time.date}</span>
        </div>
        <div className="flex w-4/12 p-1 justify-end items-center">
          <DarkMode />
          <Link to={"/admin/profile"}>
            <IoMdSettings className="text-2xl inline mx-2 text-span-light dark:text-gray-200" />
          </Link>
          <figure className="h-14">
            <img className="rounded-[50%] border h-full border-gray-300"
              src={
                "/image/prof.jpg"
              } alt="" />
          </figure>
        </div>
      </div>
    </>
  );
}
