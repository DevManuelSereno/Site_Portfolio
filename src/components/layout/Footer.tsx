'use client';

import React from 'react';
import { ArrowUp, MapPin, Mail, Linkedin, Github, Instagram } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="text-white" style={{backgroundColor: '#1B1D20'}}>
      {/* Separator Line with Button */}
      <div className="relative">
        {/* Full width line */}
        <div className="absolute top-1/2 left-0 right-0 h-px" style={{backgroundColor: '#2A2D32'}}></div>
        
        {/* Back to Top Button */}
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto flex justify-center">
            <button
              onClick={scrollToTop}
              className="px-8 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 relative"
              style={{background: 'linear-gradient(90deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%)'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #00B8E1 0%, #0088D7 70%, #007ACC 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%)';
              }}
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={20} />
              voltar para home
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side - Personal Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Manuel <span className="text-cyan-500">Sereno</span>
                </h3>
                <p className="text-slate-300 leading-relaxed max-w-lg">
                  Construo soluções modernas e personalizadas para você.
                </p>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold mb-4">Contato:</h4>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-sm">email:</p>
                    <a 
                      href="mailto:nelfsereno@gmail.com"
                      className="text-cyan-500 hover:text-cyan-300 transition-colors"
                    >
                      nelfsereno@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-sm">linkedin:</p>
                    <a 
                      href="https://linkedin.com/in/manuel-sereno"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:text-cyan-300 transition-colors"
                    >
                      @manuelsereno
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-sm">github:</p>
                    <a 
                      href="https://github.com/DevManuelSereno"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:text-cyan-300 transition-colors"
                    >
                      @DevManuelSereno
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-sm">instagram:</p>
                    <a 
                      href="https://instagram.com/nelfsereno"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:text-cyan-300 transition-colors"
                    >
                      @nelfsereno
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mt-8 pt-8">
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <MapPin className="h-4 w-4" />
              <span>Salvador, Bahia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="relative">
        {/* Full width line */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-screen h-px" style={{backgroundColor: '#2A2D32', marginLeft: 'calc(-100vw + 100.4%)'}}></div>
      </div>

      {/* Bottom Footer */}
      <div className="py-6 px-4" style={{backgroundColor: '#141618'}}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 Manuel Sereno | Todos os direitos reservados
            </p>
            <p className="text-slate-500 text-sm">
              Designed by{' '}
              <span className="text-cyan-500 font-medium">Manuel Sereno</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;