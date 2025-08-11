import React from 'react';

const PrivacyPolicyWeb = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Last Updated: August 11, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to Twcamp. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we handle your personal information when you use our application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
          <p className="text-gray-700 mb-4">We collect the following types of information:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Personal information (email address, name)</li>
            <li>Device information (device ID, operating system)</li>
            <li>Usage data (app interactions, rewards earned)</li>
            <li>Location data (if permitted by user)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use your information to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Provide and maintain our services</li>
            <li>Process your transactions and rewards</li>
            <li>Send you important updates</li>
            <li>Improve our services</li>
            <li>Deliver relevant advertisements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Advertising</h2>
          <p className="text-gray-700 leading-relaxed">
            We use Google AdMob for advertising. AdMob may collect and process data according to their privacy policy. 
            You can learn more about Google's data collection practices at{' '}
            <a 
              href="https://policies.google.com/privacy" 
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              https://policies.google.com/privacy
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Sharing and Disclosure</h2>
          <p className="text-gray-700 mb-4">We may share your information with:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Service providers and partners</li>
            <li>Advertising partners</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate security measures to protect your personal information. 
            However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Access your personal data</li>
            <li>Correct your personal data</li>
            <li>Delete your account</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our services are not intended for children under 13. We do not knowingly collect 
            information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Changes to Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-700 ml-4">
            Email:{' '}
            <a 
              href="mailto:[Your Contact Email]" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              [Your Contact Email]
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyWeb;
