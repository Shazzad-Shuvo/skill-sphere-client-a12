import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Feedback = () => {
    const axiosPublic = useAxiosPublic();


    const { data: feedbacks = [] } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/review');
            return res.data;
        }
    });


    return (
        <section className="my-20">
            <SectionTitle
                subHeading='See reviews by our students'
                heading='Feedback'
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    feedbacks.map(feedback =>
                        <SwiperSlide
                            key={feedback._id}>
                            <div className="flex flex-col items-center mx-24 my-16 text-center">
                                <div className="avatar mb-3">
                                    <div className="w-24 rounded-full">
                                        <img src={feedback.studentImage} />
                                    </div>
                                </div>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={feedback.rating}
                                    readOnly
                                />
                                <h3 className="text-2xl text-cyan-600 mt-2">{feedback.classTitle}</h3>
                                <p className="py-8">{feedback.
                                    description
                                }</p>
                                <h3 className="text-xl text-cyan-600">{feedback.studentName}</h3>
                            </div>
                        </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Feedback;