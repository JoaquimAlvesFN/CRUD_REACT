import axios, { AxiosError } from "axios";
import { APIKEY, BASE_URL } from "./endpoints";
import {  } from "react-router-dom";

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    async (config: any) => {
        if (!config.url?.endsWith("token") || !config.url.endsWith("signup")) {
            const token = localStorage.getItem("@CRUD:token");

            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            config.headers["apikey"] = APIKEY;
        }

        return config;
    },
    (error: any) => {
        console.log(error);
        // throw new Error(error.message);
    }
);

api.interceptors.response.use(
    (response) => {
      // Do something with response data
        return response;
    },
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            console.log("DESAUTENTICADO REALIZAR LOGIN");
            localStorage.removeItem("@CRUD:token");
            // return (
                // window.location.href(window.location.hostname + "/")
            // )
            // const tokenRefresh = await (
            //     await api.get("ws/auth/token/gerar")
            // ).data.token;

            // return axios(tokenRefresh);
        }
    }
);

export default api;