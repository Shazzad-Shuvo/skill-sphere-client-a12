import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} has been converted to Admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }



    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All User</h2>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photo} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className="tooltip" data-tip="Make Admin">
                                            {
                                                user.role === 'admin' ? 'Admin' : <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="btn bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white">
                                                    <FaUsers className="text-white text-xl"></FaUsers>
                                                </button>
                                            }
                                        </div>

                                    </td>
                                    <td>

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

export default AllUsers;