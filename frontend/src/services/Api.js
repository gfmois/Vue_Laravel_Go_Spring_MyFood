import axios from "axios"
import Constant from "../Constant"
import { useCookies } from "vue3-cookies";
import store from "../store";
import { useRouter } from "vue-router";
import secret from "../secret";
const { cookies } = useCookies()
const router = useRouter()


export default (URL) => {
    let token_user = cookies.get("token_user")
    let token_client = cookies.get("token_client")
    const axiosInstance = axios.create({
        baseURL: URL,
    })
    
    axiosInstance.interceptors.request.use((config) => {
        if (config.baseURL == secret.CLIENT_SERVER && token_client) {
            
            config.headers = {
                "Authorization": `Bearer ${token_client}`,
                "Content-Type": "application/json"
            }
        }
        
        if (config.baseURL == secret.ADMIN_SERVER && token_user) {
            config.headers = {
                "Authorization": `Bearer ${token_user}`,
                "Content-Type": "multipart/form-data"
            }
        }
        return config;
    })

    axiosInstance.interceptors.response.use(
        (response) => response,
        (e) => {
            if (e.response.status == "401") {
                cookies.remove("token_user")
            }

            // if (e.response.status == "500") {
            //     cookies.remove("token_client")
            // }

            return Promise.reject(e)
        }
    )


    return axiosInstance
}