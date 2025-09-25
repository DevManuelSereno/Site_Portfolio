import React from 'react';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

export default function About() {
  return (
    <section id="sobre" className="py-20 px-4" style={{backgroundColor: '#1B1D20'}}>
      <div className="max-w-6xl mx-auto">
        <FadeInUp>
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Sobre mim
          </h2>
        </FadeInUp>
        
        {/* About Description */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeInUp delay={0.2}>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Sou apaixonado por tecnologia e encontrei na programação a oportunidade de transformar essa paixão 
              em carreira. Atualmente curso o 8° semestre de Ciência da Computação, ampliando minha visão em TI e 
              reforçando meu interesse em atuar como desenvolvedor.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Atuo como desenvolvedor web na Praxis Empresa Júnior, criando soluções com HTML5, CSS3, JavaScript ES6+ 
              Além de ferramentas de design como Figma e Canva. Também trabalho com ferramentas como HostGator, 
              adquirindo experiência em projetos modernos, escaláveis e de impacto. Também pude começar meus estudos
              com React, SCSS, Node JS e SQL.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.6}>
            <p className="text-lg text-slate-300 leading-relaxed">
              Meu objetivo é consolidar minha carreira como desenvolvedor, unindo base acadêmica, experiência prática 
              e paixão por tecnologia para entregar soluções digitais de qualidade.
            </p>
          </FadeInUp>
        </div>

        {/* Experience and Education Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Professional Experience */}
          <FadeInLeft delay={0.3}>
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-8">
                Experiência Profissional
              </h3>
              
              <StaggerContainer>
                <div className="space-y-6">
                  {/* Current Job */}
                  <StaggerItem>
                    <div className="p-6 rounded-lg border-l-4 border-blue-500" style={{backgroundColor: 'rgba(42, 45, 50, 0.5)'}}>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg" style={{backgroundColor: 'rgba(59, 130, 246, 0.2)'}}>
                          <Briefcase className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-2">
                            Desenvolvedor Front-end Web
                          </h4>
                          <p className="text-blue-600 font-medium mb-2">
                            Praxis Empresa Júnior - Salvador, Bahia
                          </p>
                          <div className="flex items-center gap-2 text-slate-300 mb-3">
                            <Calendar className="h-4 w-4" />
                            <span>De agosto de 2024 até o momento</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                  
                  {/* Previous Job */}
                  <StaggerItem>
                    <div className="p-6 rounded-lg border-l-4 border-blue-500" style={{backgroundColor: 'rgba(42, 45, 50, 0.5)'}}>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg" style={{backgroundColor: 'rgba(59, 130, 246, 0.2)'}}>
                          <Briefcase className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-2">
                            Assessor de Comercial
                          </h4>
                          <p className="text-blue-600 font-medium mb-2">
                            Praxis Empresa Júnior - Salvador, Bahia
                          </p>
                          <div className="flex items-center gap-2 text-slate-300 mb-3">
                            <Calendar className="h-4 w-4" />
                            <span>De agosto de 2024 até fevereiro de 2025</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </div>
          </FadeInLeft>

          {/* Academic Background */}
          <FadeInRight delay={0.3}>
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-8">
                Grau Acadêmico
              </h3>
              
              <StaggerContainer>
                <div className="space-y-6">
                  {/* University */}
                  <StaggerItem>
                    <div className="p-6 rounded-lg border-l-4 border-blue-500" style={{backgroundColor: 'rgba(42, 45, 50, 0.5)'}}>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg" style={{backgroundColor: 'rgba(59, 130, 246, 0.2)'}}>
                          <GraduationCap className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-2">
                            UNIFACS - Universidade Salvador
                          </h4>
                          <p className="text-blue-600 font-medium mb-2">
                            Graduação - em andamento
                          </p>
                          <div className="flex items-center gap-2 text-slate-300 mb-3">
                            <Calendar className="h-4 w-4" />
                            <span>Previsão de conclusão em dez/2025</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                  
                  {/* High School */}
                  <StaggerItem>
                    <div className="p-6 rounded-lg border-l-4 border-blue-500" style={{backgroundColor: 'rgba(42, 45, 50, 0.3)'}}>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg" style={{backgroundColor: 'rgba(59, 130, 246, 0.2)'}}>
                          <GraduationCap className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-2">
                            Colégio Antônio Vieira
                          </h4>
                          <p className="text-blue-600 font-medium mb-2">
                            Ensino Médio - completo
                          </p>
                          <div className="flex items-center gap-2 text-slate-300 mb-3">
                            <Calendar className="h-4 w-4" />
                            <span>De fevereiro de 2017 até dezembro de 2021</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </div>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}
