import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { signInWithGoogle } = useAuth();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log('google sign in of:', user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })

            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="px-8 pb-8">
            <div className="divider">Or</div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn w-full">
                    <FcGoogle></FcGoogle>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;