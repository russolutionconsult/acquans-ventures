import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <SEO title="Privacy Policy" />
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
          <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p>
                At Acquans Ventures, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) or interact with us for technical services in Ghana.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li><strong>Identity Data:</strong> first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> internet protocol (IP) address, browser type and version, time zone setting and location.</li>
                <li><strong>Usage Data:</strong> information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Local Compliance (Ghana)</h2>
              <p>
                Acquans Ventures operates in compliance with the <strong>Data Protection Act, 2012 (Act 843)</strong> of the Republic of Ghana. We ensure that all personal data is processed fairly and lawfully in accordance with the principles set out in the Act.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform a contract with you, to provide technical installation services, or to comply with a legal obligation in Ghana.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p><strong>Email:</strong> info@acquansventures.com</p>
                <p><strong>Phone:</strong> 0244425035 / 0543861162 / 0506624555</p>
                <p><strong>Location:</strong> Ghana</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
