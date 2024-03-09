import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
export default function DarkMode() {
    const [darkModes, setDarkMode] = useState<boolean>(false);
    const darkModeBtn = () => {
        if (!darkModes) {
            setDarkMode(true);
            localStorage.setItem("darkMode", "enabled");
            document.body.classList.add("dark");
        } else {
            setDarkMode(false);
            document.body.classList.remove("dark");
            localStorage.setItem("darkMode", "");
        }
    };
    useEffect(() => {
        let darkMode = localStorage.getItem("darkMode");
        if (darkMode) {
            document.body.classList.add("dark");
            setDarkMode(true);
        } else {
            document.body.classList.remove("dark");
            setDarkMode(false);
        }
    }, []);
    return (
        <div onClick={darkModeBtn} className="p-1 bg-[#1414142b] dark:bg-[#535353] shadow-md flex rounded-full justify-between w-2/12 cursor-pointer">
            <FaSun className={`text-2xl inline text-yellow-500 transition-all ${darkModes ? "opacity-10" : ""}`} />
            <FaMoon className={`text-2xl inline text-blue-600 transition-all ${darkModes ? "" : "opacity-10"}`} />
        </div>
    );
}