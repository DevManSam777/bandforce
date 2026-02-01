import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { FaArrowLeft } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const { data: order, refetch, error, isLoading } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId && order && !order.isPaid) {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypal.clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    }
  }, [order, order?.isPaid, paypal?.clientId, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success('Payment successful');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: String(order.totalPrice),
            },
          },
        ],
      })
      .then((orderID) => orderID);
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order Delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>
      </div>
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-slate-900 break-words">Order {order._id}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Shipping</h2>
            <p className="text-slate-700 mb-2">
              <strong>Name:</strong> {order.user?.name}
            </p>
            <p className="text-slate-700 mb-2">
              <strong>Email:</strong> {order.user?.email}
            </p>
            <p className="text-slate-700">
              <strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city},{' '}
              {order.shippingAddress?.state} {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
            </p>
            <div className="mt-4">
              {order.isDelivered ? (
                <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded">
                  Delivered on {order.deliveredAt?.substring(0, 10)}
                </div>
              ) : (
                <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded">
                  Not Delivered
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Payment Method</h2>
            <p className="text-slate-700 mb-2">
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            <div className="mt-4">
              {order.isPaid ? (
                <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded">
                  Paid on {order.paidAt?.substring(0, 10)}
                </div>
              ) : (
                <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded">
                  Not Paid
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems?.map((item) => (
                <div key={item._id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <Link to={`/product/${item.product}`} className="text-slate-900 hover:text-cyan-600 font-semibold">
                      {item.name}
                    </Link>
                    <p className="text-slate-600 mt-1">
                       {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Order Summary</h2>

            <div className="space-y-3 border-b border-gray-200 pb-4 text-slate-900">
               <div className="flex justify-between">
                  <span>Items:</span>
                  <span>${Number(order.itemsPrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${Number(order.shippingPrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${Number(order.taxPrice).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg mt-4 mb-6 text-slate-900">
                <span>Total:</span>
                <span>${Number(order.totalPrice).toFixed(2)}</span>
              </div>

            {!order.isPaid && order.paymentMethod === 'PayPal' && (
              <>
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <PayPalButtons 
                    fundingSource="paypal"
                    createOrder={createOrder} 
                    onApprove={onApprove} 
                    onError={onError} 
                  />
                )}
              </>
            )}
            
            {!order.isPaid && order.paymentMethod !== 'PayPal' && (
              <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded">
                This order is awaiting payment. Please complete payment through your chosen method.
              </div>
            )}

            {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
              <button
                onClick={deliverOrderHandler}
                disabled={loadingDeliver}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
              >
                Mark as Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
