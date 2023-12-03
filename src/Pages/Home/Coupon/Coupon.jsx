import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Coupon = () => {
    return (
        <div className="mt-20 mx-5">
            <SectionTitle heading="Coupon" subHeading="Special Offer"></SectionTitle>
            <div className="container mx-auto">
                <div className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white text-center py-10 px-20 rounded-lg shadow-md relative">
                    <img className="w-40 mx-auto mb-4 rounded-lg" src="https://i.ibb.co/tQV1SMG/Skill-sphere-removebg-preview.png" alt="" />
                    <h3 className="text-2xl font-semibold mb-4">20% flat off on all classes within the time limit<br />using City Bank Credit Card</h3>
                    <div className="flex justify-center items-center space-x-2 mb-6">
                        <span id="cpnCode" className="border-dashed border text-white px-4 py-2 rounded-l">STEALDEAL20</span>
                        <span id="cpnBtn" className="border border-white bg-white text-purple-600 text-xs md:text-base px-4 py-2 rounded-r cursor-pointer">Copy Code</span>
                    </div>
                    <p className="text-sm">Valid Till: 31Dec, 2023</p>

                    <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                    <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>

                </div>
            </div>
        </div>
    );
};

export default Coupon;