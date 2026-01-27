import Meta from '../components/Meta';
import { FaCheckCircle, FaTruck, FaShieldAlt, FaUsers } from 'react-icons/fa';

const AboutScreen = () => {
  return (
    <>
      <Meta title="About ProShop - Premium eCommerce" description="Learn about ProShop and our commitment to quality" />
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">About ProShop</h1>
          <p className="text-xl text-gray-600">
            Your trusted destination for quality products and exceptional service.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16 bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At ProShop, we believe that shopping should be easy, affordable, and enjoyable. Our mission is to provide customers with access to high-quality products at competitive prices, backed by exceptional customer service and fast, reliable shipping.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: FaCheckCircle,
                title: 'Quality',
                description: 'We are committed to offering only the highest quality products from trusted brands.'
              },
              {
                icon: FaUsers,
                title: 'Customer Focus',
                description: 'Our customers are at the heart of everything we do. Your satisfaction is our priority.'
              },
              {
                icon: FaTruck,
                title: 'Reliability',
                description: 'We deliver on our promises - fast shipping, accurate orders, and transparent communication.'
              },
              {
                icon: FaShieldAlt,
                title: 'Trust & Safety',
                description: 'Your data and transactions are protected with industry-leading security measures.'
              }
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <IconComponent className="text-blue-600 text-3xl flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Choose ProShop?</h2>
          <ul className="space-y-4">
            {[
              'Wide selection of quality products across multiple categories',
              'Competitive pricing with regular deals and promotions',
              'Fast and reliable shipping to all corners of the country',
              'Secure checkout with multiple payment options',
              'Hassle-free returns and customer support',
              'User-friendly shopping experience',
              'Detailed product information and customer reviews'
            ].map((reason, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-700">
                <FaCheckCircle className="text-green-600 flex-shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-gray-700 mb-4">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <a
            href="mailto:support@proshop.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Contact Us
          </a>
        </section>
      </div>
    </>
  );
};

export default AboutScreen;
