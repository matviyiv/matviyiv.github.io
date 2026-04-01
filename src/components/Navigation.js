import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faFileAlt, faBlog } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { path: '/', label: 'Resume', icon: faFileAlt },
    { path: '/articles', label: 'My Articles', icon: faBlog }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Hamburger Button - Fixed in top right */}
      <button
        onClick={toggleSidebar}
        className="fixed top-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg p-3 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 group"
        aria-label="Toggle navigation"
      >
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          className="text-xl transition-transform duration-300 group-hover:scale-110"
        />
      </button>

      {/* Overlay - darkens background when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-lg border-l border-cyan-500/30 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-20">
          {/* Navigation Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
              Navigation
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 mt-2 rounded-full"></div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    className={`flex items-center gap-4 px-6 py-4 rounded-lg transition-all duration-300 group ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/50 text-cyan-300'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 hover:border hover:border-cyan-500/30'
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`text-xl transition-all duration-300 ${
                        isActive(item.path)
                          ? 'text-cyan-400'
                          : 'text-slate-400 group-hover:text-cyan-400 group-hover:scale-110'
                      }`}
                    />
                    <span className="text-lg font-medium">{item.label}</span>
                    {isActive(item.path) && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="pt-6 border-t border-slate-700/50">
            <p className="text-slate-400 text-sm text-center">
              Built with ❤️ by Nazar Matviyiv
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navigation;
