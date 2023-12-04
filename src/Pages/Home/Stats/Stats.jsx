import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Stats = () => {

    const axiosPublic = useAxiosPublic();


    // const { data: feedbacks = [] } = useQuery({
    //     queryKey: ['feedbacks'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/review');
    //         return res.data;
    //     }
    // });


    // const { data: stats = {} } = useQuery({
    //     queryKey: ['site-stats'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/stats');
    //         return res.data;
    //     }
    // })
    // console.log(stats);

    return (
        <div className="mt-20">
            <SectionTitle heading="Some Stats" subHeading="Some numbers on our website"></SectionTitle>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                <div className="flex flex-col gap-2  mt-3 mx-5 flex-1">
                    {/* total users card */}
                    <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out bg-[url('https://i.ibb.co/PjHwsT8/card-bg1.jpg')]">
                        <div className="absolute inset-0 bg-pink-900 bg-opacity-75 transition duration-300 ease-in-out"></div>
                        <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                            <div>
                                <h3 className="text-center text-white text-lg">
                                    Total Users
                                </h3>
                                <h3 className="text-center text-white text-3xl mt-2 font-bold">
                                    {/* {stats.totalUser} */}
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
                                    {/* {stats.totalClasses} */}
                                </h3>
                            </div>
                        </div>
                    </div>
                    {/* total enrolled card */}
                    <div className="relative w-full h-52 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out bg-[url('https://i.ibb.co/PjHwsT8/card-bg1.jpg')]">
                        <div className="absolute inset-0 bg-blue-900 bg-opacity-75 transition duration-300 ease-in-out"></div>
                        <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
                            <div>
                                <h3 className="text-center text-white text-lg">
                                    Total Enrolled
                                </h3>
                                <h3 className="text-center text-white text-3xl mt-2 font-bold">
                                    {/* {stats.totalEnrolled} */}
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

export default Stats;