/* eslint-disable no-undef */
import Axios from "axios";
import NProgress from "react-nprogress";
import { getWithExpiry } from "./req";
import { logOutAction } from "./reusables";
import toaster from "@/ui/toast";
// import cogotoast from "@/components/toast";

NProgress.configure({ easing: "ease", speed: 500, showSpinner: true });

// let urls = {
//   staging: ``,
//   development: "",
//   production: "",
// };
export const baseURL = "/api/";
// export const baseURL = import.meta.env.VITE_API_BASE_URL

export let auth = (route: string) => {
  return `auth/${route}`;
};

var headers = {
  "Content-Type": "application/json",
  // "withCredential": true,
  // Accept: "application/json",
};

const api = Axios.create({
  baseURL,
  headers: headers,
  timeout: 120000,
});

api.interceptors.request.use(
  (config) => {
    NProgress.start();
    const token = getWithExpiry("jwtToken");
    const bearerToken = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers["Authorization"] = bearerToken;
      // config.headers["Accept"] = "application/json";
    }
    // config.headers["Access-Control-Allow-Credentials"] = "true";
    // config.headers["Access-Control-Allow-Methods"] =
    //   "GET,PUT,POST,DELETE,PATCH,OPTIONS";
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    throw error;
  }
);

api.interceptors.response.use(
  (response) => {
    if (response) {
      NProgress.done();
      const res = response.data;
      if (
        response?.data?.message ===
        ("Unauthorized" || "Credentials Do not match our Records")
      ) {
        logOutAction();
      } else {
        NProgress.remove();
        return res;
      }
    }
    // return response;
  },
  (error) => {
    NProgress.done();
    NProgress.remove();
    if (
      error?.response?.data?.message ===
      ("Unauthorized" || "Credentials Do not match our Records")
    ) {
      logOutAction();
    }
    if (error.code === "ERR_NETWORK") {
      toaster(
        "Network Error, check network connection and try again",
        "error"
      );
      return "";
    } else if (
      error?.response?.status === 400 ||
      error?.response?.status === 401
    ) {
      return Promise.reject(error);
    } else if (error?.response?.status === 500) {
      toaster("An error occured, please try again", "error");
      return "";
    } else {
      return error.response.data ? error.response.data : error.response;
    }
    // console.error("Error:", error);
    // throw error; // Re-throw the error to propagate it further if needed
  }
);

export default api;
