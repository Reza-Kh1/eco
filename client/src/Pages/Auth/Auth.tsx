import { useEffect, useState } from "react";
import { FaPhone, FaRegUser, FaKey } from "react-icons/fa";
import InputForm from "../../components/InputForm/InputForm";
import { useForm } from "react-hook-form";
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/user";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";
import { Option, Select } from "@material-tailwind/react";
type loginType = {
    phone: string
    password: string
}
type signUpType = {
    phone: string
    name: string
    keycode: string
    passwordreply: string
    password: string
}
export default function Auth() {
    const [isLogin, setIsLogin] = useState(false);
    const [pass, setPass] = useState<string>();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectUser = useSelector((state: any) => state.user)
    const [role, setRole] = useState<string>()
    const {
        register: signUpFrom,
        handleSubmit: handleSignUpForm,
    } = useForm<signUpType>();
    const {
        register: loginForm,
        handleSubmit: handleLoginForm,
    } = useForm<loginType>();
    const signUpAction = async (form: signUpType) => {
        // if (form.password !== form.passwordreply) {
        //     toast.error("رمز با رمز تکرار شده همخوانی ندارند !")
        //     return
        // }        
        const body = {
            phoneNumber: form.phone,
            type: role,
            password: form.password,
            userName: form.keycode
        }
        axios.post("users/register", body, {
            headers: { 'Authorization': '' }
        }).then(({ data }) => {
            dispatch(loginUser(data))
            toast.success("خوش آمدین")
        }).catch((err) => {
            console.log(err)
        })
        // setShowIdentity(true)
        // setNumberPhone(form.phone)
        // const body = {
        //     phone: form.phone
        // }
    }
    const loginAction = async (form: loginType) => {
        const body = {
            phoneNumber: form.phone,
            password: form.password,
        }
        axios.post("users/login", body, {
            headers: { 'Authorization': '' }
        }).then(({ data }) => {
            dispatch(loginUser(data)), navigate("/admin/dashboard"), toast.success("خوش آمدین")
        }).catch(() => toast.error("شماره تلفن یا رمز عبور نادرست است"))
    }

    useEffect(() => {
        if (selectUser.isLoggin) {
            navigate(selectUser.url)
        }
    }, [selectUser.isLoggin])
    return (
        <>
            <div className="signup-page w-full h-screen flex items-center justify-center">
                <div className="w-4/12 mx-auto z-10 my-auto">
                    <div className="flex justify-around text-white mb-52 p-3 customize-shadow">
                        <span
                            onClick={() => {
                                setIsLogin(false);
                            }}
                            className={`btn-signUp cursor-pointer transition-all ${!isLogin ? "after:h-[1px] before:h-[1px]" : ""
                                }`}
                        >
                            ورود
                        </span>
                        <span
                            onClick={() => {
                                setIsLogin(true);
                            }}
                            className={`btn-signUp cursor-pointer transition-all ${isLogin ? "after:h-[1px] before:h-[1px]" : ""
                                }`}
                        >
                            ثبت نام
                        </span>
                    </div>
                    <div>
                        <div className={`container ${isLogin ? "log-in" : ""}`}>
                            <div className="box"></div>
                            <div className="container-forms">
                                <div className="container-info">
                                    <div className="info-item">
                                        <div className="table">
                                            <div className="table-cell text-right">
                                                {isLogin && (
                                                    <div
                                                        className="btn text-gray-50 mr-2 cursor-pointer p-2 bg-orange-400 px-4 rounded-md inline"
                                                        onClick={() => setIsLogin(false)}
                                                    >
                                                        ورود
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <div className="table">
                                            <div className="table-cell text-left">
                                                {!isLogin && (
                                                    <div
                                                        className="btn text-gray-50 ml-2 cursor-pointer p-2 bg-orange-400 px-4 rounded-md inline"
                                                        onClick={() => setIsLogin(true)}
                                                    >
                                                        ثبت نام
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container-form">
                                    <div className="form-item log-in p-5">
                                        <h3 className="text-gray-200 text-center">وارد شوید</h3>
                                        <div className="table">
                                            <div className="table-cell">
                                                <form onSubmit={handleLoginForm(loginAction)}>
                                                    <InputForm
                                                        register={loginForm}
                                                        name="phone"
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value
                                                                .replace(/[^0-9]/g, "")
                                                                .slice(0, 11);
                                                        }}
                                                        icon={<FaPhone />}
                                                        type={"text"}
                                                        required
                                                        id={"phone"}
                                                        placeholder={"مانند : 09121231212"}
                                                        label={"شماره تلفن خود را وارد کنید"}
                                                    />
                                                    <InputForm
                                                        register={loginForm}
                                                        name="password"
                                                        required
                                                        icon={<FaKey />}
                                                        type={"password"}
                                                        id={"password"}
                                                        placeholder={"*******"}
                                                        label={"پسورد خود را وارد نمایید"}
                                                    />
                                                    <SubmitBtn value="وارد شوید" type="submit" classPlus={"w-full mt-3"} />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-item sign-up p-5">
                                        <h3 className="text-gray-200 text-center">ثبت نام کنید</h3>
                                        <div className="table">
                                            <div className="table-cell">
                                                <form onSubmit={handleSignUpForm(signUpAction)}>
                                                    <InputForm
                                                        register={signUpFrom}
                                                        name="phone"
                                                        required
                                                        label="شماره تلفن خود را وارد نمایید"
                                                        id="phone-signup"
                                                        icon={<FaPhone />}
                                                        onInput={(e: any) => {
                                                            e.target.value = e.target.value
                                                                .replace(/[^0-9]/g, "")
                                                                .slice(0, 11);
                                                        }}
                                                        type="text"
                                                        placeholder="مانند : 09121231212"
                                                    />
                                                    <InputForm
                                                        register={signUpFrom}
                                                        name="keycode"
                                                        required
                                                        label="کد شرکت خود را وارد نمایید"
                                                        id="code"
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value
                                                                .replace(/[^0-9]/g, "")
                                                                .slice(0, 10);
                                                        }}
                                                        placeholder="123456789"
                                                        icon={<FaRegUser />}
                                                        type="text"
                                                    />
                                                    <InputForm
                                                        register={signUpFrom}
                                                        name="password"
                                                        required
                                                        label="در رمز خود از اعداد و علامت های (%,#,...) استفاده کنید"
                                                        id="password-signup"
                                                        placeholder="انگلیسی وارد کنید"
                                                        onInput={(e) => {
                                                            e.target.value = e.target.value.replace(
                                                                /[\u0600-\u06FF]/g,
                                                                ""
                                                            );
                                                            let val = e.target.value
                                                            if (val.length > 5) {
                                                                if (/[A-Z%-_][0-9]/.test(val)) {
                                                                    return setPass("قوی");
                                                                }
                                                                return setPass("متوسط");
                                                            }
                                                            return setPass("ضعیف");
                                                        }}
                                                        type="password"
                                                        icon={<FaKey />}
                                                    />
                                                    <span className="text-gray-300 text-sm">
                                                        سطح امنیت رمز عبور :
                                                        {pass && (
                                                            <span
                                                                className={
                                                                    pass === "ضعیف"
                                                                        ? "text-red-400"
                                                                        : pass === "متوسط"
                                                                            ? "text-yellow-200"
                                                                            : "text-green-400"
                                                                }
                                                            >
                                                                {pass}
                                                            </span>
                                                        )}
                                                    </span>
                                                    <div dir="ltr">
                                                        <Select
                                                            onChange={(value: string) => setRole(value)}
                                                            label="انتخاب موقعیت"
                                                            animate={{
                                                                mount: { y: 0 },
                                                                unmount: { y: 25 }
                                                            }}
                                                            className="text-white"
                                                            value={role}
                                                        >
                                                            <Option value="1">Admin</Option>
                                                            <Option value="2">Full Access</Option>
                                                            <Option value="4">Evaluator</Option>
                                                            <Option value="0">User</Option>
                                                        </Select>
                                                    </div>
                                                    {/* <InputForm
                                                        register={signUpFrom}
                                                        name="passwordreply"
                                                        required
                                                        label="رمز عبور خود را تکرار کنید"
                                                        id="password-reply"
                                                        placeholder="******"
                                                        type="password"
                                                        icon={<FaKey />}
                                                    /> */}
                                                    <SubmitBtn value="ثبت نام کنید" classPlus={"w-full mt-5"} type="submit" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
