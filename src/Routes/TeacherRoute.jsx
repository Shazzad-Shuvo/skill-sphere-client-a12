import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTeacher from "../hooks/useTeacher";
import { RingLoader } from "react-spinners";

const TeacherRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [isTeacher, isTeacherLoading] = useTeacher();

    if (loading || isTeacherLoading) {
        return <div className="flex justify-center items-center my-20">
            <RingLoader color="#2ebee5" size={120} />
        </div>
    }

    if (user && isTeacher) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default TeacherRoute;