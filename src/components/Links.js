import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faRss, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons';

function Links({ links }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  if (!links || links.length === 0) {
    return null;
  }

  // Map social media names to their corresponding Font Awesome icons
  const getIcon = (name) => {
    const lowercaseName = name.toLowerCase();
    
    if (lowercaseName.includes('github')) return faGithub;
    if (lowercaseName.includes('linkedin')) return faLinkedin;
    if (lowercaseName.includes('twitter')) return faTwitter;
    if (lowercaseName.includes('medium')) return faMedium;
    if (lowercaseName.includes('blog')) return faRss;
    
    return faGlobe; // Default fallback icon
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '24px', 
      right: '24px', 
      zIndex: 9999 
    }}>
      <button
        aria-label="Share"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
        onClick={toggleMenu}
        style={{ width: '56px', height: '56px' }}
      >
        <FontAwesomeIcon icon={faShareAlt} className="text-xl" />
      </button>
        
        {isMenuOpen && (
          <div style={{ 
            position: 'absolute', 
            bottom: '64px', 
            right: '0', 
            display: 'flex', 
            flexDirection: 'column-reverse',
            gap: '12px'
          }}>
            {links.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 hover:text-blue-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                style={{ width: '48px', height: '48px' }}
                aria-label={link.title}
              >
                <FontAwesomeIcon icon={getIcon(link.name || link.title)} className="text-xl" />
              </a>
            ))}
          </div>
        )}
    </div>
  );
}

export default Links;
