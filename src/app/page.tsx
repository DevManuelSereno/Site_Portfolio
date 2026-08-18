import { SiteNav } from '@/components/layout/site-nav';
import { HeroSection } from '@/components/portfolio/hero-section';
import { AboutSection } from '@/components/portfolio/about-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { ServicesSection } from '@/components/portfolio/services-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { ContactSection } from '@/components/portfolio/contact-section';
import { SiteFooter } from '@/components/layout/site-footer';

export default function Home() {
  return (
    <div className="min-h-svh">
      <SiteNav />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
