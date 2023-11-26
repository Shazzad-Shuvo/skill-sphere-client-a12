import { Link } from "react-router-dom";

const Navbar = () => {


    const navLinks = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/'>All Classes</Link></li>
        <li><Link to='/'>Teach On Skill Sphere</Link></li>
        <li><Link to='/'>Sign In</Link></li>
    </>


    return (
        <div className="navbar max-w-screen-xl bg-gradient-to-r from-cyan-300/30 to-blue-500/80 z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <img className="w-32" src="https://i.ibb.co/tQV1SMG/Skill-sphere-removebg-preview.png" alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end mr-5">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <p className="ml-3 mt-3 font-semibold">Shazzad Shuvo</p>
                        <div className="divider"></div>
                        <li><a>Dashboard</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;