import React from 'react';

function Links({ links }) {
  if (!links || links.length === 0) {
    return null; // Or <p>No links available.</p>;
  }
  return (
    <section className="links-section">
      <h2>Links</h2>
      <ul className="links-list">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Links;
