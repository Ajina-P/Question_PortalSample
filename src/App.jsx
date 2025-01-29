import {Route, Routes} from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import AdminDashboard from './Dashboard/Admin'
import Navbar from './components/Navbar/Navbar'
import AdminLogin from './components/Auth/AdminLogin'
import StudentDashboard from './Dashboard/Student'
// import Footer from './components/Footer/Footer'
import {ToastContainer} from 'react-toastify'
import AdminRoute from './middleware/admin.jsx'
import StudentRoute from './middleware/student.jsx'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
                  

        {/* Student Routes */}
        <Route element={<StudentRoute />}>
        <Route path="/" element={<StudentDashboard />} />
        </Route>
         

        <Route path="/student/login" element={<Login />} />
        <Route path="/student/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </>
  );
}


export default App
