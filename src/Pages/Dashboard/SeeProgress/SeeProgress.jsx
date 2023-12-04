import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useLoaderData } from "react-router-dom";

const SeeProgress = () => {

    const reviews = useLoaderData();

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
                            <th>Student Photo</th>
                            <th>Student Name</th>
                            <th>Class Title</th>
                            <th>Rating</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map((review, index) =>
                                <tr key={review._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={review.studentImage} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{review.studentName}</td>
                                    <td>{review.classTitle}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.description}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SeeProgress;