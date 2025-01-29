import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {

  const adminToken = localStorage.getItem("adminToken"); // Check if admin is logged in

  return adminToken ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRoute;
