import { ProfileUserType } from "../../types/type";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import InputForm from "../../components/InputForm/InputForm";
import { FaRegUser, FaKey, FaInfoCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
type profileAction = {
  last: string
  password: string
  passwordreply: string
}
export default function Profile() {
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const selectUser = useSelector((state: ProfileUserType) => state.user)
  const { register, handleSubmit, reset } = useForm<profileAction>()
  const actionProfile = (form: profileAction) => {
    if (form.password !== form.passwordreply) {
      toast.warning("پسورد جدید رو درست وارد کنید")
    }
    const body = {
      currentPassword: form.last,
      newPassword: form.password
    }
    axios.put(`changePasswordGeneral/${selectUser.id}`, body).then(() => { reset(), toast.success("پسورد با موفقیت تغییر یافت"), setShowEdit(false) }
    ).catch((err) => toast.error(err))
  }
  return (
    <>
      <div className="w-full h-[80%] items-center flex justify-center">
        <div className="h-96 flex w-8/12">
          {showEdit ? (
            <div className={`shadow-md rounded-s-md w-6/12 transition-all bg-blue-200 p-3 ${showEdit ? "opacity-100 visible" : "invisible opacity-0"}`}>
              <form className="w-full flex flex-col justify-evenly" onSubmit={handleSubmit(actionProfile)}>
                <div>
                  <InputForm register={register} type="text" required label="پسورد قبلی" icon={<FaRegUser />} name="last" />
                </div>
                <div>
                  <InputForm register={register} type="password" required label="پسورد جدید" icon={<FaKey />} name="password" />
                </div>
                <div>
                  <InputForm register={register} type="password" required label="تکرار پسورد" icon={<FaKey />} name="passwordreply" />
                </div>
                <div className="w-full mt-10 text-center">
                  <button className="bg-orange-400 hover:bg-blue-500 text-gray-50 transition-all shadow-lg rounded-md py-2 w-5/12" type="submit">ذخیره</button>
                </div>
              </form>
            </div>
          ) : (<div className="bg-blue-200 shadow-md rounded-s-md p-3 w-6/12  transition-all">
            <span className="w-full text-center text-xl">مشخصات</span>
            <div className="w-full grid grid-cols-2 gap-3 mt-4 py-1 justify-around">
              <div className="">
                <span>نام : {selectUser.name}</span>
              </div >
              <div className="">
                <span>شماره تلفن : {selectUser.phone}</span>
              </div>
              <div className="">
                <span>کد ملی : {selectUser.type}</span>
              </div>
              <div className="">
                <span>کد ملی : {selectUser.type}</span>
              </div>
            </div >
            <div className="border-t-gray-700 border-solid border-t pt-3 mt-3">
              <span>موقعیت فردی</span>
            </div>
          </div>)}

          <div className="bg-orange-300 shadow-md rounded-e-md p-3 w-6/12 flex transition-all flex-col justify-center items-center">
            <figure className="w-6/12">
              <img src={"/image/prof.jpg"} alt="profile"
                className="rounded-[50%] border border-gray-300 shadow-lg w-full" />
            </figure>
            <figcaption onClick={() => setShowEdit(prev => !prev)} className="flex items-center px-3 w-7/12 justify-center py-1 cursor-pointer bg-blue-300 shadow-lg border border-orange-400 hover:bg-orange-600 mt-4 rounded-md">
              <span className="text-gray-50">ویرایش</span>
              <i className="text-xl mt-3 text-gray-100 mr-1">{showEdit ? <FaInfoCircle className="inline-block mb-2" /> : <FaPencilAlt className="inline-block mb-2" />}</i>
            </figcaption>
          </div>
        </div>
      </div>
    </>
  )
}
