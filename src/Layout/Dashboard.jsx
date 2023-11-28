import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useTeacher from "../hooks/useTeacher";

const Dashboard = () => {

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
                                    <NavLink to='/dashboard/adminProfile'>
                                        <FaHome></FaHome>
                                        Admin Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/teacherRequest'>
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

                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'>
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/order'>
                            <FaSearch></FaSearch>
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/contact'>
                            <FaEnvelope></FaEnvelope>
                            Contact
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