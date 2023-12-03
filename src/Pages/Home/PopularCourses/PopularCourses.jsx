import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ClassCard from "../../ClassCard/ClassCard";

const PopularCourses = () => {

    const axiosPublic = useAxiosPublic();


    const { data: featured = [] } = useQuery({
        queryKey: ['featured'],
        queryFn: async () => {
            const res = await axiosPublic.get('/featuredClasses');
            return res.data;
        }
    });
    console.log(featured);

    return (
        <div>
            <SectionTitle heading="Featured Classes" subHeading="Currently most enrolled classes"></SectionTitle>
            <Swiper
                
                navigation={true} 
                modules={[Navigation]} 
                className="mySwiper md:w-3/4 lg:w-1/2"
            >
                {
                    featured.map(feat =>
                        <SwiperSlide
                            key={feat._id}>
                            <ClassCard aClass={feat}></ClassCard>
                        </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default PopularCourses;