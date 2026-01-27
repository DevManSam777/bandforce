import Meta from '../components/Meta';
import { FaCheckCircle, FaTruck, FaShieldAlt, FaUsers } from 'react-icons/fa';

const AboutScreen = () => {
  return (
    <>
      <Meta title="About BandForce - Premium eCommerce" description="Learn about BandForce and our commitment to quality" />
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">About BandForce</h1>
          <p className="text-xl text-gray-600">
            Strength in Every Stretch - Premium Resistance Bands for Serious Athletes.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16 bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            BandForce is dedicated to making professional-grade resistance training equipment accessible to everyone. Since 2020, we've been committed to empowering athletes, fitness enthusiasts, and rehabilitation professionals with durable, high-quality resistance bands that deliver real results. We believe strength training should be affordable, portable, and effective.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: FaCheckCircle,
                title: 'Premium Materials',
                description: 'Latex-free TPE rubber bands engineered for durability, safety, and consistent performance across all resistance levels.'
              },
              {
                icon: FaUsers,
                title: 'Athlete-Focused',
                description: 'Designed by and for serious athletes. Every product is tested by professional trainers and strength coaches.'
              },
              {
                icon: FaTruck,
                title: 'Fast Shipping',
                description: 'Get your bands within 2-3 business days. We know you\'re eager to hit your training goals.'
              },
              {
                icon: FaShieldAlt,
                title: 'Lifetime Warranty',
                description: 'We stand behind our products with a lifetime warranty. If it breaks, we\'ll replace it.'
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Choose BandForce?</h2>
          <ul className="space-y-4">
            {[
              'Professional-grade resistance bands used by elite athletes and coaches',
              '7 resistance levels (Light to Maximum) for all fitness levels',
              'Latex-free TPE rubber - safe for people with allergies',
              'Portable and versatile - perfect for home, gym, or travel training',
              'Includes comprehensive workout guides for every resistance level',
              'Expert customer support from certified fitness professionals',
              'Lifetime warranty on all individual bands and sets'
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
            href="mailto:support@bandforce.com"
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
