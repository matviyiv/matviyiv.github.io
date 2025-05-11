import React from 'react';

function Header({ name, title }) {
  return (
    <header className="App-header">
      <h1>{name || 'Your Name'}</h1>
      <p>{title || 'Tech Lead Full-Stack Developer'}</p>
    </header>
  );
}

export default Header;
