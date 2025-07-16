import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCreditCard, FaPaypal, FaMobileAlt, FaMoneyBill } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.orebiReducer.products);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate total price
  const totalPrice = products.reduce((total, item) => total + (item.price * item.quantity), 0);

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: <FaCreditCard className="w-6 h-6" />,
      description: 'Pay securely with your credit card'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FaPaypal className="w-6 h-6" />,
      description: 'Fast and secure payment with PayPal'
    },
    {
      id: 'mobile-wallet',
      name: 'Mobile Wallet',
      icon: <FaMobileAlt className="w-6 h-6" />,
      description: 'Pay using Vodafone Cash or Mobile Wallet'
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      icon: <FaMoneyBill className="w-6 h-6" />,
      description: 'Pay when you receive your order'
    }
  ];

  const handlePaymentMethodSelect = (methodId) => {
    setPaymentMethod(methodId);
    setError('');
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate based on payment method
      if (paymentMethod === 'credit-card') {
        if (!cardNumber || !expiryDate || !cvv) {
          throw new Error('Please fill in all card details');
        }
        if (cardNumber.replace(/\s/g, '').length !== 16) {
          throw new Error('Invalid card number');
        }
      } else if (paymentMethod === 'mobile-wallet') {
        if (!phoneNumber) {
          throw new Error('Please enter your phone number');
        }
        if (!/^01[0125][0-9]{8}$/.test(phoneNumber)) {
          throw new Error('Invalid phone number');
        }
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      // Here you would typically make an API call to your backend
      
      setLoading(false);
      navigate('/payment-success');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Payment failed. Please try again.');
    }
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength="19"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value.replace(/[^\d/]/g, ''))}
                  maxLength="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  maxLength="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        );
      case 'mobile-wallet':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="01xxxxxxxxx"
              />
            </div>
          </div>
        );
      case 'paypal':
        return (
          <div className="text-center py-4">
            <p className="text-gray-600">You will be redirected to PayPal to complete your payment.</p>
          </div>
        );
      case 'cash':
        return (
          <div className="text-center py-4">
            <p className="text-gray-600">Pay in cash when your order is delivered.</p>
            <p className="text-sm text-gray-500 mt-2">Additional fees may apply for cash on delivery.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Checkout</h2>
            
            <Breadcrumbs title="Payment gateway" />
            
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2">
                {products.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    className={`cursor-pointer p-4 rounded-lg border-2 ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 text-gray-600">{method.icon}</div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            {paymentMethod && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
                <form onSubmit={handleSubmit}>
                  {renderPaymentForm()}
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={loading || !paymentMethod}
                      className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                        loading || !paymentMethod
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        `Pay $${totalPrice.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
