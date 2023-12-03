import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Instructor = () => {
    return (
        <div className="mt-20 mx-5">
            <SectionTitle heading="Join Us" subHeading="Join with us as a Teacher"></SectionTitle>
            <div className="card lg:card-side bg-base-100 shadow-lg ">
                <figure className=" flex-1"><img src="https://i.ibb.co/qrgcLC9/teacher.jpg" alt="Album" /></figure>
                <div className="card-body flex-1">
                    <h2 className="card-title">Become an Instructor</h2>
                    <p>Instructors from around the world teach thousands of students on Skill-Spear. We provide the tools and skills to teach what you love</p>
                    <Link to='/teach'>
                        <button className="btn w-full bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white">Start Teaching Today</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Instructor;