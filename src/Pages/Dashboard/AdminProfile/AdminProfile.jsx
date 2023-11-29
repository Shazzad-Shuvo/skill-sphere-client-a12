import { useLoaderData } from "react-router-dom";

const AdminProfile = () => {
    const admin = useLoaderData();

    return (
        <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
            <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                <img className="w-32 h-32 mx-auto rounded-full -mt-20 border-8 border-white" src={admin.photo} alt=""/>
                <div className="text-center mt-2 text-3xl font-medium">{admin.name}</div>
                <div className="text-center mt-2 font-light text-lg text-gray-500">{admin.email}</div>
                <div className="text-center font-normal text-lg">Role: {admin.role}</div>
                <div className="px-6 text-center mt-2 font-light text-sm">
                    <p className="font-medium">
                        Phone: {admin.phone}
                    </p>
                </div>
                <hr className="mt-8"/>
            </div>
        </div>
    );
};

export default AdminProfile;