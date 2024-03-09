export type ProfileUserType = {
    user: {
        id: string
        type: string
        name: number
        phone: string
        url: string
        keyCompany: string
        isLoggin: boolean
        entities1: any[],
    }
}
export type FormRegisterType = {
    form: {
        status: false,
        links: { value: string, status: "pending" | "error" | "success", url: string }[]
        message: string
        listYear: string[]
        listLimitedYear: string[]
        companyId: string
    }
}