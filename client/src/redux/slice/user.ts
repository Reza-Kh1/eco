import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    id: "",
    type: "",
    name: "",
    phone: "",
    url: "",
    companyNumber: "",
    isLoggin: false,
    entities1: [],
}
type SignUpType = {
    id: string
    companyNumber: string
    phoneNumber: string
    token: string
    type: number
    userName: string
}
export const fetchData1 = createAsyncThunk('user/fetchData1', async () => {
    const response = await axios.get('getAllusers');
    console.log("redux");

    return response.data;
});

const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: { payload: SignUpType }) => {
            const type = action.payload.type
            const token = action.payload.token
            state.companyNumber = action.payload.companyNumber
            state.name = action.payload.userName
            state.phone = action.payload.phoneNumber
            state.id = action.payload.id
            state.isLoggin = true
            if (token) {
                const body = {
                    companyNumber: action.payload.companyNumber,
                    userName: action.payload.userName,
                    phoneNumber: action.payload.phoneNumber,
                    id: action.payload.id,
                    type: type
                }
                localStorage.setItem("Ecosystem", token)
                localStorage.setItem("information", JSON.stringify(body as any))
            }
            if (type === 1) {
                state.type = "ADMIN"
                state.url = "/admin/dashboard"
                return
            }
            if (type === 2) {
                state.type = "FULLACCESS"
                state.url = "/admin/dashboard"
                return
            }
            if (type === 4) {
                state.type = "EVALUATOR"
                state.url = "/admin/form"
                return
            }
            if (type === 5) {
                state.type = "User"
                state.url = "/admin/analyze"
                return
            }
            if (type === 0) {
                state.type = "USER"
                state.url = "/admin/form-register/information"
                return
            }
        },
        logOut: (state) => {
            state.isLoggin = false
            state.name = ""
            state.phone = ""
            state.type = ""
            localStorage.removeItem("information")
            localStorage.removeItem("Ecosystem")
            axios.defaults.headers.common['Authorization'] = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData1.pending, (state) => {
                state.isLoggin = true
            })
            .addCase(fetchData1.fulfilled, (state, action) => {
                state.isLoggin = false
                state.entities1 = action.payload;
            })
    },
});

export const { loginUser, logOut } = counterSlice.actions;

export default counterSlice.reducer;