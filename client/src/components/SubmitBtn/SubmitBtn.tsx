import { Button } from "@material-tailwind/react"
import React from "react"
import { NavLink } from "react-router-dom"
type SubmitBtnType = {
    type: "button" | "reset" | "submit"
    value: string
    classBtn?: string
    classPlus?: string | null
    icon?: React.ReactNode
    onClick?: (value: any) => void
    url?: string
    iconRight?: React.ReactNode
}
export default function SubmitBtn({ type, classBtn, value, icon, classPlus, onClick, url, iconRight }: SubmitBtnType) {
    const classButton = "bg-blue-400 text-gray-50 shadow-lg hover:bg-orange-400 transition-all px-3 py-2 text-sm text-center rounded-md"
    return (
        <Button className={classBtn ? classBtn : classButton + " " + classPlus} type={type} onClick={onClick}>
            {url ? (
                <NavLink to={url}>
                    {iconRight}
                    {value}
                    {icon}
                </NavLink>
            ) : (
                <>
                    {iconRight}
                    {value}
                    {icon}
                </>
            )}
        </Button>
    )
}
