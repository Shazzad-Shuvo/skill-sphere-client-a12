import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import TeachRequest from "../Pages/TeachRequest/TeachRequest";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import AdminRoute from "./AdminRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import TeacherRequests from "../Pages/Dashboard/TeacherRequests/TeacherRequests";
import TeacherRoute from "./TeacherRoute";
import TeacherProfile from "../Pages/Dashboard/TeacherProfile/TeacherProfile";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import UpdateClass from "../Pages/Dashboard/UpdateClass/UpdateClass";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/teach',
        element: <PrivateRoute><TeachRequest></TeachRequest></PrivateRoute>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/login',
        element: <Login></Login>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // admin only routes
      {
        path: 'adminProfile/:email',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/users/${params.email}`)
      },
      {
        path: 'teacherRequests',
        element: <AdminRoute><TeacherRequests></TeacherRequests></AdminRoute>
      },
      {
        path: 'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },

      // teacher only routes
      {
        path: 'teacherProfile/:email',
        element: <TeacherRoute><TeacherProfile></TeacherProfile></TeacherRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/users/${params.email}`)
      },
      {
        path: 'addClass',
        element: <TeacherRoute><AddClass></AddClass></TeacherRoute>
      },
      {
        path: 'myClass',
        element: <TeacherRoute><MyClasses></MyClasses></TeacherRoute>
      },
      {
        path: 'updateClass/:id',
        element: <TeacherRoute><UpdateClass></UpdateClass></TeacherRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/classes/${params.id}`)
      }

      // normal user routes
    ]
  }
]);