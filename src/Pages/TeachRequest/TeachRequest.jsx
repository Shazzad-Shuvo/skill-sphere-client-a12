import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";


const TeachRequest = () => {
    const [disabled, setDisabled] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // console.log(user.email);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        const teacherInfo = {
            name: data.name,
            experience: data.experience,
            title: data.title,
            category: data.category,
            image: user.photoURL,
            email: user.email,
            status: 'pending'
        };
        // console.log(teacherInfo);
        console.log(data);

        axiosSecure.post('/teacher', teacherInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    setDisabled(true);
                    Swal.fire({
                        title: "Request submitted for review",
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
                }
            })
    }

    const { data: teacherStatus = [], refetch } = useQuery({
        queryKey: ['teacherStatus', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/teacher/${user?.email}`);
            return res.data;
        }
    })
    refetch();
    console.log(teacherStatus[0]);


    return (
        <div className="min-h-screen">

            {
                teacherStatus[0]?.status === 'accepted' ?
                    <div className="flex justify-center items-center my-20">
                        <h2 className="text-5xl font-bold text-cyan-500">You have been accepted as a teacher!</h2>
                    </div>
                    :
                    <div className="bg-[#F4F3F0] p-6 md:p-24">
                        <div className="border-b border-gray-900/10">
                            <h2 className="text-4xl font-extrabold mb-8 text-center ">Apply to be a Teacher</h2>
                            <div className="flex justify-center items-center my-6">
                                {
                                    teacherStatus[0]?.status === 'pending' &&
                                    <h2 className="text-3xl font-semibold text-cyan-500">Request submitted for review</h2>
                                    ||
                                    teacherStatus[0]?.status === 'rejected' &&
                                    <h2 className="text-3xl font-semibold text-cyan-500">Sorry! Request rejected. Try again...</h2>
                                }
                            </div>
                            <h4 className="text-2xl font-semibold mb-3">Teacher Info</h4>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-10">
                                {/* name & experience */}
                                <div className="md:flex mb-6 mt-6 gap-4">
                                    <div className="form-control md:w-1/2">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <label className="">
                                            <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered rounded-lg w-full" />
                                            {errors.name && <span className="text-red-600 mt-2">Name is required</span>}
                                        </label>
                                    </div>
                                    <div className="form-control md:w-1/2">
                                        <label className="label">
                                            <span className="label-text">Experience</span>
                                        </label>
                                        <label className="">
                                            <select {...register("experience", { required: true })}
                                                defaultValue=''
                                                className="input input-bordered rounded-lg w-full">
                                                <option value='' disabled hidden>-- Select Experience Level --</option>
                                                <option value="beginner">Beginner</option>
                                                <option value="some idea">Some Idea</option>
                                                <option value="experienced">Experienced</option>
                                            </select>
                                            {errors.experience && <span className="text-red-600 mt-2">Experience is required</span>}
                                        </label>
                                    </div>
                                </div>
                                {/*  title & category */}
                                <div className="md:flex mb-6 gap-4">
                                    <div className="form-control md:w-1/2">
                                        <label className="label">
                                            <span className="label-text">Title</span>
                                        </label>
                                        <label className="">
                                            <input type="text" {...register("title", { required: true })} placeholder="Title" className="input input-bordered rounded-lg w-full" />
                                            {errors.title && <span className="text-red-600 mt-2">Title is required</span>}
                                        </label>

                                    </div>
                                    <div className="form-control md:w-1/2">
                                        <label className="label">
                                            <span className="label-text">Category</span>
                                        </label>
                                        <label className="">
                                            <select {...register("category", { required: true })}
                                                defaultValue='' className="input input-bordered rounded-lg w-full">
                                                <option value="" disabled hidden>-- Select Category --</option>
                                                <option value="web development">Web Development</option>
                                                <option value="digital marketing">Digital Marketing</option>
                                                <option value="machine learning">Machine Learning</option>
                                                <option value="data science">Data Science</option>
                                                <option value="artificial intelligence">Artificial Intelligence</option>
                                            </select>
                                            {errors.category && <span className="text-red-600 mt-2">Category is required</span>}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {
                                teacherStatus[0]?.status === 'rejected' ?
                                    <input type="submit" value="Request to another" className="btn w-full bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white" />
                                    :
                                    <input type="submit" value="Submit for Review" className="btn w-full bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white" />
                            }


                        </form>
                    </div>
            }
        </div>
    );
};

export default TeachRequest;