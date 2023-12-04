import { useLoaderData } from "react-router-dom";

const UserProfile = () => {
    const user = useLoaderData();

    return (
        <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
            <div className="card w-3/4 mx-auto bg-white  shadow-xl hover:shadow">
                <img className="w-32 h-32 mx-auto rounded-full -mt-20 border-8 border-white" src={user.photo} alt="" />
                <p className="text-center mt-2 text-sm md:text-3xl font-medium">{user.name}</p>
                <p className="text-center mt-2 font-light text-xs md:text-lg text-gray-500">{user.email}</p>
                <p className="text-center font-normal text-xs md:text-lg">Role: {user?.role ? user?.role : 'Student'}</p>
                <div className="px-6 text-center mt-2 font-light text-sm">
                    <p className="font-medium text-xs md:text-base">
                        Phone: {user.phone}
                    </p>
                </div>
                <hr className="mt-8" />
            </div>
        </div>
    );
};

export default UserProfile;