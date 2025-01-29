import axios from "axios"
import { showServerError } from "../Errors/serverError";
import { showCommonError } from "../Errors/commonErrors";

const baseUrl = "http://localhost:5000"


// Request Interceptor: Set Base URL
axios.interceptors.request.use((config) => {
    config.baseURL = baseUrl;

    // Get token from localStorage
    const adminToken = localStorage.getItem("adminToken"); 
    const studentToken = localStorage.getItem("studentToken"); 
    const role = localStorage.getItem("role")

    // If token exists, add Authorization header
    if (adminToken && role == "admin") {
        config.headers.Authorization = `Bearer ${adminToken}`;
    }else if(studentToken && role == "student"){
        config.headers.Authorization = `Bearer ${studentToken}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Handle Errors
axios.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status !== 500) {
        // Handle client errors (status codes other than 500)
        console.error("Client Error:", error.response.status, error.response.data.message);
        showCommonError(error.response.data.message);
    } else {
        // Handle server errors (status code 500)
        console.error("Server Error:", error.response?.data?.message);
        showServerError(error.response?.data?.message);
    }

    return Promise.reject(error);
});


export default axios;