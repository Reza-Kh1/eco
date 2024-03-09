import { Button, IconButton } from "@material-tailwind/react";
import queryString from "query-string";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
type PaginationType = {
    page: number
    allPage: number
}
export function Pagination({ page, allPage }: PaginationType) {
    const { pathname, search } = useLocation()
    const { text }: any = queryString.parse(search);
    const navigate = useNavigate()
    const startPage = Math.max(1, page - 5)
    const endPage = Math.min(allPage, page + 5)
    return (
        <div className="flex items-center gap-4 w-full justify-between">
            <Button
            placeholder
                variant="text"
                className="flex items-center gap-2 rounded-full text-span-light dark:text-white"
                onClick={() => navigate(pathname + `?take=${import.meta.env.VITE_PUBLIC_TAKE}&skip=` + (Number(page) - 1) + `${text ? '&text=' + text : ""}`)}
                disabled={Number(page) === 1}
            >
                <FaArrowRight strokeWidth={2} className="h-4 w-4" />
                قبلی
            </Button>
            <div className="flex items-center gap-2 text-span-light dark:text-white">
                {page > 6 && (
                    <span>...</span>
                )}
                {allPage ?
                    Array.from({ length: Math.min(11, endPage - startPage + 1) }, (_, i) => startPage + i).map(
                        (i) => {
                            return (
                                <Link to={`${pathname}?skip=${i}&take=${import.meta.env.VITE_PUBLIC_TAKE}` + `${text ? '&text=' + text : ""}`} key={i}>
                                    <IconButton placeholder
                                        size="md"
                                        variant={Number(page) === Number(i) ? "filled" : "outlined"}
                                        color={Number(page) === Number(i) ? "gray" : "black"}
                                        className={"rounded-full"}
                                    >
                                        {i}
                                    </IconButton>
                                </Link>
                            );
                        }
                    ) : null}
                {
                    allPage - page > 5 && (
                        <span>...</span>
                    )
                }
            </div>
            <Button
            placeholder
                variant="text"
                className="flex items-center gap-2 rounded-full text-span-light dark:text-white"
                disabled={Number(page) === allPage}
                onClick={() => navigate(pathname + `?take=${import.meta.env.VITE_PUBLIC_TAKE}&skip=` + (Number(page) + 1) + `${text ? '&text=' + text : ""}`)}
            >
                بعدی
                <FaArrowLeft strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div >
    );
}
