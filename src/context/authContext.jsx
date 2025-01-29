import { createContext } from 'react'
import axios from '../constants/axiosConfig'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const admin_login = async (data) => {
        let response = await axios.post("/api/auth/admin/login", data);

        if (response.status == 200) {
            localStorage.setItem("adminToken", response.data.token);
            localStorage.setItem("role","admin")
        }
    }

    const admin_logout = async () => { }

    const student_register = async ({uname,email,password}) => {
        console.log("uname",uname)
        console.log("email",email)
        console.log("pass",password)
        let response = await axios.post("/api/auth/student/register", {uname:uname,email:email,password:password});

        if (response.status == 201) {
            console.log(response.data.message)
        }
    }
    const student_login = async (data) => {
        let response = await axios.post("/api/auth/student/login", data);

        if (response.status == 200) {
            localStorage.setItem("studentToken", response.data.token);
            localStorage.setItem("role","student")
        }
    }

    const student_logout = async () => { }


    return (
        <AuthContext.Provider value={{ admin_login, admin_logout, student_login, student_logout, student_register }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;