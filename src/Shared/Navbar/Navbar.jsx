import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useTeacher from "../../hooks/useTeacher";

const Navbar = () => {
    const { user, logOut } = useAuth();
    console.log(user);
    const [isAdmin] = useAdmin();
    const [isTeacher] = useTeacher();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }


    const navLinks = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/'>All Classes</Link></li>
        <li><Link to='/teach'>Teach On Skill Sphere</Link></li>
        {
            user ? '' : <li><Link to='/login'>Login</Link></li>
        }
        
    </>

    const profileNavLinks = <>
        {
            user &&
            <>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <p className="ml-3 mt-3 font-semibold">{user.displayName}</p>
                    <div className="divider"></div>
                    {
                        user && isAdmin && <li><Link to={`/dashboard/adminProfile/${user.email}`}>Dashboard</Link></li>
                    }
                    {
                        user && isTeacher && <li><Link to={`/dashboard/teacherProfile/${user.email}`}>Dashboard</Link></li>
                    }
                    <li onClick={handleLogOut}><Link>Log Out</Link></li>
                </ul>

            </>
        }
    </>


    return (
        <div className="navbar max-w-screen-xl bg-gradient-to-r from-cyan-300/80 to-blue-500/80 sticky glass z-10 text-gray-600">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <img className="w-36" src="https://i.ibb.co/tQV1SMG/Skill-sphere-removebg-preview.png" alt="" />
            </div>
            <div className="navbar-center hidden lg:flex p-4 border-y-2 border-cyan-200 text-zinc-50 font-medium rounded-box">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end mr-5">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co/HgjNYM5/836.jpg'} />
                        </div>
                    </label>
                    {profileNavLinks}
                </div>
            </div>
        </div>
    );
};

export default Navbar;