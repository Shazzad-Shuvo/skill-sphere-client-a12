import { useLoaderData } from "react-router-dom";
import ClassCard from "../ClassCard/ClassCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const AllClasses = () => {
    const allClass = useLoaderData();
    // console.log(allClass);


    return (
        <div>
            <SectionTitle heading="All Available CLasses"></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
                {
                    allClass.map(aClass => <ClassCard key={aClass._id} aClass={aClass}></ClassCard>)
                }
            </div>
            
        </div>
    );
};

export default AllClasses;