import Banner from "../Banner/Banner";
import Coupon from "../Coupon/Coupon";
import Instructor from "../Instructor/Instructor";
import Newsletter from "../Newsletter/Newsletter";
import Sponsor from "../Sponsor/Sponsor";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Instructor></Instructor>
            <Coupon></Coupon>
            <Newsletter></Newsletter>
            <Sponsor></Sponsor>
        </div>
    );
};

export default Home;