import Layout from '@/components/Layout';

export default function TermsConditions() {
  return (
    <Layout>
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Terms & Conditions</h1>
          <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm space-y-8 text-gray-600 leading-relaxed">
            <p className="font-semibold text-gray-900">
              Welcome to Acquans Ventures. By using our website and services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. General Conditions</h2>
              <p>
                We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Technical & Building Services</h2>
              <p>
                Acquans Ventures provides professional plumbing, civil works, HVAC, and boiler installation services in Ghana. All services provided are subject to individual written contracts and site-specific agreements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Quotations & Payments</h2>
              <p>
                All quotations are valid for 30 days unless otherwise stated. Payments for services are to be made in <strong>Ghana Cedis (GHS)</strong>. Payments can be conducted through bank transfers or other methods agreed upon during contract signing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Governing Law</h2>
              <p>
                These terms and conditions and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the <strong>laws of the Republic of Ghana</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Disclaimer of Warranties; Limitation of Liability</h2>
              <p>
                We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Contact Information</h2>
              <ul className="list-none space-y-2">
                <li><strong>Company:</strong> Acquans Ventures</li>
                <li><strong>Location:</strong> Ghana</li>
                <li><strong>Contacts:</strong> 0543861162 / 0506624555</li>
                <li><strong>Email:</strong> info@acquansventures.com</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
