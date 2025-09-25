import React from 'react';
import Footer from './Footer';

const TermsOfService = () => (
  <div className="flex flex-col min-h-screen">
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Terms of Service</h1>
        <p className="mb-4 text-gray-700">These Terms of Service ("Terms") govern your use of PayrollPro, our payroll management platform. By using PayrollPro, you agree to these Terms.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Service</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>You must provide accurate and complete information for payroll processing.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You agree not to misuse the platform or attempt unauthorized access.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Payroll Data</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>You retain ownership of your payroll and employee data.</li>
          <li>We process your data solely to provide payroll and related services.</li>
          <li>We may use aggregated, anonymized data for analytics and improvements.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Compliance & Legal</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>You are responsible for ensuring your payroll practices comply with applicable laws and regulations.</li>
          <li>We provide tools and support but do not offer legal or tax advice.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Service Availability</h2>
        <p className="mb-4 text-gray-700">We strive to provide reliable access but do not guarantee uninterrupted service. We may suspend or terminate access for maintenance, security, or policy violations.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
        <p className="mb-4 text-gray-700">PayrollPro is provided "as is" without warranties. We are not liable for indirect, incidental, or consequential damages arising from your use of the platform.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
        <p className="mb-4 text-gray-700">We may update these Terms from time to time. Continued use of PayrollPro after changes means you accept the new Terms.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact</h2>
        <p className="mb-4 text-gray-700">For questions about these Terms, contact us at <a href="mailto:support@payrollpro.com" className="text-blue-600 underline">support@payrollpro.com</a>.</p>
        <p className="text-gray-500 text-xs mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
    <Footer />
  </div>
);

export default TermsOfService; 