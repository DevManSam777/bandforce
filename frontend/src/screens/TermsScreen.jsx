import Meta from '../components/Meta';

const TermsScreen = () => {
  return (
    <>
      <Meta title="Terms of Service - BandForce" description="Terms of service" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Use License</h2>
            <p className="mb-3">Permission is granted to temporarily download one copy of the materials (information or software) on BandForce's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Attempt to gain unauthorized access to any portion or feature of the site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Disclaimer</h2>
            <p>
              The materials on BandForce's website are provided on an 'as is' basis. BandForce makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Limitations</h2>
            <p>
              In no event shall BandForce or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BandForce's website, even if BandForce or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on BandForce's website could include technical, typographical, or photographic errors. BandForce does not warrant that any of the materials on its website are accurate, complete, or current. BandForce may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Links</h2>
            <p>
              BandForce has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by BandForce of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Modifications</h2>
            <p>
              BandForce may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">9. User Accounts</h2>
            <p>
              If you create an account on this website, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:support@bandforce.fly.dev" className="text-blue-600 hover:underline font-semibold">
              support@bandforce.fly.dev
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

export default TermsScreen;
