import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TeacherRequests = () => {

    const axiosSecure = useAxiosSecure();

    const { data: teachRequests = [], refetch } = useQuery({
        queryKey: ['teachRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teacher');
            return res.data;
        }
    });

    const handleApprove = (teacher) => {
        axiosSecure.patch(`/teacher/accept/${teacher._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `${teacher.name} has been approved as a teacher`,
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
    const handleReject = (teacher) => {
        axiosSecure.patch(`/teacher/reject/${teacher._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `${teacher.name} has been rejected`,
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
                <h2 className="text-3xl">Teacher Requests</h2>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Experience</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teachRequests.map((teacher, index) =>
                                <tr key={teacher._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={teacher.image} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.experience}</td>
                                    <td>{teacher.title}</td>
                                    <td>{teacher.category}</td>
                                    <td>{teacher.status}</td>
                                    <td>
                                        {
                                            teacher.status === 'pending' ?
                                                <button
                                                    onClick={() => handleApprove(teacher)}
                                                    className="btn bg-gradient-to-r from-green-300/80 to-green-500/80 hover:bg-gradient-to-r hover:from-teal-500/80 hover:to-green-700/80 text-white">
                                                    Approve
                                                </button> :
                                                <button
                                                    onClick={() => handleApprove(teacher)}
                                                    disabled
                                                    className="btn bg-gradient-to-r from-green-300/80 to-green-500/80 hover:bg-gradient-to-r hover:from-teal-500/80 hover:to-green-700/80 text-white">
                                                    Approve
                                                </button>
                                        }

                                    </td>
                                    <td>
                                        {
                                            teacher.status === 'pending' ?
                                                <button
                                                    onClick={() => handleReject(teacher)}
                                                    className="btn bg-gradient-to-r from-red-300/80 to-red-500/80 hover:bg-gradient-to-r hover:from-red-500/80 hover:to-red-700/80 text-white">
                                                    Reject
                                                </button> :
                                                <button
                                                    onClick={() => handleReject(teacher)}
                                                    disabled
                                                    className="btn bg-gradient-to-r from-red-300/80 to-red-500/80 hover:bg-gradient-to-r hover:from-red-500/80 hover:to-red-700/80 text-white">
                                                    Reject
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

export default TeacherRequests;