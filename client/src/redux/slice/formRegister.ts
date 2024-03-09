import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    status: false,
    links: [
        { value: "اطلاعات", status: "", url: "information", name: "companyDetailsComplete" },
        { value: "کارمندان", status: "", url: "users", name: "employeesComplete" },
        { value: "صادرات", status: "", url: "export", name: "exportsComplete" },
        { value: "دانش بنیان", status: "", url: "danesh-bonyan", name: "knowledgeSalesComplete" },
        { value: "فروش", status: "", url: "sales", name: "salesComplete" },
        { value: "تسهیلات", status: "pending", url: "facilities", name: "sendToEval" },
    ],
    message: "",
    listYear: ["1394", "1395", "1396", "1397", "1398", "1399", "1400", "1401", "1402",],
    listLimitedYear: [] as any,
    companyId: "",
}
const counterSlice = createSlice({
    name: 'formRegister',
    initialState,
    reducers: {
        nextPageForm: (state, action: { payload: any }) => {
            state.message = action.payload.message || ""
            state.links.map((i) => {
                if (i.url === action.payload.url) {
                    i.status = action.payload.status
                }
                return i
            })
        },
        selectYear: (state, action: { payload: any }) => {
            const newList = state.listYear.filter((i, index) => {
                if (index > action.payload - 1) {
                    return i
                }
            })
            state.listLimitedYear = newList
        },
        setCompanyId: (state, action: { payload: { list: any, flags: any } }) => {
            state.companyId = action.payload.list.id
            const newList = state.listYear.filter((i) => {
                if (Number(i) >= action.payload.list.date) {
                    return i
                }
            })
            state.listLimitedYear = newList
            state.links = state.links.map((link) => {
                if (link.name === "sendToEval") return link
                return {
                    ...link,
                    status: action.payload.flags[link.name] ? "complete" : "incomplete"
                };
            });
        },
        listLimited: (state, action: { payload: string[] }) => {
            state.listLimitedYear = action.payload
        },
        checkFlags: (state, action: { payload: any }) => {
            state.links = state.links.map((link) => {
                if (link.name === "sendToEval") return link
                return {
                    ...link,
                    status: action.payload[link.name] ? "complete" : "incomplete"
                };
            });
        }
    },
});

export const { nextPageForm, selectYear, setCompanyId, checkFlags } = counterSlice.actions;

export default counterSlice.reducer;