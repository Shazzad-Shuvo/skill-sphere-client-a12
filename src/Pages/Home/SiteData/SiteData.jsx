import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const SiteData = () => {

    const axiosPublic = useAxiosPublic();

    const { data: siteData = {} } = useQuery({
        queryKey: ['siteData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/siteData');
            return res.data;
        }
    })
    const { data: allCLass = [] } = useQuery({
        queryKey: ['allClass'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allApprovedClasses');
            return res.data;
        }
    })

    console.log(allCLass);

    // const { data: aClass = [] } = useQuery({
    //     queryKey: ['aClass'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/classes/${classId.id}`);
    //         return res.data;
    //     }
    // })

    return (
        <div className="mt-20">
            <SectionTitle heading="Some Numbers" subHeading="Info you should know"></SectionTitle>
            <div className="flex flex-col md:flex-row gap-10 mx-5 justify-center items-center">
                <div className="flex flex-col flex-1 gap-5">
                    {/* total user card */}
                    <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out bg-[url('https://i.ibb.co/PjHwsT8/card-bg1.jpg')]">
                        <div className="absolute inset-0 bg-pink-900 bg-opacity-75 transition duration-300 ease-in-out"></div>
                        <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                            <div>
                                <h3 className="text-center text-white text-lg">
                                    Total Users
                                </h3>
                                <h3 className="text-center text-white text-3xl mt-2 font-bold">
                                    {siteData.users}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* total classes card */}
                    <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out bg-[url('https://i.ibb.co/PjHwsT8/card-bg1.jpg')]">
                        <div className="absolute inset-0 bg-yellow-600 bg-opacity-75 transition duration-300 ease-in-out"></div>
                        <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                            <div>
                                <h3 className="text-center text-white text-lg">
                                    Total Classes
                                </h3>
                                <h3 className="text-center text-white text-3xl mt-2 font-bold">
                                    {allCLass.length}
                                </h3>
                            </div>
                        </div>
                    </div>
                    {/* total enrollment count */}
                    <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out bg-[url('https://i.ibb.co/PjHwsT8/card-bg1.jpg')]">
                        <div className="absolute inset-0 bg-blue-900 bg-opacity-75 transition duration-300 ease-in-out"></div>
                        <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                            <div>
                                <h3 className="text-center text-white text-lg">
                                    Total Enrollment
                                </h3>
                                <h3 className="text-center text-white text-3xl mt-2 font-bold">
                                    {siteData.enrolled}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <img src="https://i.ibb.co/hRy4jn2/2150797614.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default SiteData;