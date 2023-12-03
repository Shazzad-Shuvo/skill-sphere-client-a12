import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Sponsor = () => {
    return (
        <div className="my-20">
            <div className="mx-5">
                <SectionTitle heading="Collaborators" subHeading=""></SectionTitle>
            </div>
            <div className="container flex flex-col items-center gap-8 mx-auto my-8">
                <p className="text-base font-medium leading-7 text-center text-dark-grey-600">Endorsed by renowned global corporations</p>
                <div className="flex flex-wrap items-center justify-center w-full gap-6 lg:gap-0 lg:flex-nowrap lg:justify-between">
                    <span>
                        <img className="w-40 mx-5" src="https://i.ibb.co/9pLYjhw/ibm-logo-18920.png" alt="" />
                    </span>
                    <span>
                        <img className="w-40 mx-5" src="https://i.ibb.co/W2F9w8v/512x512-logo-27170.png" alt="" />
                    </span>
                    <span>
                        <img className="w-40 mx-5" src="https://i.ibb.co/bdZNKhK/at-t-logo-3349.png" alt="" />
                    </span>
                    <span>
                        <img className="w-40 mx-5" src="https://i.ibb.co/RCP3L0G/Cisco-Systems.png" alt="" />
                    </span>
                    <span>
                        <img className="w-40" src="https://i.ibb.co/167rP9Q/Huawei.png" alt="" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sponsor;