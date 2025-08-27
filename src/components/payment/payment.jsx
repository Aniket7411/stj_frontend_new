// frontend/src/PaymentForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PaymentForm = ({amount}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const data = location.state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const { data: { clientSecret } } = await axios.post('http://localhost:3001/api/payment/create', {
        amount: data?.amount, 
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(`❌ Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === 'succeeded') {
        setMessage('✅ Payment successful!');
      }
    } catch (error) {
      setMessage('❌ An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
       
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-gray-50 border border-gray-300 rounded-md">
            <h1>Pay for {data?.type}</h1>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': { color: '#aab7c4' },
                  },
                  invalid: { color: '#9e2146' },
                },
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!stripe || !elements || isLoading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? 'Processing...' : `Pay ${data?.amount}.00 `}
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 text-center font-semibold ${
              message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
