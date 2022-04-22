import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../lib/api";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const userToken = Cookies.get("auth_token");

    if (userToken) {
      try {
        const userResponse = await axiosInstance.get("auth/refresh-token");

        Cookies.set("auth_token", userResponse?.data?.result?.token || "");

        dispatch({
          type: auth_types.LOGIN_USER,
          paylaod: userResponse.data.result.user,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return children;
};

export default AuthProvider;
