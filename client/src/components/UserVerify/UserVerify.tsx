import React, { SetStateAction, useEffect, useRef } from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
type StateType = {
    phone: string;
    setShow: React.Dispatch<SetStateAction<boolean>>;
};
export default function UserIdentity({ setShow, phone }: StateType) {
    const [values, setValues] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState<number>(20);
    const ref = useRef<HTMLInputElement | null>(null);
    const handleChange = (index: number) => (e: any) => {
        if (isNaN(Number(e.target.value))) return
        if (e.target.value.length <= 1) {
            setValues([
                ...values.slice(0, index),
                e.target.value,
                ...values.slice(index + 1),
            ]);
        }
        if (e.currentTarget.nextSibling instanceof HTMLInputElement) {
            e.target.nextSibling.focus();
        }
        if (index === 5 && e.target.value) {
            keyAction(e.target.value);
        }
    };
    const handleKeyDown = (index: number) => (e: any) => {
        if (e.key !== "Backspace") return;
        if (e.target.value) {
            setValues([...values.slice(0, index), "", ...values.slice(index + 1)]);
            return;
        }
        if (
            !e.target.value &&
            e.currentTarget.previousSibling instanceof HTMLInputElement
        ) {
            setValues([...values.slice(0, index - 1), "", ...values.slice(index)]);
            e.target.previousSibling.focus();
            return;
        }
    };
    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
        const timers = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timers);
                    return 0;
                } else {
                    return prev - 1;
                }
            });
        }, 1000);
        return () => clearInterval(timers);
    }, []);
    const replaySend = () => {
        console.log("ok");
    };
    const keyAction = (value?: number) => {
        if (value) {
            const number = values;
            number[5] = value;
            return console.log(number);
        }
    };
    return (
        <div className="fixed transition-all left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 w-full bg-[#0000009c] h-full overflow-hidden">
            <div className="w-1/2 bg-gray-700 p-3 rounded-lg shadow-lg">
                <span
                    onClick={() => setShow(false)}
                    className="p-2 bg-gray-800 rounded-lg cursor-pointer shadow-lg hover:bg-gray-500"
                >
                    <i className="text-gray-50">
                        <IoClose className="inline text-3xl" />
                    </i>
                </span>
                <div className="text-center">
                    <span className="text-gray-200 text-lg">
                        کد 6 رقمی برای شما ارسال شد !
                    </span>
                </div>
                <div className="mt-3">
                    <form
                        className="flex flex-wrap justify-evenly w-8/12 mx-auto mt-7"
                    >
                        <div className=" w-full text-center mb-3">
                            <span className="text-gray-300">
                                کد به این شماره تلفن{" "}
                                <span className="text-orange-400">{phone}</span> ارسال شد
                            </span>
                        </div>
                        {values.map((value, index) => (
                            <input
                                aria-label="as"
                                aria-hidden="true"
                                ref={index === 0 ? ref : null}
                                required
                                className="block my-2 p-3 bg-gray-200 text-gray-900 w-10 rounded-lg input-identity"
                                key={index}
                                type="text"
                                value={value}
                                onChange={handleChange(index)}
                                onKeyDown={handleKeyDown(index)}
                            />
                        ))}
                        <div className="w-full text-center mt-10">
                            <span className="py-2 cursor-pointer px-6 bg-gray-200 rounded-md hover:bg-blue-400 shadow-lg">
                                ارسال کد
                            </span>
                        </div>
                    </form>
                    <div className="flex items-center justify-end">
                        <button
                            className={`py-1 px-4 shadow-md rounded-md ${Math.floor(timer % 60) === 0
                                ? "bg-gray-300 shadow-orange-300"
                                : "bg-gray-800"
                                }`}
                            onClick={replaySend}
                            disabled={Math.floor(timer % 60) === 0 ? false : true}
                        >
                            {Math.floor(timer % 60) === 0 ? (
                                "ارسال مجدد ؟"
                            ) : (
                                <span className="text-gray-100">
                                    {Math.floor(timer % 60) < 10
                                        ? "0" + Math.floor(timer % 60)
                                        : Math.floor(timer % 60)}{" "}
                                    : {"0" + Math.floor(timer / 60)}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
