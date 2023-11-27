import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";


const TeachRequest = () => {
    const {user} = useAuth();
    
    // console.log(user.email, user.displayName, user.photoURL);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) =>{
        console.log(data);
    }


    return (
        <div className="bg-[#F4F3F0] p-6 md:p-24">
            <div className="border-b border-gray-900/10">
                <h2 className="text-4xl font-extrabold mb-8 text-center ">Apply to be a Teacher</h2>
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
                                <select {...register("experience", { required: true })} defaultValue={'default'} className="input input-bordered rounded-lg w-full">
                                    <option value="default" disabled hidden>-- Select Experience Level --</option>
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
                                <select {...register("category", { required: true })} className="input input-bordered rounded-lg w-full">
                                    <option value="" selected disabled hidden>-- Select Category --</option>
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
                    {/* photo url row */}
                    <div className="md:flex mb-6 gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <label className="">
                                <input type="text" {...register("photoUrl", { required: true })} placeholder="photo URL" className="input input-bordered rounded-lg w-full" />
                                {errors.photoUrl && <span className="text-red-600 mt-2">Photo is required</span>}
                            </label>
                        </div>
                    </div>
                </div>

                <input type="submit" value="Submit for Review" className="btn w-full bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white" />
            </form>
        </div>
    );
};

export default TeachRequest;