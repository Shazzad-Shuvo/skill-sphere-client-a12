import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllClassRequests = () => {

    const axiosSecure = useAxiosSecure();

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allClasses`);
            return res.data;
        }
    });


    const handleApprove = (aClass) => {
        axiosSecure.patch(`/classes/approve/${aClass._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `${aClass.title} has been approved!`,
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
    const handleReject = (aClass) => {
        axiosSecure.patch(`/classes/reject/${aClass._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `${aClass.title} has been rejected`,
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

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Class Requests</h2>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Teacher Email</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((aClass, index) =>
                                <tr key={aClass._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={aClass.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{aClass.title}</td>
                                    <td>{aClass.email}</td>
                                    <td>{aClass.description.slice(0, 20)} ...</td>
                                    <td>{aClass.status}</td>
                                    <td>
                                        {
                                            aClass.status === 'pending' ?
                                                <div className="tooltip" data-tip="Approve Class">
                                                    <button
                                                        onClick={() => handleApprove(aClass)}
                                                        className="btn btn-ghost">
                                                        <FaCheckCircle className="text-green-600 text-xl"></FaCheckCircle>
                                                    </button>
                                                </div>
                                                :
                                                <button
                                                    disabled
                                                    onClick={() => handleApprove(aClass)}
                                                    className="btn btn-ghost">
                                                    <FaCheckCircle className="text-green-600 text-xl"></FaCheckCircle>
                                                </button>
                                        }

                                    </td>
                                    <td>
                                        {
                                            aClass.status === 'pending' ?
                                                <div className="tooltip" data-tip="Reject Class">
                                                    <button
                                                        onClick={() => handleReject(aClass)}
                                                        className="btn btn-ghost">
                                                        <FaTimesCircle className="text-red-600 text-xl"></FaTimesCircle>
                                                    </button>
                                                </div> :
                                                <button
                                                    disabled
                                                    onClick={() => handleReject(aClass)}
                                                    className="btn btn-ghost">
                                                    <FaTimesCircle className="text-red-600 text-xl"></FaTimesCircle>
                                                </button>

                                        }
                                    </td>
                                    <td>
                                        {
                                            aClass.status === 'approved' ?
                                                <Link to={`/dashboard/class/${aClass._id}`}>
                                                    <button
                                                        className="btn bg-gradient-to-r from-cyan-300/80 to-cyan-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-cyan-700/80 text-white">
                                                        See Progress
                                                    </button>
                                                </Link>
                                                :
                                                <button
                                                    disabled
                                                    className="btn bg-gradient-to-r from-cyan-300/80 to-cyan-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-cyan-700/80 text-white">
                                                    See Progress
                                                </button>
                                        }
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

export default AllClassRequests;