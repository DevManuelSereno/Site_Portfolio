'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navigation = [
    { name: 'home', href: '#home', label: 'home' },
    { name: 'sobre', href: '#sobre', label: 'sobre' },
    { name: 'habilidades', href: '#habilidades', label: 'habilidades' },
    { name: 'projetos', href: '#projetos', label: 'projetos' },
    { name: 'contato', href: '#contato', label: 'contato' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(nav => document.getElementById(nav.name));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigation[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, sectionName: string) => {
    setActiveSection(sectionName);
    setIsMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b" style={{backgroundColor: 'rgba(27, 29, 32, 0.95)', borderBottomColor: '#2A2D32'}}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home', 'home');
              }}
              className="text-white font-bold text-lg hover:text-blue-400 transition-colors"
            >
              <div>DEV MANUEL</div>
              <div className="font-bold text-cyan-400"> SERENO</div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.name);
                }}
                className={`relative text-white hover:text-blue-400 transition-all duration-300 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-blue-400 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 ${
                  activeSection === item.name ? 'text-blue-400' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-400 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t" style={{backgroundColor: '#1B1D20', borderTopColor: '#2A2D32'}}>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.name);
                  }}
                  className={`block px-3 py-2 text-white hover:text-blue-400 rounded-md transition-all duration-200 ${
                    activeSection === item.name ? 'text-blue-400 bg-slate-800' : ''
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;