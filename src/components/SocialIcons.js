import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedin, faGithub, faTwitter, 
  faEnvelope, faGlobe, faRss, faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin as faLinkedinBrand, 
  faGithub as faGithubBrand, 
  faTwitter as faTwitterBrand,
  faMedium as faMediumBrand
} from '@fortawesome/free-brands-svg-icons';

const SocialIcons = ({ links }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const iconMap = {
    'linkedin': faLinkedinBrand,
    'github': faGithubBrand,
    'twitter': faTwitterBrand,
    'email': faEnvelope,
    'website': faGlobe,
    'medium': faMediumBrand,
    'blog': faRss
  };

  const toggleSocials = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="social-icons">
      <button 
        className={`social-fab ${isOpen ? 'open' : ''}`} 
        onClick={toggleSocials}
        title="Toggle social links"
      >
        <FontAwesomeIcon icon={faShareAlt} size='lg' />
      </button>
      <div className={`social-icons-container ${isOpen ? 'open' : ''}`}>
        {links.map((link, index) => {
          const iconType = link.name.toLowerCase();
          const Icon = iconMap[iconType] || faEnvelope;
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              title={link.name}
            >
              <FontAwesomeIcon icon={Icon} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialIcons;
