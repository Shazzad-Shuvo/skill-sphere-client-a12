
import { useMutation, useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const MyClassesDetails = () => {

    const classId = useParams();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    const { data: aClass = [] } = useQuery({
        queryKey: ['aClass'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes/${classId.id}`);
            return res.data;
        }
    })

    const { data: classAssignments = [] } = useQuery({
        queryKey: ['classAssignments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/assignments`);
            return res.data;
        }
    })

    // tanstack mutation
    const mutation = useMutation({
        mutationFn: async (assignmentData) => {
            return await axiosSecure.post('/assignments', assignmentData)
        },
    })

    const onSubmit = async (data) => {
        // console.log(data);
        if (data.title || data.deadline || data.description) {
            document.getElementById('my_modal_1').close();

            const assignmentData = {
                assignmentTitle: data.title,
                deadline: data.deadline,
                description: data.description,
                classId: aClass._id,
                className: aClass.title
            };

            // using tanstack query mutation for post request------------------
            const assignmentRes = await mutation.mutateAsync(assignmentData);
            if (assignmentRes.data.insertedId) {
                reset();
                Swal.fire({
                    title: `"${data.title}" assignment added `,
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

            // const assignmentRes = await axiosSecure.post('/assignments', assignmentData);
            // if (assignmentRes.data.insertedId) {
            //     reset();
            //     Swal.fire({
            //         title: `"${data.title}" assignment added `,
            //         showClass: {
            //             popup: `
            //             animate__animated
            //             animate__fadeInUp
            //             animate__faster
            //           `
            //         },
            //         hideClass: {
            //             popup: `
            //             animate__animated
            //             animate__fadeOutDown
            //             animate__faster
            //           `
            //         }
            //     });
            // }


        }


    }




    return (
        <div>
            <SectionTitle heading={aClass.title} subHeading="See Stat and Add Assignment"></SectionTitle>
            
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mt-3">

                {/* total enrollment card */}
                <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out bg-[url('https://i.ibb.co/PjHwsT8/card-bg1.jpg')]">
                    <div className="absolute inset-0 bg-pink-900 bg-opacity-75 transition duration-300 ease-in-out"></div>
                    <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                        <div>
                            <h3 className="text-center text-white text-lg">
                                Total Enrollment
                            </h3>
                            <h3 className="text-center text-white text-3xl mt-2 font-bold">
                                {aClass.enrolledStudent}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* total assignment card */}
                <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out bg-[url('https://i.ibb.co/PjHwsT8/card-bg1.jpg')]">
                    <div className="absolute inset-0 bg-yellow-600 bg-opacity-75 transition duration-300 ease-in-out"></div>
                    <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                        <div>
                            <h3 className="text-center text-white text-lg">
                                Total Assignment
                            </h3>
                            <h3 className="text-center text-white text-3xl mt-2 font-bold">
                                {classAssignments.length}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out bg-[url('https://i.ibb.co/PjHwsT8/card-bg1.jpg')]">
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-75 transition duration-300 ease-in-out"></div>
                    <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                        <div>
                            <h3 className="text-center text-white text-lg">
                                Per Day Assignment Submitted
                            </h3>
                            <h3 className="text-center text-white text-3xl mt-2 font-bold">
                                RM 27,580
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* create assignment modal */}
            <div className="card-actions mt-10">
                <button className="btn bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white rounded-full" onClick={() => document.getElementById('my_modal_1').showModal()}><FaPlus className="text-lg"></FaPlus> Create Assignment</button>
                <dialog id="my_modal_1" className="modal -z-10">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg text-center">Create an Assignment</h3>

                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                                <div className="mb-8">
                                    {/* title */}
                                    <div className="md:flex mb-5 mt-5">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Assignment Title</span>
                                            </label>
                                            <label className="">
                                                <input {...register("title", { required: true })} type="text" name="title" className="input input-bordered rounded-lg w-full" />
                                                {errors.title && <span className="text-red-600">Assignment title is required</span>}
                                            </label>
                                        </div>
                                    </div>
                                    {/* deadline */}
                                    <div className="md:flex mb-5">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Deadline</span>
                                            </label>
                                            <label className="">
                                                <input {...register("deadline", { required: true })} type="date" name="deadline" className="input input-bordered w-full" />
                                                {errors.deadline && <span className="text-red-600">Deadline is required</span>}
                                            </label>
                                        </div>
                                    </div>
                                    {/* description */}
                                    <div className="md:flex mb-5">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Description</span>
                                            </label>
                                            <label className="">
                                                <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24 w-full" placeholder="Class Description"></textarea>
                                                {errors.description && <span className="text-red-600">Description is required</span>}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white btn-block"
                                // onClick={() => document.getElementById('my_modal_1').close()}
                                >Create</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

        </div>
    );
};

export default MyClassesDetails;