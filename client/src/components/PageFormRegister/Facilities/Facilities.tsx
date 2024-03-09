import SubmitBtn from "../../SubmitBtn/SubmitBtn";
import { FaArrowRightLong, FaCheck } from "react-icons/fa6";
import { FormRegisterType } from "../../../types/type";
import { useDispatch, useSelector } from "react-redux";
import { Button, Option, Select } from "@material-tailwind/react";
import { TbNumbers } from "react-icons/tb";
import InputForm from "../../InputForm/InputForm";
import { FaExclamation } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getCompanyId } from "../actions";
import { checkFlags, setCompanyId } from "../../../redux/slice/formRegister";
import { logOut } from "../../../redux/slice/user";
import ShowMsg from "../ShowMsg";
type facilitiesType = {
  msg: string;
  name: String;
  title: String;
  tashilat: String;
  motevali: String;
  date: string;
  numbers: String;
  id: string;
  companyId?: string;
  evalApproved?: boolean;
  type: number;
  quantity: number | null;
  tedad: number | null;
};
type DemoTableType = {
  date: string;
  id: string;
  motevali: string;
  name: string;
  quantity: string;
  tashilat: string;
  title: string;
};
export default function Facilities() {
  const selectFormRegister = useSelector(
    (state: FormRegisterType) => state.form
  );
  const { register, getValues, setValue } = useForm();
  const [allData, setAllData] = useState<facilitiesType[]>([]);
  const [demoTable, setDemoTable] = useState<DemoTableType[]>([]);
  const [facSelectTodo, setFacSelectTodo] = useState<string>("");
  const [facSelect, setFacSelect] = useState<string>("");
  const [editId, setEditId] = useState<string>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [year, setYear] = useState<string>("");
  const editTodo = (value: facilitiesType) => {
    setEditId(value.id);
    setFacSelectTodo(value.type.toString());
    setValue(`${value.id}title`, value.name);
    setValue(`${value.id}motevali`, value.motevali);
    setValue(`${value.id}numbers`, value.quantity || value.tedad || 0);
  };
  const deleteTodo = (id: string) => {
    axios
      .delete(`facilities/deleteFacility/${id}`)
      .then(() => {
        toast.success("رکورد حذف شد");
        getList();
      })
      .catch((err) => {
        toast.warning("حذف با خطا روبرو شد"), console.log(err);
      });
  };
  const createTodo = (id: string, years: string) => {
    if (!selectFormRegister.companyId) return;
    const title = getValues(`${id}title`);
    const motevali = getValues(`${id}motevali`);
    const numbers = getValues(`${id}numbers`).toString();
    const body: any = {
      companyId: selectFormRegister.companyId,
      name: title,
      motevali,
      type: facSelect,
      date: years,
    };
    if (facSelect === "1" || facSelect === "2") {
      body.quantity = numbers.replace(/,/g, "");
    } else {
      body.tedad = numbers.replace(/,/g, "");
    }
    axios
      .post("facilities/postFacility", body)
      .then(() => {
        toast.success("رکورد افزوده شد"), deleteTable(id), getList();
      })
      .catch(() => {
        toast.error("اطلاعات ذخیره نشدند");
      });
  };
  const saveTodo = (id: string, years: string) => {
    if (!selectFormRegister.companyId) return;
    const title = getValues(`${id}title`);
    const motevali = getValues(`${id}motevali`);
    const numbers = getValues(`${id}numbers`).toString();
    const body: any = {
      companyId: selectFormRegister.companyId,
      name: title,
      motevali,
      type: facSelectTodo,
      date: years,
    };
    if (facSelectTodo === "1" || facSelect === "2") {
      body.quantity = numbers.replace(/,/g, "");
    } else {
      body.tedad = numbers.replace(/,/g, "");
    }
    console.log(body);
    axios
      .put(`facilities/updateFacility/${id}`, body)
      .then(() => {
        toast.success("رکورد آپدیت شد"), getList(), setEditId("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("اطلاعات آپدیت نشدند");
      });
  };
  const createTable = () => {
    const value = getValues("number") as number;
    const body = [];
    for (let i = 0; i < value; i++) {
      let id = Math.random() * 10000;
      let length = {
        name: "",
        title: "",
        tashilat: "",
        motevali: "",
        date: year,
        quantity: "",
        id: id.toFixed(),
      };
      body.push(length);
    }
    setDemoTable(body);
    setValue("number", "");
    setYear("");
  };
  const verifyEval = () => {
    axios
      .get(`users/sendToEval/${selectFormRegister?.companyId}`)
      .then(() => {
        toast.success("اطلاعات برای بازرس ارسال شد");
        navigate("/admin/analyze");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteTable = (id: string) => {
    const newTable = demoTable.filter((i) => i.id !== id);
    setDemoTable(newTable);
  };
  const getData = async () => {
    let data: any;
    if (!selectFormRegister.companyId) {
      data = await getCompanyId();
      if (data.error) {
        if (data.error.response.status === 403) {
          dispatch(logOut());
          navigate("/");
        }
        console.log(data.error);
      }
      if (data && !data.error) {
        dispatch(setCompanyId(data));
      }
    }
  };
  const getList = () => {
    if (!selectFormRegister?.companyId) return;
    axios
      .get(`facilities/allFacilitiesOfCompany/${selectFormRegister?.companyId}`)
      .then(({ data }) => {
        if (data.flags) {
          dispatch(checkFlags(data.flags));
        }
        setAllData(data.list);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getList();
  }, [selectFormRegister?.companyId]);
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full min-h-80 flex flex-col justify-between">
      <div>
        <span className="text-2xl mt-2 text-blue-400 text-center mb-5 block">
          تسهیلات
        </span>
        <div className="w-full flex justify-evenly items-end mb-3">
          <div className="w-2/6">
            <span>سال تسهیلات خود را انتخاب کنید</span>
            <div className="w-full mt-2" style={{ direction: "ltr" }}>
              <Select
                placeholder
                onChange={(value: any) => setYear(value)}
                label="سال"
                value={year}
              >
                {selectFormRegister.listLimitedYear &&
                  selectFormRegister.listLimitedYear.map((i, index) => (
                    <Option key={index} value={i}>
                      {i}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>
          <div className="w-2/6">
            <span className="mb-2 block">تعداد تسهیلات خود را انتخاب کنید</span>
            <InputForm
              type="text"
              placeholder="عدد وارد کنید"
              onInput={(e) => {
                const value = e.target.value;
                const comma = value.replace(/,/g, "");
                const formattedValue = comma.replace(/[^0-9,]/g, "");
                e.target.value = Number(formattedValue).toLocaleString("en");
              }}
              register={register}
              name="number"
              icon={<TbNumbers />}
            />
          </div>
          <Button
            placeholder
            onClick={createTable}
            variant="gradient"
            className="w-1/6"
            color="blue"
          >
            افزودن
            <FaExclamation className="inline-block mr-2" />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <span>لیست تسهیلات</span>
          {allData.length &&
            allData.map((i, index) => (
              <div
                key={index}
                className="w-fullf flex flex-col bg-blue-gray-100 p-2 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <span>
                    سال :{" "}
                    {Number(i.date).toLocaleString("fa").replace(/٬/g, "")}
                  </span>
                  {i?.evalApproved === true ? (
                    <span className="rounded-md px-4 text-xs text-gray-900 py-2 bg-green-300">
                      تایید شده
                    </span>
                  ) : i?.evalApproved === false ? (
                    <span className="rounded-md px-4 text-xs text-gray-900 py-2 bg-red-100">
                      تایید نشده
                    </span>
                  ) : (
                    <span className="rounded-md px-4 text-xs text-gray-900 py-2 bg-gray-200">
                      ثبت نشده
                    </span>
                  )}
                  <div>
                    <ShowMsg value={i.msg} />
                    <Button
                      placeholder
                      variant="gradient"
                      color="red"
                      className="px-5 font-medium ml-2 py-2"
                      onClick={() => deleteTodo(i.id)}
                    >
                      حذف
                    </Button>
                    {editId === i.id ? (
                      <Button
                        placeholder
                        variant="gradient"
                        color="green"
                        className="px-5 font-medium py-2"
                        onClick={() => saveTodo(i.id, i.date)}
                      >
                        ذخیره
                      </Button>
                    ) : (
                      <>
                        {!i.companyId ? (
                          <Button
                            placeholder
                            variant="gradient"
                            color="blue-gray"
                            className="px-5 font-medium py-2"
                            onClick={() => createTodo(i.id, i.date)}
                          >
                            ثبت
                          </Button>
                        ) : (
                          <Button
                            placeholder
                            variant="gradient"
                            color="blue"
                            className="px-5 font-medium py-2"
                            onClick={() => editTodo(i)}
                          >
                            ویرایش
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {editId === i.id || !i.companyId ? (
                  <div className="flex flex-wrap justify-between items-center mt-3">
                    <div className="w-3/12 p-1">
                      <span className="block mb-2 text-sm">عنوان :</span>
                      <InputForm
                        type="text"
                        placeholder="عنوان"
                        register={register}
                        name={`${i.id}title`}
                      />
                    </div>
                    <div className="w-3/12 p-1">
                      <span className="block mb-2 text-sm">متولی :</span>
                      <InputForm
                        type="text"
                        placeholder="متولی"
                        register={register}
                        name={`${i.id}motevali`}
                      />
                    </div>
                    <div className="w-3/12">
                      <span className="block mb-2 text-sm">تسهیلات :</span>
                      <div className="w-full p-1" style={{ direction: "ltr" }}>
                        <Select
                          placeholder
                          className=" min-w-36"
                          onChange={(value: any) => setFacSelectTodo(value)}
                          label="تسهیلات"
                          value={facSelectTodo}
                        >
                          <Option value={"1"}>مالی مستقیم</Option>
                          <Option value={"2"}>مالی غیر مستقیم</Option>
                          <Option value={"3"}>خدمت</Option>
                          <Option value={"4"}>تسهیلگری</Option>
                          <Option value={"5"}>غیر مالی (سایر)</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="w-3/12 p-1">
                      <span className="block mb-2 text-sm">
                        مبلغ یا تعداد :
                      </span>
                      <InputForm
                        type="text"
                        register={register}
                        placeholder="مبلغ یا تعداد"
                        onInput={(e) => {
                          const value = e.target.value;
                          const comma = value.replace(/,/g, "");
                          const formattedValue = comma.replace(/[^0-9,]/g, "");
                          e.target.value =
                            Number(formattedValue).toLocaleString("en");
                        }}
                        name={`${i.id}numbers`}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-between items-center mt-3">
                    <div className="w-3/12 p-1">
                      <span className="text-sm">عنوان :</span>
                      <span className="block px-3 py-1 rounded-md bg-gray-50 mt-2">
                        {i.name}
                      </span>
                    </div>
                    <div className="w-3/12 p-1">
                      <span className="text-sm">متولی :</span>
                      <span className="block px-3 py-1 rounded-md bg-gray-50 mt-2">
                        {i.motevali}
                      </span>
                    </div>
                    <div className="w-3/12 p-1">
                      <span className="text-sm">تسهیلات :</span>
                      <span className="block px-3 py-1 rounded-md bg-gray-50 mt-2">
                        {i?.type === 1
                          ? "مالی مستقیم"
                          : i?.type === 2
                          ? "مالی غیر مستقیم"
                          : i?.type === 3
                          ? "خدمت"
                          : i?.type === 4
                          ? "تسهیلگری"
                          : "غیرمالی (سایر)"}
                      </span>
                    </div>
                    <div className="w-3/12 p-1">
                      <span className="text-sm">تعداد یا مبلغ :</span>
                      <span className="block px-3 py-1 rounded-md bg-gray-50 mt-2">
                        {i?.tedad
                          ? Number(i.tedad).toLocaleString("fa")
                          : Number(i?.quantity).toLocaleString("fa")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          {demoTable.length
            ? demoTable.map((i, index) => (
                <div
                  key={index}
                  className="w-fullf flex flex-col bg-blue-gray-100 p-2 rounded-md"
                >
                  <div className="flex justify-between items-center">
                    <span>
                      سال :{" "}
                      {Number(i.date).toLocaleString("fa").replace(/٬/g, "")}
                    </span>
                    <span className="rounded-md px-4 text-xs text-gray-900 py-2 bg-gray-200">
                      ثبت نشده
                    </span>
                    <div>
                      <Button
                        placeholder
                        variant="gradient"
                        color="red"
                        className="px-5 font-medium ml-2 py-2"
                        onClick={() => deleteTable(i.id)}
                      >
                        حذف
                      </Button>
                      <Button
                        placeholder
                        variant="gradient"
                        color="green"
                        className="px-5 font-medium py-2"
                        onClick={() => createTodo(i.id, i.date)}
                      >
                        ذخیره
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between items-center mt-3">
                    <div className="w-3/12 p-1">
                      <span className="block mb-2 text-sm">عنوان :</span>
                      <InputForm
                        type="text"
                        placeholder="عنوان"
                        register={register}
                        name={`${i.id}title`}
                      />
                    </div>
                    <div className="w-3/12 p-1">
                      <span className="block mb-2 text-sm">متولی :</span>
                      <InputForm
                        type="text"
                        placeholder="متولی"
                        register={register}
                        name={`${i.id}motevali`}
                      />
                    </div>
                    <div className="w-3/12">
                      <span className="block mb-2 text-sm">تسهیلات :</span>
                      <div className="w-full p-1" style={{ direction: "ltr" }}>
                        <Select
                          placeholder
                          className=" min-w-36"
                          onChange={(value: any) => setFacSelect(value)}
                          label="تسهیلات"
                          value={""}
                        >
                          <Option value={"1"}>مالی مستقیم</Option>
                          <Option value={"2"}>مالی غیر مستقیم</Option>
                          <Option value={"3"}>خدمت</Option>
                          <Option value={"4"}>تسهیلگری</Option>
                          <Option value={"5"}>غیر مالی (سایر)</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="w-3/12 p-1">
                      <span className="block mb-2 text-sm">
                        مبلغ یا تعداد :
                      </span>
                      <InputForm
                        type="text"
                        register={register}
                        placeholder="مبلغ یا تعداد"
                        onInput={(e) => {
                          const value = e.target.value;
                          const comma = value.replace(/,/g, "");
                          const formattedValue = comma.replace(/[^0-9,]/g, "");
                          e.target.value =
                            Number(formattedValue).toLocaleString("en");
                        }}
                        name={`${i.id}numbers`}
                      />
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="w-full flex justify-between mt-5">
        <div className="w-2/12">
          <Link to={"/admin/form-register/sales"}>
            <SubmitBtn
              type="button"
              value="صفحه قبلی"
              iconRight={<FaArrowRightLong className="inline ml-3" />}
              classPlus={"w-full"}
            />
          </Link>
        </div>
        <div className="w-2/12">
          <Button
            placeholder
            color="green"
            onClick={verifyEval}
            className="w-full"
            variant="gradient"
          >
            <span>ارزیابی فرم</span>
            <FaCheck className="inline mr-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
