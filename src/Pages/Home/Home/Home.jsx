import Banner from "../Banner/Banner";
import Coupon from "../Coupon/Coupon";
import Feedback from "../Feedback/Feedback";
import Instructor from "../Instructor/Instructor";
import Newsletter from "../Newsletter/Newsletter";
import PopularCourses from "../PopularCourses/PopularCourses";
import SiteData from "../SiteData/SiteData";
import Sponsor from "../Sponsor/Sponsor";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCourses></PopularCourses>
            <Instructor></Instructor>
            <SiteData></SiteData>
            <Coupon></Coupon>
            <Feedback></Feedback>
            <Newsletter></Newsletter>
            <Sponsor></Sponsor>
        </div>
    );
};

export default Home;