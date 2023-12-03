import { FaBook, FaCalendar, FaHome, FaList, FaUsers, } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdLibraryAdd } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useTeacher from "../hooks/useTeacher";
import useAuth from "../hooks/useAuth";
import { MdLogout } from "react-icons/md";

const Dashboard = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    return (
        <div className="flex">
            {/* dashboard sidebar */}
            <div className="flex flex-col justify-between pb-16 w-64 min-h-screen bg-gradient-to-b from-cyan-300/80 to-blue-500/80">
                <ul className="menu p-4">
                    <div className="flex justify-center">
                        <img className="w-48" src="https://i.ibb.co/tQV1SMG/Skill-sphere-removebg-preview.png" alt="" />
                    </div>
                    <div className="divider"></div>
                    {
                        isAdmin ?
                            <>
                                {/* show if user is an admin */}
                                <li>
                                    <NavLink to={`/dashboard/adminProfile/${user.email}`}>
                                        <CgProfile className="text-lg"></CgProfile>
                                        Admin Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/teacherRequests'>
                                        <FaList></FaList>
                                        Teacher Requests
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allClassRequests'>
                                        <FaBook></FaBook>
                                        All Class Requests
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/users'>
                                        <FaUsers></FaUsers>
                                        All Users
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                {
                                    isTeacher ?
                                        <>
                                            {/* show if user is a teacher */}
                                            <li>
                                                <NavLink to={`/dashboard/teacherProfile/${user.email}`}>
                                                    <CgProfile className="text-lg"></CgProfile>
                                                    Teacher Profile
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/dashboard/addClass'>
                                                    <MdLibraryAdd></MdLibraryAdd>
                                                    Add Class
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/dashboard/myClass'>
                                                    <FaBook></FaBook>
                                                    My Classes
                                                </NavLink>
                                            </li>
                                        </>
                                        :
                                        <>
                                            {/* show if user is a general user */}
                                            <li>
                                                <NavLink to={`/dashboard/userProfile/${user.email}`}>
                                                    <CgProfile className="text-lg"></CgProfile>
                                                    User Profile
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/dashboard/enrolled'>
                                                    <FaCalendar></FaCalendar>
                                                    My Enrolled Classes
                                                </NavLink>
                                            </li>
                                        </>
                                }



                            </>
                    }

                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'>
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                </ul>
                <ul className="menu p-4">
                    <li onClick={handleLogOut}><Link><MdLogout className="text-xl"></MdLogout> Log Out</Link></li>
                </ul>
            </div>

            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;