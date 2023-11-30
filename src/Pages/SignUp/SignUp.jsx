import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import 'animate.css';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { createUser, updateUserProfile } = useAuth();


    const onSubmit = (data) => {

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log('Logged User:', loggedUser);

                updateUserProfile(data.name, data.photoUrl)
                    .then(() => {
                        // create user entry in the database collection
                        const userInfo = {
                            name: data.name,
                            photo: data.photoUrl,
                            phone: data.phone,
                            email: data.email
                        };
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to database');

                                    reset();
                                    Swal.fire({
                                        icon: "success",
                                        title: "User Registered Successfully!!",
                                        showConfirmButton: false,
                                        timer: 1500,
                                        showClass: {
                                            popup: `
                                            animate__animated
                                            animate__fadeInUp
                                            animate__faster
                                          `
                                        },
                                        hideClass: {
                                            popup: `
                                            animate__animated
                                            animate__fadeOutDown
                                            animate__faster
                                          `
                                        }
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <img src="https://i.ibb.co/RNm0DWK/6310507.jpg" alt="" />
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-lg bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name='name' placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600 mt-2">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoUrl", { required: true })} placeholder="photo URL" className="input input-bordered" />
                                {errors.photoUrl && <span className="text-red-600 mt-2">Photo is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="text" {...register("phone", { 
                                    required: true,
                                    minLength: 11
                                 })} name="phone" placeholder="phone" className="input input-bordered" />
                                {errors.phone?.type === "required" && (
                                    <p className="text-red-600 mt-2">Phone number is required</p>
                                )}
                                {errors.phone?.type === "minLength" && (
                                    <p className="text-red-600 mt-2">Phone number must be at least 11 digits</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600 mt-2">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])./
                                })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600 mt-2">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600 mt-2">Password must be atleast 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600 mt-2">Password must be less than 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600 mt-2">Password must contain Uppercase, lowercase, number and special characters</p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Sign Up" className="btn bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white" />
                            </div>
                            <div className='text-center'>
                                <p><small>Already registered? <Link className=' text-blue-600 font-semibold hover:underline' to='/login'>Go to login</Link></small></p>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;