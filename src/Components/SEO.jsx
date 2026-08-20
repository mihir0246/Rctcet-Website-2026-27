import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image }) => {
  const siteTitle = 'Rotaract Club of TCET | Youth Leadership & Community Service';
  const fullTitle = title ? `${title} | Rotaract Club of TCET` : siteTitle;
  const defaultDescription = 'Join the Rotaract Club of TCET (R.I.D 3141) in Mumbai. We are a premier youth organization sponsored by Rotary International, focused on leadership, professional development, and community service. Become a Rotaractor today!';
  const pageDescription = description || defaultDescription;
  const defaultKeywords = "Rotaract, Rotary, Rotaract Club of TCET, RCTCET, TCET, R.I.D 3141, Rotary International, Youth Leadership, Community Service, Mumbai Rotaract, Thakur College Rotaract, Social Work, NGO, Volunteer Mumbai, Rotaract Mumbai, Best Rotaract Club";
  
  const defaultImage = 'https://res.cloudinary.com/dtc2xaeaf/image/upload/v1757125056/logo_pdqctw_ztwsvl.png';
  const pageImage = image || defaultImage;
  const siteUrl = url || 'https://www.rc.tcetmumbai.in/'; 

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={defaultKeywords} />
      
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
