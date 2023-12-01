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
import AllClassRequests from "../Pages/Dashboard/AllClassRequests/AllClassRequests";
import AllClasses from "../Pages/AllClasses/AllClasses";
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
import Payment from "../Pages/Home/Payment/Payment";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";




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
        path: '/allClass',
        element: <AllClasses></AllClasses>,
        loader: () => fetch('http://localhost:5000/allApprovedClasses')
      },
      {
        path: '/classDetails/:id',
        element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/classes/${params.id}`)
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
        path: 'allClassRequests',
        element: <AdminRoute><AllClassRequests></AllClassRequests></AdminRoute>
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
      },

      // normal user routes
      {
        path: 'userProfile/:email',
        element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/users/${params.email}`)
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>,
        loader: ({params}) => fetch(`http://localhost:5000/classes/${params.id}`)
      },
    ]
  }
]);