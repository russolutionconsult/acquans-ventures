import Layout from '@/components/Layout';

export default function CookiePolicy() {
  return (
    <Layout>
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Cookie Policy</h1>
          <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. What Are Cookies</h2>
              <p>
                As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p>
                We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Disabling Cookies</h2>
              <p>
                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Third Party Cookies</h2>
              <p>
                In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>This site uses Google Analytics for understanding how you use the site and ways that we can improve your experience.</li>
                <li>When we embed content (like YouTube videos), those services may set their own cookies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. More Information</h2>
              <p>
                Hopefully that has clarified things for you. If you are looking for more information then you can contact us through one of our preferred contact methods:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p><strong>Email:</strong> info@acquansventures.com</p>
                <p><strong>Phone:</strong> 0543861162 / 0506624555</p>
              </div>
            </section>

            <div className="p-4 bg-blue-50 text-blue-800 rounded-xl text-sm italic">
              Effective Date: March 31, 2026. This policy applies to all visitors interacting with the Acquans Ventures digital portal in accordance with best practices in Ghana.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
