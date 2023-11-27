import { Navigate, useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <RingLoader color="#f2e90a" size={120}/>
    }

    if(user){
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;