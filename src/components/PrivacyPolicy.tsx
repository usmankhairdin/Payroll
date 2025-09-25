import React from 'react';

const PrivacyPolicy = () => (
  <div className="page-container">
    <div className="page-content p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Privacy Policy</h1>
        <p className="mb-4 text-gray-700">This Privacy Policy explains how PayrollPro collects, uses, and protects your information when you use our payroll management platform.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Personal information (name, email, contact details, job title, etc.)</li>
          <li>Employee payroll data (salary, tax, bank details, attendance, leave records)</li>
          <li>Company information (company name, address, tax IDs, bank accounts)</li>
          <li>Usage data (logins, activity logs, device/browser info)</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>To process payroll and manage employee records</li>
          <li>To comply with legal, tax, and regulatory requirements</li>
          <li>To provide customer support and improve our services</li>
          <li>To secure your account and prevent unauthorized access</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p className="mb-4 text-gray-700">We implement industry-standard security measures to protect your data, including encryption, access controls, and regular audits. Only authorized personnel can access sensitive payroll information.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Sharing</h2>
        <p className="mb-4 text-gray-700">We do not sell or rent your data. We may share information with trusted third parties (such as banks, tax authorities, or service providers) only as necessary to process payroll or comply with the law.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Access, update, or delete your personal information</li>
          <li>Request a copy of your payroll data</li>
          <li>Contact us for privacy-related questions at <a href="mailto:support@payrollpro.com" className="text-blue-600 underline">support@payrollpro.com</a></li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
        <p className="mb-4 text-gray-700">We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the platform.</p>
        <p className="text-gray-500 text-xs mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
