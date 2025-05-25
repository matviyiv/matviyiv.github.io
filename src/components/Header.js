import React from 'react';

function Header({ name, title }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-lg">
      <div className="max-w-screen-xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{name || 'Your Name'}</h1>
        <p className="text-xl md:text-2xl font-semibold">{title || 'Tech Lead Full-Stack Developer'}</p>
      </div>
    </header>
  );
}

export default Header;
