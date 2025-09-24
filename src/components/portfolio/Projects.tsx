import React from 'react';

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with React, TypeScript, and Stripe integration.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Stripe"],
    image: "/placeholder-project.jpg",
    github: "#",
    live: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
    image: "/placeholder-project.jpg",
    github: "#",
    live: "#"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather dashboard with interactive charts and forecasts.",
    technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
    image: "/placeholder-project.jpg",
    github: "#",
    live: "#"
  }
];

export default function Projects() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-slate-200 flex items-center justify-center">
                <span className="text-slate-500">Project Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a 
                    href={project.github} 
                    className="text-slate-600 hover:text-slate-800 font-medium"
                  >
                    GitHub →
                  </a>
                  <a 
                    href={project.live} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Live Demo →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}