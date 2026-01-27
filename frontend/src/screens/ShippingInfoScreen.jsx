import Meta from '../components/Meta';
import { FaTruck, FaBox, FaMoneyBillWave, FaUndo } from 'react-icons/fa';

const ShippingInfoScreen = () => {
  return (
    <>
      <Meta title="Shipping Information - ProShop" description="Learn about our shipping options and policies" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Shipping Information</h1>

        <div className="space-y-12">
          {/* Shipping Options */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Shipping Options</h2>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <FaTruck className="text-blue-600 text-2xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Standard Shipping</h3>
                  <p className="text-gray-600 mb-2">Delivery in 5-7 business days</p>
                  <p className="text-gray-700"><strong>Cost:</strong> $10 (Free on orders over $100)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tracking */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Order Tracking</h2>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <p className="text-gray-700 mb-4">
                Once your order ships, you will receive a confirmation email with a tracking number. Use this number to monitor your shipment in real-time.
              </p>
              <p className="text-gray-700">
                You can track your package using the tracking number provided by our shipping partner.
              </p>
            </div>
          </section>

          {/* Packaging */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Packaging & Handling</h2>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <FaBox className="text-blue-600 text-2xl flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-3">
                    All orders are carefully packaged to ensure safe delivery. We use quality materials to protect your items during transit.
                  </p>
                  <p className="text-gray-700">
                    If your package arrives damaged, please contact our support team immediately at{' '}
                    <a href="mailto:support@proshop.com" className="text-blue-600 hover:underline font-semibold">
                      support@proshop.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Returns & Refunds */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Returns & Refunds</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <FaUndo className="text-blue-600 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Return Policy</h3>
                    <p className="text-gray-700 mb-3">
                      We accept returns within 30 days of purchase. Items must be in original condition and packaging.
                    </p>
                    <p className="text-gray-700">
                      To initiate a return, contact our support team at{' '}
                      <a href="mailto:support@proshop.com" className="text-blue-600 hover:underline font-semibold">
                        support@proshop.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                  <FaMoneyBillWave className="text-green-600 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Refund Processing</h3>
                    <p className="text-gray-700 mb-3">
                      Once your return is received and inspected, refunds will be processed within 5-10 business days.
                    </p>
                    <p className="text-gray-700">
                      Return shipping costs are the responsibility of the customer unless the return is due to our error.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">International Shipping</h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-700">
                Currently, we only ship to addresses within the United States. We are working on expanding our international shipping options and will announce availability in the near future.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Need Help?</h2>
            <p className="text-gray-700">
              If you have any questions about shipping or tracking your order, please contact us at{' '}
              <a href="mailto:support@proshop.com" className="text-blue-600 hover:underline font-semibold">
                support@proshop.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default ShippingInfoScreen;
