import Home from "./Pages/Home/Home";
import Admin from "./Pages/Admin/Admin";
import Auth from "./Pages/Auth/Auth";
import Dashboard from "./Pages/Dashboardd/Dashboard";
import Users from "./Pages/Users/Users";
import Product from "./Pages/Product/Product";
import ListCompany from "./Pages/ListCompany/ListCompany";
// import Analyze from "./Pages/Analyze/Analyze";
import Analyze from "./Pages/Analyze/Analyze";
import Ticket from "./Pages/Ticket/Ticket";
import SettingCompany from "./Pages/SettingCompany/SettingCompany";
import Profile from "./Pages/Profile/Profile";
import Setting from "./Pages/Setting/Setting";
import Tashilat from "./Pages/Tashilate/Tashilate";
import Evaluator from "./Pages/Evaluator/Evaluator";
import FormRegister from "./Pages/FormRegistery/FormRegistery";
import Information from "./components/PageFormRegister/Information/Information";
import Sales from "./components/PageFormRegister/Sales/Sales";
import Export from "./components/PageFormRegister/Export/Export";
import Facilities from "./components/PageFormRegister/Facilities/Facilities";
import RegisterUsers from "./components/PageFormRegister/RegisterUsers/RegisterUsers";
import DaneshBonyan from "./components/PageFormRegister/DaneshBonyan/DaneshBonyan";
import EvaluatorCheck from "./Pages/EvaluatorCheck/EvaluatorCheck"
export default [
    { path: '/', element: <Home /> },
    { path: '/auth', element: <Auth /> },
    {
        path: '/admin/', element: <Admin />, children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'analyze', element: <Analyze /> },
            { path: 'list-company', element: <ListCompany /> },
            { path: 'users', element: <Users /> },
            { path: 'product', element: <Product /> },
            { path: 'setting-company', element: <SettingCompany /> },
            { path: 'ticket', element: <Ticket /> },
            { path: 'Setting', element: <Setting /> },
            { path: 'profile', element: <Profile /> },
            { path: 'tashilat', element: <Tashilat /> },
            { path: 'form', element: <Evaluator /> },
            { path: 'evaluator-check/:name', element: <EvaluatorCheck /> },
            {
                path: 'form-register', element: <FormRegister />, children: [
                    { path: 'information', element: <Information /> },
                    { path: 'users', element: <RegisterUsers /> },
                    { path: 'sales', element: <Sales /> },
                    { path: 'danesh-bonyan', element: <DaneshBonyan /> },
                    { path: 'export', element: <Export /> },
                    { path: 'facilities', element: <Facilities /> },
                ]
            },
        ]
    },
    { path: '/*', element: <div>notfound</div> }
]