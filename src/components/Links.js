import React from 'react';

function Links({ links }) {
  if (!links || links.length === 0) {
    return null;
  }
  return (
    <footer>
      <div className="links-section">
        <h2>Connect with me</h2>
        <ul className="links-list">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Links;
