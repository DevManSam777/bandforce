import Meta from '../components/Meta';

const PrivacyScreen = () => {
  return (
    <>
      <Meta title="Privacy Policy - ProShop" description="Privacy policy" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Introduction</h2>
            <p>
              ProShop ("we", "us", "our", or "Company") operates this website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Information Collection and Use</h2>
            <p className="mb-4">We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Personal Data: Email address, first name, last name, phone number, address, city, state, postal code, country</li>
              <li>Usage Data: Browser type, browser version, IP address, pages visited, and the time and date of your visit</li>
              <li>Payment Data: Credit card information (processed securely through PayPal)</li>
              <li>Cookies and Tracking Data: We use cookies to track your preferences and improve your experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Use of Data</h2>
            <p>ProShop uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To process your orders and send related information</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent, and address technical and security issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Security of Data</h2>
            <p>
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Cookies</h2>
            <p>
              We use cookies to enhance your experience on our Service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Third-Party Links</h2>
            <p>
              Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the bottom of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:support@proshop.com" className="text-blue-600 hover:underline font-semibold">
                support@proshop.com
              </a>
            </p>
          </section>

          <div className="text-sm text-gray-500 pt-6 border-t border-gray-300">
            Last updated: January 25, 2026
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyScreen;
