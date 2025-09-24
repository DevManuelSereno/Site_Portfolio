'use client';

import React from 'react';
import { Github, Linkedin, Mail, Instagram, Download } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = '/manuel_sereno_cv_desenvolvedor.pdf'; // Replace with your actual PDF filename
    link.download = 'manuel_sereno_cv.pdf'; // This will be the downloaded filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-white pt-16" style={{backgroundColor: '#1B1D20'}}>
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-blue-400 text-lg">
                <span className="text-white">&lt;p&gt;</span> Olá, mundo! <span className="text-white">&lt;/p&gt;</span>
              </p>
              <p className="text-slate-300 text-lg">me chamo</p>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Manuel Sereno
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-white font-medium">
              Desenvolvedor Front-End e UI/UX Designer
            </h2>
            
            <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
              2 anos de experiência com desenvolvimento web, sempre buscando 
              desenvolver soluções digitais rápidas, modernas, escaláveis e personalizadas.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => handleScrollToSection('#contato')}
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center text-white"
                style={{background: 'linear-gradient(90deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%)'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #00B8E1 0%, #0088D7 70%, #007ACC 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%)';
                }}
              >
                Vamos conversar <span className="text-xl">🚀</span>
              </button>
              
              <button 
                onClick={handleDownloadCV}
                className="px-8 py-3 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
              >
                <Download size={20} />
                Baixar CV
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a 
                href="https://github.com/DevManuelSereno" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2A2D32'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/dev-manuel-sereno" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2A2D32'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:nelfsereno@gmail.com"
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2A2D32'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a 
                href="https://instagram.com/nelfsereno" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2A2D32'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
          
          {/* Right Side - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-blue-400/20 shadow-2xl">
                {/* Option A: Use your own image */}
                <Image
                  src="/foto-site-portfolio.jpg" // Replace with your actual image filename
                  alt="Manuel Sereno - Developer Profile Photo"
                  width={384}
                  height={384}
                  className="w-full h-full object-cover"
                  priority
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl" style="background: linear-gradient(to bottom right, #2A2D32, #1B1D20)">👨‍💻</div>';
                    }
                  }}
                />
                
                {/* Option B: Use emoji (comment out the Image above and uncomment this) */}
                {/* 
                <div className="w-full h-full flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #2A2D32, #1B1D20)'}}>
                  <div className="text-6xl">👨‍💻</div>
                </div>
                */}
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
