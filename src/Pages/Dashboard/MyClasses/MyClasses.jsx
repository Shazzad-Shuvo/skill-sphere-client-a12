import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyClasses = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?email=${user.email}`);
            return res.data;
        }
    });

    const handleDeleteClass = (aClass) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/classes/${aClass._id}`);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${aClass.title} deleted successfully!`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

            }
        });
    }


    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl text-cyan-500 font-medium border-b-2 p-2 border-cyan-600 text-center">Teacher Requests</h2>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Price</th>
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
                                            <div>
                                                <div className="font-bold">{aClass.name}</div>
                                                <div className="text-sm opacity-50">{aClass.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{aClass.title}</td>
                                    <td>${aClass.price}</td>
                                    <td>{aClass.description.slice(0, 20)} ...</td>
                                    <td>{aClass.status}</td>
                                    <td>
                                        <Link to={`/dashboard/updateClass/${aClass._id}`}>
                                            <div className="tooltip" data-tip="Update Class">
                                                <button
                                                    className="btn btn-ghost">
                                                    <FaEdit className="text-lg text-green-600"></FaEdit>
                                                </button>
                                            </div>
                                        </Link>

                                    </td>
                                    <td>
                                        <div className="tooltip" data-tip="Delete Class">
                                            <button
                                                onClick={() => handleDeleteClass(aClass)}
                                                className="btn btn-ghost">
                                                <FaTrash className="text-lg text-red-600"></FaTrash>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/myClass/${aClass._id}`}>
                                            <button
                                                disabled={aClass.status === 'approved' ? false : true}
                                                className="btn bg-gradient-to-r from-cyan-300/80 to-cyan-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-cyan-700/80 text-white">
                                                Details
                                            </button>
                                        </Link>
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

export default MyClasses;