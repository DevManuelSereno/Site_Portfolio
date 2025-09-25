'use client';

import React, { useState } from 'react';
import { Phone, Mail, Linkedin, Github } from 'lucide-react';
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send form data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        // Reset form on success
        setFormData({ name: '', phone: '', email: '', message: '' });
        alert('✅ ' + result.message);
      } else {
        // Show error message
        if (result.errors && result.errors.length > 0) {
          alert('❌ Erro:\n\n' + result.errors.join('\n'));
        } else {
          alert('❌ ' + result.message);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('❌ Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 px-4 text-white" style={{backgroundColor: '#1B1D20'}}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeInUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{background: 'linear-gradient(90deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent'}}>
              GOSTOU DO MEU TRABALHO?
            </h2>
            <p className="text-xl text-slate-300 mb-2">
              Vamos trocar ideias, conversar sobre como eu posso te ajudar!
            </p>
            <p className="text-slate-400">
              Preencha o formulário abaixo e eu entrarei em contato o mais breve possível.
            </p>
          </div>
        </FadeInUp>

        {/* Unified Contact Container with Border */}
        <FadeInUp delay={0.2}>
          <div className="p-8 rounded-lg border-2" style={{backgroundColor: 'rgba(27, 29, 32, 0.8)', borderColor: '#00CDF6'}}>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <FadeInLeft delay={0.4}>
                <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-white mb-3">
                      NOME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-slate-600 focus:border-cyan-400 focus:outline-none text-white placeholder-slate-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-white mb-3">
                      NÚMERO
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-slate-600 focus:border-cyan-400 focus:outline-none text-white placeholder-slate-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-white mb-3">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-slate-600 focus:border-cyan-400 focus:outline-none text-white placeholder-slate-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-white mb-3">
                    COMENTE MAIS COMO POSSO TE AJUDAR:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-slate-600 focus:border-cyan-400 focus:outline-none text-white placeholder-slate-500 resize-none transition-colors"
                  />
                </div>
                
                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-3 disabled:opacity-50 disabled:cursor-not-allowed rounded-full font-bold text-white transition-all duration-300 hover:scale-105"
                    style={{background: isSubmitting ? '#6B7280' : 'linear-gradient(90deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%)'}}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = 'linear-gradient(90deg, #00B8E1 0%, #0088D7 70%, #007ACC 100%)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = 'linear-gradient(90deg, #00CDF6 0%, #009BEC 70%, #008BE1 100%)';
                      }
                    }}
                  >
                    {isSubmitting ? 'Enviando...' : 'ENVIAR'}
                  </button>
                </div>
              </form>
                </div>
              </FadeInLeft>
            
            {/* Contact Information */}
            <FadeInRight delay={0.6}>
              <StaggerContainer>
                <div className="grid grid-cols-2 gap-6">
                  {/* Phone */}
                  <StaggerItem>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg" style={{backgroundColor: '#2A2D32'}}>
                      <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <Phone className="h-8 w-8 text-cyan-400" />
                      </div>
                      <h3 className="text-xs font-bold text-white mb-2">NÚMERO PARA CONTATO</h3>
                      <p className="text-white text-sm">(71) 99995-6042</p>
                    </div>
                  </StaggerItem>
              
                  {/* Email */}
                  <StaggerItem>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg" style={{backgroundColor: '#2A2D32'}}>
                      <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <Mail className="h-8 w-8 text-cyan-400" />
                      </div>
                      <h3 className="text-xs font-bold text-white mb-2">EMAIL PARA CONTATO</h3>
                      <p className="text-white text-sm">nelfsereno@gmail.com</p>
                    </div>
                  </StaggerItem>
              
                  {/* LinkedIn */}
                  <StaggerItem>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg" style={{backgroundColor: '#2A2D32'}}>
                      <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <Linkedin className="h-8 w-8 text-cyan-400" />
                      </div>
                      <h3 className="text-xs font-bold text-white mb-2">LINKEDIN</h3>
                      <a 
                        href="https://linkedin.com/in/dev-manuel-sereno" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white text-sm hover:text-cyan-400 transition-colors"
                      >
                        @MANUELSERENO
                      </a>
                    </div>
                  </StaggerItem>
              
                  {/* GitHub */}
                  <StaggerItem>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg" style={{backgroundColor: '#2A2D32'}}>
                      <div className="w-12 h-12 flex items-center justify-center mb-4">
                        <Github className="h-8 w-8 text-cyan-400" />
                      </div>
                      <h3 className="text-xs font-bold text-white mb-2">GITHUB</h3>
                      <a 
                        href="https://github.com/DevManuelSereno" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white text-sm hover:text-cyan-400 transition-colors"
                      >
                        @DEVMANUELSERENO
                      </a>
                    </div>
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </FadeInRight>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
