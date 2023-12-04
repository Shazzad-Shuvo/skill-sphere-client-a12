import { useLoaderData } from "react-router-dom";

const AdminProfile = () => {
    const admin = useLoaderData();

    return (
        <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
            <div className="card w-3/4 mx-auto bg-white  shadow-xl hover:shadow">
                <img className="w-32 h-32 mx-auto rounded-full -mt-20 border-8 border-white" src={admin.photo} alt=""/>
                <p className="text-center mt-2 text-sm md:text-3xl font-medium">{admin.name}</p>
                <p className="text-center mt-2 font-light text-xs md:text-lg text-gray-500">{admin.email}</p>
                <p className="text-center font-normal text-xs md:text-lg">Role: {admin.role}</p>
                <div className="px-6 text-center mt-2 font-light text-sm">
                    <p className="font-medium ">
                        Phone: {admin.phone}
                    </p>
                </div>
                <hr className="mt-8"/>
            </div>
        </div>
    );
};

export default AdminProfile;