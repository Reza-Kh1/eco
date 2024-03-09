import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
type SendMassageType = {
    classNmae?: string
    value?: string
    id: string
    name: string
}
export default function SendMassage({ classNmae, value, id, name }: SendMassageType) {
    const [massage, setMassage] = useState<string>()
    const [open, setOpen] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)
    const sendMassage = () => {
        if (!massage) return
        const body = {
            msg: massage,
            section: name,
            id
        }
        axios.put('eval/sendmsg/', body).then(() => {
            toast.success("پیام شما ارسال شد")
            setDisabled(true)
            setOpen(false)
        }).catch((err) => {
            toast.warning("پیام ارسال نشد!")
            console.log(err)
        })
    }
    return (
        <>
            <div className="w-full">
                <Button variant="gradient" className={classNmae} onClick={() => setOpen(true)} disabled={disabled} color="teal">
                    <span>ارسال پیام </span>
                    <span>{value}</span>
                </Button>
            </div>
            <Dialog open={open} handler={setOpen} className="dark:bg-gray-700" size={"lg"} placeholder="">
                <DialogBody>
                    <span className="dark:text-span-dark">شما مجاز هستید که برای هر بخش فقط یه پیام ارسال بکنید</span>
                    <textarea placeholder="متن راهنمایی خود را اینجا وارد نمایید" value={massage} onChange={({ target }) => setMassage(target.value)} rows={8}
                        className='w-full mt-5 rounded-md focus-visible:outline-none bg-gray-100 shadow-md p-2 dark:bg-span-light dark:text-span-dark' >
                    </textarea>
                </DialogBody>
                <DialogFooter placeholder={""}>
                    <div className='flex justify-between w-full'>
                        <Button variant="gradient" color="green" onClick={sendMassage}>
                            <span>ارسال</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="red"
                            className="mr-1"
                            onClick={() => setOpen(false)}
                        >
                            <span>حذف</span>
                        </Button>
                    </div>
                </DialogFooter>
            </Dialog>
        </>
    )
}
