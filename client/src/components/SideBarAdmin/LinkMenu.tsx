import React from "react";
import { NavLink } from "react-router-dom";
type LinkMenu = {
  value: string;
  classLink?: string;
  url: string;
  icon: React.ReactElement;
};
export default function LinkMenu({ value, classLink, url, icon }: LinkMenu) {
  const classA =
    "text-gray-50 my-1 p-1 block hover:pr-3 mr-2 dark:hover:bg-[#475569] hover:shadow-[#bfd6ff] bg-[#fafaf7] dark:bg-[#5b5f64] hover:bg-[#edf6ff] dark:hover:shadow-[#020f25] rounded-lg transition-all min-w-[40px] shadow-md";
  return (
    <>
      <NavLink
        title={value}
        to={url}
        className={classLink ? classLink : classA + ""}
      >
        <i className="inline ml-2 text-[#5FA8D3] lg:text-xl">{icon}</i>
        <span className="span-link text-xs lg:text-sm text-span-light dark:text-span-dark">{value}</span>
      </NavLink>
    </>
  );
}
