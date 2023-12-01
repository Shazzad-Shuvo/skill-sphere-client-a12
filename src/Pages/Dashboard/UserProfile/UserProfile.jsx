import { useLoaderData } from "react-router-dom";

const UserProfile = () => {
    const user = useLoaderData();

    return (
        <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
            <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                <img className="w-32 h-32 mx-auto rounded-full -mt-20 border-8 border-white" src={user.photo} alt="" />
                <div className="text-center mt-2 text-3xl font-medium">{user.name}</div>
                <div className="text-center mt-2 font-light text-lg text-gray-500">{user.email}</div>
                <div className="text-center font-normal text-lg">Role: {user?.role ? user?.role : 'Student'}</div>
                <div className="px-6 text-center mt-2 font-light text-sm">
                    <p className="font-medium">
                        Phone: {user.phone}
                    </p>
                </div>
                <hr className="mt-8" />
            </div>
        </div>
    );
};

export default UserProfile;