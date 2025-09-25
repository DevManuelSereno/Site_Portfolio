'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Calendar, Users, Target } from 'lucide-react';
import Modal from '@/components/ui/modal';
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
  duration: string;
  role: string;
  challenges: string[];
  outcomes: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Giuliana Ragno PSI",
    description: "Criação de Design, manual de marca e desenvolvimento de site landing page profissional.",
    longDescription: "Este projeto envolveu a criação de todo o manual de marca e o design para Giuliana Ragno, uma psicóloga de salvador que buscava uma maior presença na web (além das redes sociais). Desenvolvi todo o design no Figma, e desenvolvi utilizando React TypeScript, Tailwind CSS e Next.JS, com algumas outras bibliotecas para maior estilização do site.",
    technologies: ["Figma", "TypeScript", "React", "Next.JS", "Tailwind CSS", "Lucide-react", "Framer Motion", "Nodemailer"],
    image: "/img-site-giuli-psi.png",
    github: "#",
    live: "#",
    duration: "em desenvolvimento...",
    role: "Desenvolvedor Front-end Web",
    challenges: [
      "Primeiro trabalho freelancer",
      "Primeira vez criando manual de marca",
      "Implementação de sistema de carrosel"
    ],
    outcomes: [
      "",
    ]
  },
  {
    id: 2,
    title: "Biblioteca Virtual",
    description: "Aplicativo de cadastro de livros e usuários.",
    longDescription: "Desenvolvimento de uma aplicação web para uma extensão da faculdade, que consiste em uma biblioteca virtual para servir de acervo para uma instituição específica. Como funcionalidades, permite o cadastro de usuários (Alunos e Professores) e de livros, com restrições de acesso e filtro de pesquisa por tema de livro. Com todas as informações armazenadas em um banco de dados SQL.",
    technologies: ["TypeScript", "Next.JS", "TailwindCSS", "Lucide-React", "PostgreSQL"],
    image: "/img-site-biblioteca-virtual.png",
    github: "https://github.com/DevManuelSereno/Biblioteca-Virtual",
    live: "https://projeto-exemplo-2.vercel.app",
    duration: "2 meses",
    role: "Desenvolvedor Front-End Web",
    challenges: [
      "Sincronização com banco de dados",
      "Cadastro de livros e disponibilização em PDF",
      "Otimização e Responsividade",
      "Primeiro contato com TypeScript e Tailwind CSS"
    ],
    outcomes: [
      "Satisfação do professor responsável pela extensão",
      "Interface intuitiva, acessível e responsiva",
      "Gerenciamento completo de livros e usuários",
    ]
  },
    {
    id: 3,
    title: "Projeto Final: Espaço Psi",
    description: "Projeto final do processo trainee da Praxis Jr.",
    longDescription: "Desenvolvimento de uma aplicação web para gestão de projetos e tarefas em equipe, com funcionalidades de colaboração em tempo real, notificações push e integração com calendários.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/img-site-espaco-psi.png",
    github: "https://github.com/DevAgnaldoJunior/PF_Pr-xisJr",
    live: "https://devagnaldojunior.github.io/PF_Pr-xisJr/",
    duration: "2 semanas",
    role: "Desenvolvedor Front-End Web",
    challenges: [
      "Processo eliminatório para ingressar na EJ",
      "Primeiro contato com o conceito de responsividade",
      "Primeira vez trabalhando em equipe durante desenvolvimento"
    ],
    outcomes: [
      "Atividade que levou a efetivação na EJ",
      "Participação na prototipação e no desenvolvimento",
      "Sistema de colaboração eficiente"
    ]
  },
    {
    id: 4,
    title: "Hollow Knight - Silksong",
    description: "Atividade avaliativa do processo trainee da Praxis Júnior.",
    longDescription: "Este projeto envolveu o cumprimento de uma demanda do processo trainee, onde precisei fazer o desenvolvimento de um site com base em um design previamente prototipado no Figma. Para isso, foi necessário utilizar HTML, CSS e JavaScript para o desenvolvimento do site, e o Git / Github para versionamento e hospedagem do código.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/img-site-hollow-knight.png",
    github: "https://github.com/DevManuelSereno/HollowKnight-Page",
    live: "https://devmanuelsereno.github.io/HollowKnight-Page/",
    duration: "1 semana",
    role: "Desenvolvedor Web",
    challenges: [
      "Primeiro contato com JavaScript",
      "Primeira vez programando de um design pronto",
      "Implementação de sistema de carrosel"
    ],
    outcomes: [
      "Demanda concluída",
      "Familiaridade com a linguagem e com desenvolvimento web",
    ]
  },
  {
    id: 5,
    title: "Demanda Frontend Praxis",
    description: "Demanda de estudo do setor de desenvolvimento frontend da Praxis Jr.",
    longDescription: "Desenvolvimento de uma aplicação web para gestão de projetos e tarefas em equipe, com funcionalidades de colaboração em tempo real, notificações push e integração com calendários.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/img-site-demanda-css.png",
    github: "https://github.com/DevManuelSereno/Demanda_Frontend_Praxis",
    live: "https://devmanuelsereno.github.io/Demanda_Frontend_Praxis/",
    duration: "2 semanas",
    role: "Desenvolvedor Front-End Web",
    challenges: [
      "Processo de conectar ao WhatsApp",
      "Estruturação e escolha de itens no formulário"
    ],
    outcomes: [
      "Cumprimento de demanda do setor",
      "Integração com wpp via JS sem necessitar de API"
    ]
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section id="projetos" className="py-20 px-4" style={{backgroundColor: '#1B1D20'}}>
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Projetos
            </h2>
          </FadeInUp>
          
          <StaggerContainer>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <StaggerItem key={project.id}>
                  <div 
                    onClick={() => openModal(project)}
                    className="group relative bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                  >
                {/* Project Image */}
                <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden">
                  <div className="text-4xl text-white opacity-60">
                    <Image 
                      src={project.image}
                      alt={`Imagem do projeto ${project.title}`}
                      fill
                      sizes='(max-width: 768px), 100vw, 50vw'
                      className='object-cover'
                    />
                  </div>
                  
                  {/* Hover Overlay with Blue Border Effect */}
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <div className="absolute inset-0 border-4 border-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100" />
                  
                  {/* Project Icons */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📱</span>
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">💻</span>
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🌐</span>
                    </div>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Ver detalhes →
                  </div>
                </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Project Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedProject && (
          <div>
            {/* Modal Header Image */}
            <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center relative justify-center">
              <div className="text-6xl text-white opacity-60">
                    <Image
                      src={selectedProject.image}
                      alt={`Imagem do projeto ${selectedProject.title}`}
                      fill
                      className='object-cover md:rounded-l-lg'
                    />
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                {selectedProject.title}
              </h2>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                {selectedProject.longDescription}
              </p>
              
              {/* Project Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div>
                      <span className="font-medium text-slate-800">Duração:</span>
                      <p className="text-slate-600">{selectedProject.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <span className="font-medium text-slate-800">Função:</span>
                      <p className="text-slate-600">{selectedProject.role}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Tecnologias:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Challenges */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  Desafios Enfrentados
                </h4>
                <ul className="space-y-2">
                  {selectedProject.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-600">
                      <span className="text-orange-500 mt-1">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Outcomes */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Resultados Alcançados
                </h4>
                <ul className="space-y-2">
                  {selectedProject.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-600">
                      <span className="text-green-500 mt-1">✓</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-slate-200">
                <a 
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Github size={20} />
                  Ver Código
                </a>
                <a 
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink size={20} />
                  Ver Projeto
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
