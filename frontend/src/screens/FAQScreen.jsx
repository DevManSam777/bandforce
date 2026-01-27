import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Meta from '../components/Meta';

const FAQScreen = () => {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'What is the difference between individual bands and band sets?',
      answer: 'Individual bands let you pick the exact resistance level you need for targeted training. Band sets include multiple resistance levels in one package, perfect for progressive training and full-body workouts. Our sets include anywhere from 2-7 different resistances.'
    },
    {
      id: 2,
      question: 'Which resistance level should I start with?',
      answer: 'Beginners typically start with Light (Orange, 2-10 lbs) or Medium (Red, 5-25 lbs) bands. If you have prior strength training experience, start with Heavy (Blue, 10-35 lbs). Remember, resistance bands feel different than weights - they provide more resistance as they stretch.'
    },
    {
      id: 3,
      question: 'Are BandForce bands latex-free?',
      answer: 'Yes! All BandForce bands are made from premium latex-free TPE rubber. This makes them safe for people with latex allergies and provides superior durability compared to standard latex bands.'
    },
    {
      id: 4,
      question: 'Can I use resistance bands for rehabilitation?',
      answer: 'Absolutely. Many physical therapists recommend resistance bands for rehabilitation exercises due to their low-impact nature and smooth resistance curve. Our Light and Medium bands are particularly popular for rehab work. Always consult with your healthcare provider.'
    },
    {
      id: 5,
      question: 'How long do resistance bands last?',
      answer: 'With proper care, BandForce bands typically last 2-5 years depending on usage frequency. We back all individual bands with a lifetime warranty. Store bands away from direct sunlight and extreme temperatures to maximize lifespan.'
    },
    {
      id: 6,
      question: 'What exercises can I do with resistance bands?',
      answer: 'Resistance bands are incredibly versatile. Use them for squats, bench press, rows, curls, tricep extensions, shoulder presses, and more. With accessories like our door anchor, you can also do pulldowns and face pulls. Check out our blog for complete workout guides.'
    },
    {
      id: 7,
      question: 'What is the difference between 41" bands and 12" mini bands?',
      answer: 'The 41" Power Bands are designed for traditional resistance training exercises. The 12" Mini Loop Bands are compact and perfect for leg exercises, glute activation, and portable workouts. Many athletes use both in their training.'
    },
    {
      id: 8,
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within the United States. International customers can contact us at support@bandforce.fly.dev to inquire about future expansion.'
    },
    {
      id: 9,
      question: 'What is your return policy?',
      answer: 'We offer a 30-day money-back guarantee on all products. If you\'re not completely satisfied with your BandForce bands, contact our support team for a full refund. No questions asked.'
    },
    {
      id: 10,
      question: 'How do I contact customer support?',
      answer: 'You can reach our expert support team at support@bandforce.com. We have certified fitness professionals on staff who can answer questions about technique, programming, and product selection. We typically respond within 24 business hours.'
    }
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <>
      <Meta title="FAQs - BandForce" description="Frequently asked questions" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8">Find answers to common questions about orders, shipping, returns, and more.</p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md border border-gray-200">
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-slate-900 text-left">{faq.question}</h3>
                <div className="text-blue-600 flex-shrink-0 ml-4">
                  {expanded === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </button>
              {expanded === faq.id && (
                <div className="px-6 pb-6 border-t border-gray-200 pt-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Didn't find your answer?</h2>
          <p className="text-gray-700">
            Contact us at{' '}
            <a href="mailto:support@bandforce.fly.dev" className="text-blue-600 hover:underline font-semibold">
            support@bandforce.fly.dev
            </a>
            {' '}and we'll be happy to help.
          </p>
        </div>
      </div>
    </>
  );
};

export default FAQScreen;
