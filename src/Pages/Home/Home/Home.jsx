import Banner from "../Banner/Banner";
import Coupon from "../Coupon/Coupon";
import Feedback from "../Feedback/Feedback";
import Instructor from "../Instructor/Instructor";
import Newsletter from "../Newsletter/Newsletter";
import PopularCourses from "../PopularCourses/PopularCourses";
import Sponsor from "../Sponsor/Sponsor";
import Stats from "../Stats/Stats";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCourses></PopularCourses>
            <Instructor></Instructor>
            {/* <Stats></Stats> */}
            <Coupon></Coupon>
            <Feedback></Feedback>
            <Newsletter></Newsletter>
            <Sponsor></Sponsor>
        </div>
    );
};

export default Home;