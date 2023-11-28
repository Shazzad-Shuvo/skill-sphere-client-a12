import { Navigate, useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location);

    if (loading) {
        return <div className="flex justify-center items-center my-20">
            <RingLoader color="#2ebee5" size={120} />
        </div>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;


