import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Meta from '../components/Meta';

const FAQScreen = () => {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I place an order?',
      answer: 'Browse our products, add items to your cart, proceed to checkout, enter your shipping address and payment information, and click "Place Order". You will receive a confirmation email with your order details.'
    },
    {
      id: 2,
      question: 'What are your shipping times?',
      answer: 'Standard shipping typically takes 5-7 business days. Expedited shipping options are available at checkout. Once your order ships, you will receive a tracking number via email.'
    },
    {
      id: 3,
      question: 'Do you offer free shipping?',
      answer: 'Free shipping is available on orders over $100. For orders under $100, a flat shipping fee of $10 applies.'
    },
    {
      id: 4,
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase. Items must be in original condition. To initiate a return, contact our support team at support@proshop.com.'
    },
    {
      id: 5,
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled within 2 hours of placement. After that, contact our support team as soon as possible to request changes.'
    },
    {
      id: 6,
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards and PayPal. All transactions are encrypted and secure.'
    },
    {
      id: 7,
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard encryption (SSL/TLS) to protect your personal and payment information. Please review our Privacy Policy for more details.'
    },
    {
      id: 8,
      question: 'How do I track my order?',
      answer: 'Once your order ships, you will receive an email with a tracking number. Use this number to track your package through our shipping partner.'
    },
    {
      id: 9,
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within the United States. International shipping may be available in the future.'
    },
    {
      id: 10,
      question: 'How do I contact customer support?',
      answer: 'You can reach us via email at support@proshop.com. We aim to respond to all inquiries within 24 business hours.'
    }
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <>
      <Meta title="FAQs - ProShop" description="Frequently asked questions" />
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
            <a href="mailto:support@proshop.com" className="text-blue-600 hover:underline font-semibold">
              support@proshop.com
            </a>
            {' '}and we'll be happy to help.
          </p>
        </div>
      </div>
    </>
  );
};

export default FAQScreen;
