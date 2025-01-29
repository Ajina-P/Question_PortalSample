import { Navigate, Outlet } from "react-router-dom";

const StudentRoute = () => {

  const studentToken = localStorage.getItem("studentToken"); // Check if student is logged in

  return studentToken ? <Outlet /> : <Navigate to="/student/login" />;
};

export default StudentRoute;
