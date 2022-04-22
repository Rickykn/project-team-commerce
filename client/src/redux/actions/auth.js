import Cookies from "js-cookie"
import { auth_types, network_types } from "../types"
import api from "../../lib/api"

export const userLogin = (values, setSubmitting) => {
    return async (dispatch) => {
        try {
            const res = await api.post("/auth/login", {
                username: values.username,
                password: values.password
            })

            const userResponse = res.data.result

            Cookies.set("auth_token",userResponse.token)

            dispatch({
                type: auth_types.LOGIN_USER,
                payload: userResponse.user
            })
            setSubmitting(false)
        } catch (err) {
            console.log(err)
            dispatch({
                type: network_types.NETWORK_ERROR,
                payload: {
                    title: "Login failed",
                    description: err.message
                }
            })
        }
    }
}