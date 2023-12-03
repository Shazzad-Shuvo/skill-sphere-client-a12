
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="md:w-4/12 mx-5 md:mx-auto text-center my-8">
            <p className="font-medium text-cyan-600 pb-3">--- {subHeading} ---</p>
            <h3 className="text-3xl uppercase font-semibold border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;