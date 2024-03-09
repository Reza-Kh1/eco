import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import SideBarAdmin from "../../components/SideBarAdmin/SideBarAdmin";
import { Suspense, useState } from "react";
import {
  PiCaretDoubleLeftDuotone,
  PiCaretDoubleRightDuotone,
} from "react-icons/pi";

import "./style.css";
import { Outlet } from "react-router-dom";
export default function Admin() {
  const [hiddenSidebar, setHiddenSidbar] = useState<boolean>(false);
  return (
    <div>
      <div className="w-full flex relative">
        <div
          style={{ direction: "ltr" }}
          className={`transition-all sidbar-admin right-0 top-0 h-full overflow-auto min-h-screen bg-gray-300 dark:bg-[#2b2b2b]  fixed z-[5] ${hiddenSidebar ? "hidden-sidebar sm:w-[8%] w-[10%] md:w-[6%] lg:w-[4%]" : " w-3/12 md:w-2/12"
            }`}
        >
          <SideBarAdmin />
          <div
            className={`flex ${hiddenSidebar ? "justify-center pb-2" : "justify-end p-2"}`}
            style={{ direction: "rtl" }}
          >
            <p
              className={`rounded-md cursor-pointer p-1 px-2 bg-slate-200 inline-block`}
              onClick={() => setHiddenSidbar((prev) => !prev)}
            >
              <i className="text-2xl text-tag-head-light dark:text-tag-head-dark">
                {hiddenSidebar ? (
                  <PiCaretDoubleLeftDuotone />
                ) : (
                  <PiCaretDoubleRightDuotone />
                )}
              </i>
            </p>
          </div>
        </div>
        <div
          className={`transition-all mr-auto bg-gray-300 dark:bg-[#2b2b2b] min-h-screen p-2 ${hiddenSidebar ? "w-full pr-20" : "md:w-10/12 9/12 "
            }`}
        >
          <NavbarAdmin />
          <Suspense fallback={<div>loading ...</div>}><Outlet/></Suspense>
        </div>
      </div>
    </div>
  );
}
