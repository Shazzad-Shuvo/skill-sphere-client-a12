import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdOutlineUploadFile } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const EnrolledClassDetails = () => {
    const classId = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: assignments = [], refetch } = useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/assignments?id=${classId.id}`);
            return res.data;
        }
    })


    // tanstack mutation
    const mutation = useMutation({
        mutationFn: async (assignmentData) => {
            return await axiosSecure.post('/submitted', assignmentData)
        }
    })

    // const submitDate = new Date().toISOString().split('T')[0];
    // console.log(submitDate);

    const handleSubmit = async (assignment) => {
        const assignmentData = {
            assignmentId: assignment._id,
            assignmentTitle: assignment.assignmentTitle,
            classId: assignment.classId,
            date: new Date().toISOString().split('T')[0],
            status: "Submitted"
        };
        console.log(assignmentData);

        // using tanstack query mutation for post request------------------
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




    return (
        <div>
            <button className="btn bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white rounded-full" onClick={() => document.getElementById('my_modal_1').showModal()}><FaPlus className="text-lg"></FaPlus> TER</button>
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
                                                onClick={() => handleSubmit(assignment)}
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