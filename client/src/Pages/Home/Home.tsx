import { Link } from 'react-router-dom'
export default function Home() {
    return (
        <div className='w-full h-full bg-blue-gray-900'>
            <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center flex-col">
                <h1 className="text-gray-200">به Ecosystem Scanner خوش آمدید</h1>
                <div className="p-3 bg-gray-500 rounded-md mt-3">
                    <Link to={"/auth"}>
                        رفتن به صفحه ورود/ ثبت نام
                    </Link>
                </div>
            </div>
        </div>
    )
}