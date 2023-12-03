import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const CheckoutForm = ({ classData }) => {
    const {_id: id, price, title} = classData;
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [transactionId, setTransactionId] = useState('')
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })

    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[Payment error]:', error);
            setError(error.message);
        }
        else {
            console.log('[Payment Method]:', paymentMethod);
            setError('');
        }

        // confirm payment ----------------------------------------------------------------------------
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('Payment intent Error', confirmError);
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction Id:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // save the payment in the database
                const payment = {
                    userName: user.displayName,
                    email: user.email,
                    classId: id,
                    classTitle: title,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date()
                }

                const res = await axiosSecure.post('/payments', payment)
                console.log('payment saved', res.data);
                if (res.data?.insertedId) {
                    Swal.fire({
                        title: "Payment successfully completed!",
                        icon: "success",
                        showClass: {
                          popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
                          `
                        },
                        hideClass: {
                          popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
                          `
                        }
                      });
                    navigate(`/dashboard/enrolled`);
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm bg-cyan-400 hover:bg-cyan-500 my-5"
                type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {
                transactionId ? 
                <span className="font-medium text-gray-500">Your Transaction Id:<p className="text-green-600"> {transactionId}</p></span> 
                : ''
            }
        </form>
    );
};

export default CheckoutForm;