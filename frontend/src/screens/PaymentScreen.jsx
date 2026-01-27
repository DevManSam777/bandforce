import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-900">Payment Method</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <fieldset>
            <legend className="text-lg font-semibold text-slate-900 mb-4">
              Select Payment Method
            </legend>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                 <input
                   type="radio"
                   name="paymentMethod"
                   value="PayPal"
                   checked={paymentMethod === 'PayPal'}
                   onChange={(e) => setPaymentMethod(e.target.value)}
                   className="w-4 h-4"
                 />
                 <span className="text-slate-900">PayPal or Credit Card</span>
               </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition mt-6"
          >
            Continue to Confirm Order
          </button>
        </form>
      </div>
    </FormContainer>
  );
};

export default PaymentScreen;
