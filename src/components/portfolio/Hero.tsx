import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Frontend Developer
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8">
          Crafting beautiful, responsive web experiences with modern technologies
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
            View My Work
          </button>
          <button className="px-8 py-3 border border-slate-400 hover:border-white hover:bg-white hover:text-slate-900 rounded-lg font-semibold transition-all">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}