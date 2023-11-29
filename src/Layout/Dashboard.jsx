import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaShoppingCart, FaUsers, } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useTeacher from "../hooks/useTeacher";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();

    return (
        <div className="flex">
            {/* dashboard sidebar */}
            <div className="w-64 min-h-screen bg-gradient-to-b from-cyan-300/80 to-blue-500/80">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                {/* show if user is an admin */}
                                <li>
                                    <NavLink to={`/dashboard/adminProfile/${user.email}`}>
                                        <FaHome></FaHome>
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
                                    <NavLink to='/dashboard/classes'>
                                        <FaBook></FaBook>
                                        All Classes
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
                                                    <FaHome></FaHome>
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
                                                <NavLink to='/dashboard/userHome'>
                                                    <FaHome></FaHome>
                                                    User Home
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/dashboard/history'>
                                                    <FaCalendar></FaCalendar>
                                                    Not History
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/dashboard/cart'>
                                                    <FaShoppingCart></FaShoppingCart>
                                                    My Cart
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/dashboard/review'>
                                                    <FaAd></FaAd>
                                                    Add Review
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/dashboard/paymentHistory'>
                                                    <FaList></FaList>
                                                    Real Payment History
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
            </div>

            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;