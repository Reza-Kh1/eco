import { useForm } from "react-hook-form";
import InputForm from "../../InputForm/InputForm";
import { MdTitle } from "react-icons/md";
import { SiAtom } from "react-icons/si";
import { SlSettings } from "react-icons/sl";
import { BiLogoShopify } from "react-icons/bi";
import SubmitBtn from "../../SubmitBtn/SubmitBtn";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectYear, setCompanyId } from "../../../redux/slice/formRegister";
import { Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FormRegisterType, ProfileUserType } from "../../../types/type";
import { getCompanyId } from "../actions";
import { logOut } from "../../../redux/slice/user";
import axios from "axios";
type FormInformationType = {
  name: string;
  technology: string;
  usefull: string;
  product: string;
};
export default function Information() {
  const { register, handleSubmit, setValue } = useForm<FormInformationType>();
  const [year, setYear] = useState<string>();
  const [updateId, setUpdateId] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectFormRegister = useSelector(
    (state: FormRegisterType) => state.form
  );
  const selectuserProfile = useSelector((state: ProfileUserType) => state.user);
  const [message, setmessage] = useState<string | null>();
  const actionHandler = (form: FormInformationType) => {
    if (!form.name || !form.product || !form.technology || !form.usefull)
      return toast.error("تمام فرم های لازم را پر کنید");
    const body = {
      name: form.name,
      userId: selectuserProfile.id,
      application: form.usefull,
      product: form.product,
      technologyField: form.technology,
      date: year,
    };
    if (updateId) {
      axios
        .put(`company/updateCompany/${updateId}`, body)
        .then(() => {
          toast.success("اطلاعات با موفقیت به روزرسانی شد"),
            navigate("/admin/form-register/users");
        })
        .catch((err) => {
          console.log(err), toast.error("با خطا مواجه شدیم دوباره تلاش کنید");
        });
    } else {
      axios
        .post("company/postCompany", body)
        .then(() => {
          toast.success("اطلاعات با موفقیت ثبت شد"),
            navigate("/admin/form-register/users");
        })
        .catch((err) => {
          console.log(err), toast.error("با خطا مواجه شدیم دوباره تلاش کنید");
        });
    }
  };
  const getData = async () => {
    const data: any = await getCompanyId();
    console.log(data);

    if (data.error) {
      if (data.error.response.status === 403) {
        dispatch(logOut());
        navigate("/");
      }
      console.log(data.error);
    }
    if (data && !data.error) {
      dispatch(setCompanyId(data));
      setValue("name", data?.list?.name || "");
      setValue("usefull", data?.list?.application || "");
      setValue("product", data?.list?.product || "");
      setValue("technology", data?.list?.technologyField || "");
      if (data?.list?.date) {
        setYear((data?.list?.date).toString() || "");
      }
      setmessage(data?.list?.msg);
      setUpdateId(data?.list?.id || "");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="w-full">
        <h3 className="text-2xl mt-2 text-blue-400 text-center mb-5 block ">
          اطلاعات شرکت
        </h3>
        {message && (
          <div className="bg-red-200 p-2 rounded-md shadow-md my-3 dark:bg-red-400 text-gray-900">
            <span>{message}</span>
          </div>
        )}
        <span className="text-span-light dark:text-span-dark">
          تمام فیلد هارا با دقت پر کنید
        </span>
        <form
          onSubmit={handleSubmit(actionHandler)}
          className="flex mt-3 flex-wrap gap-3"
        >
          <div className="w-1/2">
            <span className="pr-2 text-span-light dark:text-span-dark mb-1 inline-block">
              نام شرکت :
            </span>
            <InputForm
              register={register}
              icon={<MdTitle />}
              placeholder="* اجباری"
              name="name"
              type="text"
            />
          </div>
          <div className="w-3/12">
            <span className="text-span-light dark:text-span-dark mb-1 inline-block">
              سال تاسیس :
            </span>
            <div style={{ direction: "ltr" }}>
              <Select
                placeholder
                onChange={(value: any) => {
                  setYear(value);
                }}
                label="انتخاب سال"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                value={year}
                className="text-span-light dark:text-span-dark"
              >
                {selectFormRegister.listYear &&
                  selectFormRegister.listYear.map((i, index) => (
                    <Option
                      key={index}
                      onClick={() => dispatch(selectYear(index))}
                      value={i}
                    >
                      {i}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>
          <div className="w-1/2">
            <span className="pr-2 text-span-light dark:text-span-dark mb-1 inline-block">
              حوزه فناوری :
            </span>
            <InputForm
              register={register}
              label=""
              placeholder="* اجباری"
              icon={<SiAtom />}
              name="technology"
              type="text"
            />
          </div>
          <div className="w-1/2">
            <span className="pr-2 text-span-light dark:text-span-dark mb-1 inline-block">
              حوزه کاربرد محصولات :
            </span>
            <InputForm
              register={register}
              label=""
              placeholder="* اجباری"
              icon={<SlSettings />}
              name="usefull"
              type="text"
            />
          </div>
          <div className="w-1/2">
            <span className="pr-2 text-span-light dark:text-span-dark mb-1 inline-block">
              حوزه محصولات :
            </span>
            <InputForm
              register={register}
              label=""
              placeholder="* اجباری"
              icon={<BiLogoShopify />}
              name="product"
              type="text"
            />
          </div>
          <div className="w-full mt-3">
            <div className="w-2/12 mr-auto">
              <SubmitBtn
                type="submit"
                value="ذخیره"
                icon={<FaArrowLeftLong className="inline mr-3" />}
                classPlus={"w-full"}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
