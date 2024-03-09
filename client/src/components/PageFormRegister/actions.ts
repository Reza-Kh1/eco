import axios from "axios"
export const getCompanyId = async () => {
    const infoUser = localStorage.getItem("information")
    if (!infoUser) return
    const { id } = await JSON.parse(infoUser)
    let body
    if (id) {
        await axios.get(`company/getComanyInfoByUserId/${id}`).then(({ data }) => {
            if (data) {
                body = data
            }
        }).catch((err) => {
            console.log(err)
            body = { error: err }
        })
    }
    return body
}