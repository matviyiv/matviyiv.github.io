import React from 'react';

function Header({ name, title }) {
  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="max-w-screen-xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 glow-text">
          <span className="inline-block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text animate-gradient">
            {name || 'Your Name'}
          </span>
        </h1>
        <p className="text-2xl md:text-3xl font-light text-cyan-300 mb-6">
          {title || 'Tech Lead Full-Stack Developer'}
        </p>

        {/* Decorative line */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </header>
  );
}

export default Header;
