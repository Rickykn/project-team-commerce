import Axios from "axios"
import Cookies from "js-cookie"
import store from "../redux/store"
import { network_types } from "../redux/types"

const axiosInstance = Axios.create({
    baseURL: "http://localhost:2000"
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = Cookies.get("auth_token" || "")

    return config
})

axiosInstance.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        if (err.response.status === 419) {
            Cookies.remove("auth_token")

            store.dispatch({
                type: network_types.NETWORK_ERROR,
                payload: {
                    title: "Network Error",
                    description: err.response.data.message
                }
            })
        }

        return err
    }
)

export default axiosInstance
