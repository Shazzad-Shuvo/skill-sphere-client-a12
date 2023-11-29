import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateClass = () => {
    const {user} = useAuth();
    const {_id, title, price, description } = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        console.log(data);
        // image upload to imgbb and then get a url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with image url
            const classInfo = {
                title: data.title,
                price: parseFloat(data.price),
                description: data.description,
                image: res.data.data.display_url
            };

            const classRes = await axiosSecure.patch(`/classes/${_id}`, classInfo);
            console.log(classRes.data);
            if (classRes.data.modifiedCount > 0) {
                // show success message in popup
                Swal.fire({
                    title: `${data.title}'s info updated`,
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
        console.log('with image url', res.data);

    }





    return (
        <div className="min-h-screen">

            <div className="bg-[#F4F3F0] p-6 lg:p-24">
                <div className="border-b border-gray-900/10">
                    <h2 className="text-4xl font-extrabold mb-8 text-center ">Update Class</h2>
                    <h4 className="text-2xl font-semibold mb-3">Class Info</h4>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-10">
                        {/* teacher name & email */}
                        <div className="md:flex mb-6 mt-6 gap-4">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Teacher Name</span>
                                </label>
                                <label className="">
                                    <input type="text"
                                        defaultValue={user.displayName} className="input input-bordered rounded-lg w-full" disabled />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Teacher Email</span>
                                </label>
                                <label className="">
                                    <input type="text"
                                        defaultValue={user.email} className="input input-bordered rounded-lg w-full" disabled />
                                </label>
                            </div>
                        </div>
                        {/*  title & price */}
                        <div className="md:flex mb-6 gap-4">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <label className="">
                                    <input type="text"
                                    defaultValue={title}
                                    {...register("title")}
                                    className="input input-bordered rounded-lg w-full" />
                                    {errors.title && <span className="text-red-600 mt-2">Title is required</span>}
                                </label>

                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <label className="">
                                    <input type="text" {...register("price", { required: true })} 
                                    defaultValue={price}
                                    className="input input-bordered rounded-lg w-full" />
                                    {errors.price && <span className="text-red-600 mt-2">Price is required</span>}
                                </label>
                            </div>
                        </div>
                        {/* description */}
                        <div className="md:flex mb-6 gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <label className="">
                                    <textarea {...register("description", { required: true })} 
                                    defaultValue={description} 
                                    className="textarea textarea-bordered h-24 w-full" ></textarea>
                                    {errors.description && <span className="text-red-600 mt-2">Description is required</span>}
                                </label>
                            </div>
                        </div>
                        {/* image */}
                        <div className="md:flex mb-6 gap-4">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                <label className="">
                                    <input {...register('image')} type="file" className="file-input file-input-bordered w-full max-w-xs" /><br></br>
                                </label>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Update Class" className="btn w-full bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white" />
                </form>
            </div>

        </div>
    );
};

export default UpdateClass;