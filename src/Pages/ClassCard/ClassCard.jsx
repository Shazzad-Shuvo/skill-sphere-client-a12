import { Link } from "react-router-dom";

const ClassCard = ({ aClass }) => {

    const { _id, title, name, image, price, description } = aClass;

    return (
        <div className="card bg-base-100 shadow-xl mx-5">
            <figure><img src={image} alt="" /></figure>
            <div className="card-body justify-between">
                <div>
                    <h2 className="card-title">{title}</h2>
                    <div>
                        <p className="text-gray-400 font-medium mt-2">{name}</p>
                    </div>
                    <div className="">
                        <p className="my-2 rounded-full bg-green-400 py-1 px-2 text-xs font-medium text-white text-center">Enrolled : 300</p>
                    </div>
                    <div>
                        <p>{description}</p>
                    </div>
                    <div className="my-4">
                        <p className="text-3xl font-extrabold text-blue-800">${price}</p>
                    </div>
                </div>
                <Link to={`/class/${_id}`}>
                    <div className="card-actions w-full">
                        <button className="btn w-full bg-gradient-to-r from-cyan-300/80 to-blue-500/80 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-700/80 text-white">Enroll</button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ClassCard;