import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  schema?: Record<string, any>;
}

export default function SEO({ 
  title, 
  description = "Professional technical installation and building services in Ghana. Plumbing, civil works, HVAC, heating, and boiler installations.",
  keywords = "plumbing Ghana, civil works, HVAC installation, heating systems, boiler installations, building services, Acquans Ventures",
  image = "https://acquansventures.com/images/Acquans Ventures Official Logo.png",
  schema
}: SEOProps) {
  const fullTitle = `${title} | Acquans Ventures`;
  const location = useLocation();
  const canonicalUrl = `https://acquansventures.com${location.pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
