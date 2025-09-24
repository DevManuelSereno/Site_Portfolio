import React from 'react';

export default function About() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-full h-96 bg-slate-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-slate-500">Profile Photo</span>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              I'm a passionate frontend developer with expertise in React, TypeScript, 
              and modern web technologies. I love creating user-friendly interfaces 
              that combine beautiful design with seamless functionality.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              With a focus on clean code and performance optimization, I build 
              scalable applications that provide exceptional user experiences 
              across all devices.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Git'].map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}