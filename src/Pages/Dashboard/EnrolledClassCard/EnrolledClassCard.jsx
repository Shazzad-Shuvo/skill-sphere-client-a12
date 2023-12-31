import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";


const EnrolledClassCard = ({ enrolled }) => {
    const { _id, image, title, name } = enrolled;
    return (
        <div className="flex flex-col justify-between bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
            <div>
                <img className="rounded-t-lg" src={image} alt="" />
                <div className="p-5">
                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{title}</h5>
                    <p className="font-normal text-gray-700 mb-3">{name}</p>

                </div>
            </div>
            <Link to={`/dashboard/enrolled/${_id}`}>
                <div className="p-5">
                    <button className="btn btn-ghost text-cyan-500 font-medium">Continue <FaArrowRightLong></FaArrowRightLong></button>
                </div>
            </Link>
        </div>
    );
};

export default EnrolledClassCard;