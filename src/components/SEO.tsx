import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

export default function SEO({ 
  title, 
  description = "Professional technical installation and building services in Ghana. Plumbing, civil works, HVAC, heating, and boiler installations.",
  keywords = "plumbing Ghana, civil works, HVAC installation, heating systems, boiler installations, building services, Acquans Ventures"
}: SEOProps) {
  const fullTitle = `${title} | Acquans Ventures`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
