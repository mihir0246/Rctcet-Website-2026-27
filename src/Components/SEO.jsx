import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image }) => {
  const siteTitle = 'Rotaract Club of TCET';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'The Rotaract Club of TCET is a premier youth organization focused on leadership, professional development, and community service.';
  const pageDescription = description || defaultDescription;
  const defaultImage = 'https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757125056/logo_pdqctw_ztwsvl.png';
  const pageImage = image || defaultImage;
  const siteUrl = url || 'https://rctcet.org'; // Replace with actual domain when available

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      
      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={pageImage} />
    </Helmet>
  );
};

export default SEO;
