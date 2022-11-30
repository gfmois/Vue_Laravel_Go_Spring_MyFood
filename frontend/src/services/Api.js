import axios from "axios"
import { useRouter } from "vue-router"
import { useStore } from 'vuex'

export default (URL) => {
    const router = useRouter();
    const store = useStore();

    const axiosInstance = axios.create({
        baseURL: URL
    })

    return axiosInstance
}