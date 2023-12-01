import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Payment = () => {
    const classData = useLoaderData();
    return (
        <div>
            <SectionTitle heading='Payment' subHeading='Please pay to enroll class'></SectionTitle>
            <div className="mt-20">
                <Elements stripe={stripePromise}>
                    <CheckoutForm classData={classData}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;