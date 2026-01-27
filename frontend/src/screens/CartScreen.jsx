import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

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

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
  
  // Get tax rate from state
  const state = cart.shippingAddress?.state || 'CA';
  const taxRate = STATE_TAX_RATES[state] || 0;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);
  
  const totalPrice = (parseFloat(itemsPrice) + parseFloat(shippingPrice) + parseFloat(taxPrice)).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-6 text-slate-900">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{' '}
            <Link to="/" className="text-cyan-600 hover:underline font-semibold">
              Continue Shopping
            </Link>
          </Message>
        ) : (
          <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item._id} className="p-4 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-lg font-semibold text-slate-900 hover:text-cyan-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-cyan-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    className="px-4 py-2 pr-10 bg-white text-slate-900 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none transition hover:border-gray-400 appearance-none cursor-pointer"
                    style={{backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Order Summary</h2>

          <div className="space-y-3 border-b border-gray-200 pb-4 text-slate-900">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>${itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({(taxRate * 100).toFixed(2)}%):</span>
              <span>${taxPrice}</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg mt-4 mb-6 text-slate-900">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>

          <button
            onClick={checkOutHandler}
            disabled={cartItems.length === 0}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            Proceed to Checkout
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 mt-4 text-cyan-600 hover:text-cyan-700 font-semibold"
          >
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
