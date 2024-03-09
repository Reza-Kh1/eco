import { CiLogin } from "react-icons/ci";
import LinkMenu from "./LinkMenu";
import {
  FaUsersGear,
  FaUserGear,
} from "react-icons/fa6";
import { IoAnalytics } from "react-icons/io5";
// import { IoIosMail } from "react-icons/io";
import { ProfileUserType } from "../../types/type";
import { logOut } from "../../redux/slice/user"
import { BiSolidDashboard } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

export default function SideBarAdmin() {
  const select = useSelector((state: ProfileUserType) => state.user)
  const dispatch = useDispatch()
  const DashboardUl = () => {
    return (
      <ul className="my-1">
        <li>
          <span className="lg:text-lg block text-span-light dark:text-span-dark">داشبورد</span>
        </li>
        <li>
          <LinkMenu
            url="dashboard"
            icon={<BiSolidDashboard />}
            value="داشبورد"
          />
        </li>
        <li>
          <LinkMenu url="analyze" icon={<IoAnalytics />} value="آنالیز" />
        </li>
        <li>
          <LinkMenu
            url={`list-company?skip=1&take=${import.meta.env.VITE_PUBLIC_TAKE}`}
            icon={<FaUsersGear />}
            value="لیست شرکت ها"
          />
        </li>
      </ul>
    )
  }
  const AvailableUl = () => {
    return (
      <ul className="my-1">
        <li>
          <span className="lg:text-lg block text-span-light dark:text-span-dark">دسترسی ها</span>
        </li>
        <li>
          <LinkMenu
            url={`users?skip=1&take=${import.meta.env.VITE_PUBLIC_TAKE}`}
            icon={<FaUsersGear />}
            value="ویرایش کاربران"
          />
        </li>

      </ul>
    )
  }
  const EvaluatorUl = () => {
    return (
      <ul className="my-1">
        <li>
          <span className="lg:text-lg block text-span-light dark:text-span-dark">دسترسی ها</span>
        </li>
        <li>
          <LinkMenu
            url="form?take=10&skip=1"
            icon={<FaUsersGear />}
            value="فرم ها"
          />
        </li>
      </ul>
    )
  }
  const UserUl = () => {
    return (
      <ul className="my-1">
        <li>
          <span className="lg:text-lg block text-span-light dark:text-span-dark">دسترسی ها</span>
        </li>
        <li>
          <LinkMenu
            url="form-register/information"
            icon={<FaUsersGear />}
            value="تکمیل کردن فرم"
          />
        </li>
        <li>
          <LinkMenu url="analyze" icon={<IoAnalytics />} value="آنالیز" />
        </li>

      </ul>
    )
  }
  return (
    <div className="w-full flex flex-col p-2" style={{ direction: "rtl" }}>
      <h3 className="mx-auto text-lg dark:text-tag-head-dark text-tag-head-light mb-4">سامانه پایش دانش بنیان</h3>
      {select.type === "ADMIN" && (
        <>
          <DashboardUl />
          <AvailableUl />
        </>
      )}
      {select.type === "FULLACCESS" && (
        <DashboardUl />
      )}
      {select.type === "EVALUATOR" && (
        <EvaluatorUl />
      )}
      {select.type === "USER" && (
        <UserUl />
      )}
      {/* <ul className="my-1">
        <li>
          <span className="lg:text-lg block text-span-light dark:text-span-dark">اعلان ها</span>
        </li>
        <li>
          <LinkMenu url="/admin/ticket" icon={<IoIosMail />} value="پیام ها" />
        </li>
      </ul> */}
      <ul className="my-1">
        <li>
          <span className="lg:text-lg block text-span-light dark:text-span-dark">تنظیمات</span>
        </li>
        <li>
          <LinkMenu url="/admin/profile" icon={<FaUserGear />} value="پروفایل" />
        </li>
        <li
          onClick={() => dispatch(logOut())}
        >
          <LinkMenu url="/" icon={<CiLogin />} value="خروج" />
        </li>
      </ul>
    </div>
  );
}