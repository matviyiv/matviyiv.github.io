import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => {
  const title = 'Nazar Matviyiv | Lead Full Stack Developer';
  const description = 'Experienced Lead Full Stack Developer with over 13 years of experience in enterprise software development, specializing in Node.js, React, AWS, and scalable web applications.';
  const keywords = 'lead full stack developer, senior developer, node.js, react, aws, kubernetes, microservices, javascript, web development, software architecture';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Nazar Matviyiv" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://matviyiv.github.io" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://matviyiv.github.io/profile.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://matviyiv.github.io" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="https://matviyiv.github.io/profile.jpg" />

      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Nazar Matviyiv",
          "jobTitle": "Lead Full Stack Developer",
          "description": description,
          "image": "https://matviyiv.github.io/profile.jpg",
          "sameAs": [
            "https://linkedin.com/in/nazarmatviyiv",
            "https://github.com/matviyiv",
            "https://medium.com/@nazarmatviyiv"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Teletronics",
            "location": "Dubai"
          },
          "skills": [
            "Node.js",
            "React",
            "React Native",
            "AWS",
            "Kubernetes",
            "JavaScript",
            "WebRTC",
            "XMPP",
            "Microservices",
            "Docker",
            "CI/CD",
            "DevOps"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
