import { useNavigate, useRoutes } from "react-router-dom";
import routes from "./routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileUserType } from "./types/type";
import { loginUser } from "./redux/slice/user";
axios.defaults.baseURL = import.meta.env.VITE_PUBLIC_API;
function App() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Ecosystem")}`;
  const route = useRoutes(routes);
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const selectUser = useSelector((state: ProfileUserType) => state.user);
  useEffect(() => {
    if (selectUser.isLoggin) return;
    const info: any = localStorage.getItem("information");
    if (!info) {
      navigate("/");
      toast.error("لطفا دوباره وارد سیستم شوید");
      return;
    }
    dipatch(loginUser(JSON.parse(info)));
  }, []);
  return (
    <>
      <div className="w-full h-full bg-gray-700">{route}</div>
      <ToastContainer style={{ zIndex: 10000 }} autoClose={1000} />
    </>
  );
}
export default App;
