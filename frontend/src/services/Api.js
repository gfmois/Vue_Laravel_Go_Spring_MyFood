import axios from "axios"
import Constant from "../Constant"

export default (URL) => {
    let token = localStorage.getItem('token')
    const axiosInstance = axios.create({
        baseURL: URL,
    })

    if (token) 
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`

    axiosInstance.interceptors.response.use(
        (response) => response,
        (e) => {
            if (e.response.status == "401") {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                store.dispatch(`user/${Constant.CLIENT_REMOVE}`, {
                    success: true
                })

                router.push({ name: "signin" })
            }

            return Promise.reject(e)
        }
    )

    return axiosInstance
}