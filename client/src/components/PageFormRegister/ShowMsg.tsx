import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react"
import { useState } from "react"

type ShowMsgComponent = {
    value: string | null
}
export default function ShowMsg({ value }: ShowMsgComponent) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="gradient" className="px-5 font-medium ml-2 py-2" color="light-blue" disabled={value ? false : true}>
                {value ? "نمایش پیام" : "---"}
            </Button>
            <Dialog className="bg-gray-700" open={open} handler={setOpen} size={"md"}>
                <DialogBody>
                    <p className="text-span-light dark:text-span-dark">
                        {value}
                    </p>
                </DialogBody>
                <DialogFooter placeholder={""}>
                    <div className='flex justify-between w-full'>
                        <Button variant="gradient" color="light-blue" onClick={() => setOpen(false)}>
                            <span>بستن</span>
                        </Button>
                    </div>
                </DialogFooter>
            </Dialog >
        </>
    )
}
