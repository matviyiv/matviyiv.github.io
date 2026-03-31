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
        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full p-4 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 flex items-center justify-center group"
        onClick={toggleMenu}
        style={{ width: '56px', height: '56px' }}
      >
        <FontAwesomeIcon icon={faShareAlt} className="text-xl group-hover:rotate-90 transition-transform duration-300" />
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
                className="bg-slate-800/90 backdrop-blur-sm text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center hover:scale-110"
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
