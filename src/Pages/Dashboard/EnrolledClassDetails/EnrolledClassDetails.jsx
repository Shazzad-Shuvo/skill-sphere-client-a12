import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdOutlineUploadFile } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";

const EnrolledClassDetails = () => {
    const classId = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    const { data: assignments = [], refetch } = useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/assignments?id=${classId.id}`);
            return res.data;
        }
    })
    const { data: className = [] } = useQuery({
        queryKey: ['className'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes/${classId.id}`);
            return res.data;
        }
    })


    // tanstack mutation for assignment submission
    const mutation = useMutation({
        mutationFn: async (assignmentData) => {
            return await axiosSecure.post('/submitted', assignmentData)
        }
    })

    const handleSubmitAssignment = async (assignment) => {
        const assignmentData = {
            assignmentId: assignment._id,
            assignmentTitle: assignment.assignmentTitle,
            classId: assignment.classId,
            date: new Date().toISOString().split('T')[0],
            status: "Submitted"
        };

        // using tanstack query mutation for assignment post request------------------
        const submitRes = await mutation.mutateAsync(assignmentData);
        if (submitRes.data.insertedId) {
            refetch();
            Swal.fire({
                title: `"${assignment.assignmentTitle}" assignment submitted`,
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
    }

    // tanstack mutation for storing teacher review-----------------------
    const revMutation = useMutation({
        mutationFn: async (teacherReview) => {
            return await axiosSecure.post('/review', teacherReview)
        }
    })

    // teacher review-------------------------------------------
    const onSubmit = async (data) => {
        // console.log(data);
        if (data.title || data.deadline || data.description) {
            document.getElementById('my_modal_1').close();

            const teacherReview = {
                studentName: user.displayName,
                studentImage: user.photoURL,
                classTitle: className.title,
                rating: data.rating,
                description: data.description
            }

            // using tanstack query mutation for review post request-----------------
            const assignmentRes = await revMutation.mutateAsync(teacherReview);
            if (assignmentRes.data.insertedId) {
                reset();
                refetch();
                Swal.fire({
                    title: "Review Submitted",
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
        }


    }




    return (
        <div>
            {/* <button className="btn bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white rounded-full" onClick={() => document.getElementById('my_modal_1').showModal()}><FaPlus className="text-lg"></FaPlus> TER</button> */}

            {/* TER modal */}
            <div className="flex justify-center mb-6 mt-10">
                <h2 className="text-3xl text-cyan-500 font-medium border-b-2 pb-2 border-cyan-600 w-4/12 text-center">Teacher evaluation</h2>
            </div>
            <div className="card-actions mt-10">
                <div className="tooltip" data-tip="Teacher Evaluation Report">
                    <button className="btn bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white rounded-full" onClick={() => document.getElementById('my_modal_1').showModal()}><FaPlus className="text-lg"></FaPlus> TER</button>
                </div>

                <dialog id="my_modal_1" className="modal -z-10">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg text-center">Rate your Experience</h3>

                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                                <div className="mb-8">
                                    {/* Rating */}
                                    <div className="md:flex mb-5 mt-5">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Rating </span>
                                            </label>
                                            <label className="">
                                                <input {...register("rating", { required: true })}
                                                    type="number"
                                                    placeholder="Enter rating between 1-5"
                                                    name="rating" className="input input-bordered rounded-lg w-full" />
                                                {errors.rating && <span className="text-red-600">Rating is required</span>}
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
                                >Submit Rating</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl text-cyan-500 font-medium border-b-2 p-2 border-cyan-600 text-center">Class Details</h2>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Assignment Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assignments.map((assignment, index) =>
                                <tr key={assignment._id}>
                                    <th>{index + 1}</th>
                                    <td>{assignment.assignmentTitle}</td>
                                    <td>{assignment.description.slice(0, 20)} ...</td>
                                    <td>{assignment.deadline}</td>
                                    <td>
                                        <div className="tooltip" data-tip="Submit Assignment">
                                            <button
                                                onClick={() => handleSubmitAssignment(assignment)}
                                                className="btn btn-ghost">
                                                <MdOutlineUploadFile className="text-lg text-green-600"></MdOutlineUploadFile> Submit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledClassDetails;