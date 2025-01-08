import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Terms and Conditions</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600">
                  Welcome to SupplyNex. By using our website and services, you agree to these terms and conditions.
                  Please read them carefully before proceeding with registration or making any purchases.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>You must be 18 years or older to create an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must provide accurate and complete information during registration</li>
                  <li>You agree to notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. Purchases and Payments</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>All prices are listed in Botswana Pula (BWP) or South African Rand (ZAR)</li>
                  <li>Payment must be made in full at the time of purchase</li>
                  <li>We accept various payment methods including credit cards and mobile payments</li>
                  <li>Prices and availability are subject to change without notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">4. Shipping and Delivery</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Delivery times may vary depending on your location</li>
                  <li>Shipping costs will be calculated at checkout</li>
                  <li>We are not responsible for delays caused by customs or other factors beyond our control</li>
                  <li>Risk of loss and title pass to you upon delivery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">5. Returns and Refunds</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Returns must be initiated within 14 days of delivery</li>
                  <li>Items must be unused and in original packaging</li>
                  <li>Refunds will be processed within 7-14 business days</li>
                  <li>Shipping costs for returns are the responsibility of the customer</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>We collect and process your data in accordance with our Privacy Policy</li>
                  <li>Your personal information is encrypted and stored securely</li>
                  <li>We do not share your information with third parties without your consent</li>
                  <li>You have the right to request access to or deletion of your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
                <p className="text-gray-600">
                  If you have any questions about these terms, please contact us at:
                  <br />
                  Email: support@supplynex.com
                  <br />
                  Phone: +267 123 4567
                  <br />
                  Address: Plot 123, Main Mall, Gaborone, Botswana
                </p>
              </section>
            </div>

            <div className="mt-8">
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Registration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
