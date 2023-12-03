
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import EnrolledClassCard from "../EnrolledClassCard/EnrolledClassCard";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const EnrolledClasses = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: enrolledClasses = [] } = useQuery({
        queryKey: ['enrolledClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrolled?email=${user.email}`);
            return res.data;
        }
    });

    // console.log(enrolledClasses);

    return (
        <div>
            <SectionTitle heading="Enrolled CLasses" subHeading="All enrolled classes shown here"></SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
                {
                    enrolledClasses.map(enrolled =>
                        <EnrolledClassCard
                            key={enrolled._id}
                            enrolled={enrolled}
                        ></EnrolledClassCard>)
                }
            </div>
        </div>
    );
};

export default EnrolledClasses;