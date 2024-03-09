import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RadarChart from "../../Chart/RadarChart/RadarChart";
import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import { FaMinus } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";
type deleteTodoType = {
  status: boolean;
  text: string | null;
  id: any | null;
};
type todoListType = {
  updatedAt?: string;
  text: string;
  id: any;
};
export default function InfoCompany({ id }: { id: any }) {
  const [data, setData] = useState<any>();
  const [deleteTodo, setDeleteTodo] = useState<deleteTodoType>({
    status: false,
    text: null,
    id: null,
  });
  const [cutLine, setCutLine] = useState<string | null>();
  const [todo, setTodo] = useState<todoListType[]>([]);
  const [showTodo, setShowTodo] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<{ text: string }>();
  const {
    register: editForm,
    handleSubmit: handleEditForm,
    reset: resetEdit,
  } = useForm<{ text: string }>();
  const getTodos = () => {
    axios
      .get("massages/getAllCompanyMassages/" + id.id)
      .then(({ data }) => setTodo(data))
      .catch((err) => toast.error(err));
  };
  const ChartLi = ({
    name,
    link,
  }: {
    name: string;
    value?: any;
    link: string;
  }) => {
    return (
      <Card
        placeholder
        color="gray"
        variant="gradient"
        className="w-full flex flex-col justify-between gap-3 mx-auto max-w-[12rem] shadow-md p-8"
      >
        <CardHeader
          placeholder
          floated={false}
          shadow={false}
          color="transparent"
          className="rounded-none border-b m-0 border-white/10 pb-8 text-center"
        >
          <Typography
            placeholder
            variant="small"
            color="white"
            className="font-normal uppercase"
          >
            {name}
          </Typography>
        </CardHeader>
        <CardBody placeholder className="p-0">
          <Link to={link}>
            <Button
              placeholder
              size="sm"
              color="white"
              className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
              ripple={false}
              fullWidth={true}
            >
              نمایش
              <IoStatsChartSharp className="inline-block mr-2" />
            </Button>
          </Link>
        </CardBody>
      </Card>
    );
  };
  const closeModalDeleteTodo = () => {
    setDeleteTodo({ text: null, id: null, status: false }), resetEdit();
  };
  const createTodo = async (form: { text: string }) => {
    const body = {
      text: form.text,
      companyId: data.id,
    };
    axios
      .post("massages/postMessage", body)
      .then(() => {
        toast.success("با موفقیت افزوده شد");
        getTodos();
        reset();
      })
      .catch((err) => toast.error(err));
  };
  const handleEdit = (form: { text: string }) => {
    const body = {
      text: form.text,
    };
    axios
      .put(`massages/updateMessage/${deleteTodo.id}`, body)
      .then(() => {
        toast.info("یادداشت ویرایش شد");
        closeModalDeleteTodo();
        getTodos();
        resetEdit();
      })
      .catch((err) => toast.error(err));
  };
  const handleDeleteTodo = (id: any) => {
    if (!id) return;
    axios
      .delete("massages/deleteMessage/" + id)
      .then(() => {
        toast.warning("یادداشت حذف شد");
        closeModalDeleteTodo();
        getTodos();
      })
      .catch((err) => toast.error(err));
  };
  useEffect(() => {
    setData(id);
    getTodos();
  }, []);
  if (!data) return;
  return (
    <>
      <div className="w-full mt-2 flex flex-wrap">
        <span className="text-gray-300 text-xl block mb-3 w-full mr-3">
          اطلاعات مختصر در مورد {data.name}
        </span>
        <div className="w-8/12 p-2 flex flex-col justify-center">
          <div className="flex justify-evenly">
            <h4 className="text-xl text-gray-50 mb-4">
              نام شرکت : <span className="text-gray-300">{data.name}</span>
            </h4>
            <h4 className="text-xl text-gray-50 mb-4">
              حوزه فناوری :{" "}
              <span className="text-gray-300">{data.technologyField}</span>
            </h4>
          </div>
          <ul className="flex flex-wrap">
            <li className="text-gray-100 w-1/2 my-3 text-lg">
              سال تاسیس :{" "}
              <span className="text-gray-300">
                {data.date || "اطلاعات وارد نشده !"}
              </span>
            </li>
            <li className="text-gray-100 w-1/2 my-3 text-lg">
              شاخص سلامت :{" "}
              <span className="text-gray-300 mr-2">
                {Number(data.healthIndex)}
              </span>
            </li>
            <li className="text-gray-100 w-1/2 my-3 text-lg">
              محصولات :{" "}
              <span className="text-gray-300 mr-2">{data.product}</span>
            </li>
          </ul>
        </div>
        <div className="w-4/12 p-2">
          <Suspense fallback={<div>loading...</div>}>
            <RadarChart />
          </Suspense>
        </div>
        <div className="w-full mt-5 border-t border-green-200 pt-5">
          <span className="text-gray-50 text-lg">توصیف شرکت</span>
          <p className="text-gray-300 text-justify leading-8">{data.about}</p>
          <div className="w-full flex flex-wrap">
            <div className="w-full my-5 border-t border-green-200 pt-5">
              <span className="text-lg text-gray-50">نمودار ها</span>
            </div>
            <div className="grid w-full mb-3 grid-cols-5 gap-2 justify-evenly">
              <ChartLi
                name="فروش"
                link={`/admin/analyze?chart=sales/salesOfCompany&name=${data.id}`}
              />
              <ChartLi
                name="کارمندان"
                link={`/admin/analyze?chart=employees/employeesOfCompany&name=${data.id}`}
              />
              <ChartLi
                name="ارتباط"
                link={`/admin/analyze?chart=graph&name=${data.id}`}
              />
              <ChartLi
                name="صادرات"
                link={`/admin/analyze?chart=exports/exportsOfCompany&name=${data.id}`}
              />
              <ChartLi
                name="فروش دانش بنیان"
                link={`/admin/analyze?chart=knowledge/knowledgeSalesOfCompany&name=${data.id}`}
              />
            </div>
            <div className="w-full p-2">
              <div className="p-2 rounded-md bg-gradient-to-tl to-gray-800 from-gray-900 w-full shadow-md flex justify-between items-center">
                <span className="text-gray-50">
                  برای به دست اوردن اطلاعات تسهیلات هر شرکت در دوره های مختلف
                  کلیک کنید
                </span>
                <Link to={`/admin/tashilat?name=${data.id}&title=${data.name}`}>
                  <Button
                    placeholder
                    size="sm"
                    color="white"
                    className="hover:scale-[1.02] px-8 focus:scale-[1.02] active:scale-100"
                    ripple={false}
                    fullWidth={true}
                  >
                    نمایش
                    <IoStatsChartSharp className="inline-block mr-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full flex justify-between items-center my-5 border-t border-green-200 pt-5">
              <span className="text-lg text-gray-50">یادداشت ها</span>
              <SubmitBtn
                value="افزودن یادداشت"
                onClick={() => setShowTodo((prev) => !prev)}
                icon={
                  showTodo ? (
                    <FaMinus className="inline mr-2" />
                  ) : (
                    <FaPlus className="inline mr-2" />
                  )
                }
                type="submit"
              />
            </div>
            <div className="w-full gap-2 flex flex-col">
              {showTodo && (
                <form
                  onSubmit={handleSubmit(createTodo)}
                  className="p-2 rounded-md bg-gray-600 w-full shadow-md flex flex-col"
                >
                  <textarea
                    {...register("text", { required: true })}
                    rows={6}
                    className="w-full mt-5 rounded-md shadow-md shadow-blue-100"
                  ></textarea>
                  <div>
                    <SubmitBtn
                      value="ثبت"
                      type="submit"
                      classPlus={"w-2/12 mt-3"}
                    />
                  </div>
                </form>
              )}
              {todo.length ? (
                todo.map((i) => (
                  <div
                    key={i.id}
                    className="p-2 rounded-md bg-gray-100 w-full shadow-md flex justify-between items-center"
                  >
                    <div className="w-10/12 flex flex-col ml-2">
                      {i?.updatedAt && (
                        <div className="flex justify-between mb-2">
                          <span>
                            {new Date(i.updatedAt).toLocaleDateString("fa")}
                          </span>
                        </div>
                      )}
                      <p
                        className={`text-justify text-sm ${
                          cutLine === i.id ? "" : "cut-line"
                        }`}
                      >
                        {i.text}
                      </p>
                    </div>
                    <div className="w-2/12 flex flex-col justify-between gap-2">
                      <SubmitBtn
                        value="نمایش بیشتر"
                        type="button"
                        classPlus={"text-xs"}
                        onClick={() =>
                          i.id === cutLine ? setCutLine(null) : setCutLine(i.id)
                        }
                        icon={
                          cutLine === i.id ? (
                            <FaMinus className="inline mr-2" />
                          ) : (
                            <FaPlus className="inline mr-2" />
                          )
                        }
                      />
                      <SubmitBtn
                        value="حذف یا ویرایش"
                        type="button"
                        onClick={() =>
                          setDeleteTodo({
                            status: true,
                            text: i.text,
                            id: i.id,
                          })
                        }
                        classPlus={"text-xs bg-red-400"}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <Button
                  placeholder
                  variant="gradient"
                  color="deep-orange"
                  className="w-full flex justify-center"
                >
                  <span className="text-gray-50">
                    اولین یادداشت خود را بنویسید
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
        <Dialog
          placeholder
          open={deleteTodo.status}
          handler={closeModalDeleteTodo}
          size={"lg"}
        >
          <DialogBody placeholder>
            <form onSubmit={handleEditForm(handleEdit)}>
              <textarea
                {...editForm("text", { required: true })}
                defaultValue={deleteTodo?.text || ""}
                rows={8}
                className="w-full mt-5 rounded-md shadow-md shadow-blue-100 p-2"
              ></textarea>
            </form>
          </DialogBody>
          <DialogFooter placeholder={""}>
            <div className="flex justify-between w-full">
              <Button
                placeholder
                variant="gradient"
                color="green"
                onClick={handleEditForm(handleEdit)}
              >
                <span>ویرایش</span>
              </Button>
              <Button
                placeholder
                variant="gradient"
                color="red"
                className="mr-1"
                onClick={() =>
                  deleteTodo.id
                    ? handleDeleteTodo(deleteTodo.id)
                    : closeModalDeleteTodo()
                }
              >
                <span>حذف</span>
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
}
