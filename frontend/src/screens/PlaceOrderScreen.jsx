import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation, useGetPayPalClientIdQuery, usePayOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // State tax rates mapping (must match backend)
  const STATE_TAX_RATES = {
    AL: 0.04, AK: 0.00, AZ: 0.056, AR: 0.065, CA: 0.0725, CO: 0.029, CT: 0.0635,
    DE: 0.00, FL: 0.06, GA: 0.04, HI: 0.04, ID: 0.06, IL: 0.0625, IN: 0.07,
    IA: 0.06, KS: 0.057, KY: 0.06, LA: 0.045, ME: 0.055, MD: 0.06, MA: 0.0625,
    MI: 0.06, MN: 0.0685, MS: 0.07, MO: 0.0425, MT: 0.00, NE: 0.055, NV: 0.0685,
    NH: 0.00, NJ: 0.06625, NM: 0.0525, NY: 0.04, NC: 0.045, ND: 0.05, OH: 0.0575,
    OK: 0.045, OR: 0.00, PA: 0.06, RI: 0.07, SC: 0.045, SD: 0.045, TN: 0.0955,
    TX: 0.0625, UT: 0.061, VT: 0.06, VA: 0.0575, WA: 0.065, WV: 0.06, WI: 0.05,
    WY: 0.04, DC: 0.0575
  };

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [payOrder] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId && cart.paymentMethod === 'PayPal') {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypal.clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    }
  }, [paypal?.clientId, paypalDispatch, loadingPayPal, errorPayPal, cart.paymentMethod]);

  const createOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      return res._id;
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      throw error;
    }
  };

  function createPayPalOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: String(cart.totalPrice),
            },
          },
        ],
      })
      .then((orderID) => orderID);
  }

  async function onApprovePayPal(data, actions) {
    try {
      const details = await actions.order.capture();
      const orderId = await createOrderHandler();
      await payOrder({ orderId, details }).unwrap();
      navigate(`/order/${orderId}`);
      toast.success('Order placed and paid successfully');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to place order');
    }
  }

  function onErrorPayPal(err) {
    toast.error(err.message);
  }

  const itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
  
  // Get tax rate from state
  const state = cart.shippingAddress?.state || 'CA';
  const taxRate = STATE_TAX_RATES[state] || 0;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);
  const totalPrice = (parseFloat(itemsPrice) + parseFloat(shippingPrice) + parseFloat(taxPrice)).toFixed(2);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Shipping</h2>
            <p className="text-slate-700">
              <strong>Address:</strong>{' '}
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
              {cart.shippingAddress.state} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Payment Method</h2>
            <p className="text-slate-700">
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Order Items</h2>

            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div className="space-y-4">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-slate-900 hover:text-cyan-600 font-semibold"
                      >
                        {item.name}
                      </Link>
                      <p className="text-slate-600 mt-1">
                         {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Order Summary</h2>

            <div className="space-y-3 border-b border-gray-200 pb-4 text-slate-900">
              <div className="flex justify-between">
                 <span>Items:</span>
                 <span>${Number(itemsPrice).toFixed(2)}</span>
               </div>
               <div className="flex justify-between">
                 <span>Shipping:</span>
                 <span>${Number(shippingPrice).toFixed(2)}</span>
               </div>
               <div className="flex justify-between">
                 <span>Tax ({(taxRate * 100).toFixed(2)}%):</span>
                 <span>${Number(taxPrice).toFixed(2)}</span>
               </div>
             </div>

             <div className="flex justify-between font-bold text-lg mt-4 mb-6 text-slate-900">
               <span>Total:</span>
               <span>${Number(totalPrice).toFixed(2)}</span>
             </div>

            {error && <Message variant="danger">{error?.data?.message || error.error}</Message>}

            {cart.paymentMethod === 'PayPal' ? (
             <>
               {loadingPayPal && <Loader />}
               {isPending ? (
                 <Loader />
               ) : (
                 <PayPalButtons
                   fundingSource="paypal"
                   createOrder={createPayPalOrder}
                   onApprove={onApprovePayPal}
                   onError={onErrorPayPal}
                 />
               )}
             </>
            ) : (
             <button
               onClick={createOrderHandler}
               disabled={cart.cartItems.length === 0 || isLoading}
               className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
             >
               Place Order
             </button>
            )}

            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
