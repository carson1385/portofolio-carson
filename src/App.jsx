import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Sun, Moon, Github, Linkedin, Send, Copy, ArrowUpRight, Code, Terminal, CheckCircle2,
  ExternalLink, Layers, Sparkles, MessageSquare, Menu, X, ArrowDown, Command,
  Home, User, Briefcase, Mail
} from 'lucide-react';

// Centralized Configuration Data
import portfolioData from './data/portfolioData';

// React Bits Components
import Particles from './components/reactbits/Particles';
import Squares from './components/reactbits/Squares';
import DecryptedText from './components/reactbits/DecryptedText';
import BlurText from './components/reactbits/BlurText';
import ShinyText from './components/reactbits/ShinyText';
import SpotlightCard from './components/reactbits/SpotlightCard';
import TiltedCard from './components/reactbits/TiltedCard';
import Magnet from './components/reactbits/Magnet';
import CountUp from './components/reactbits/CountUp';
import BorderBeam from './components/reactbits/BorderBeam';
import AuroraBackground from './components/reactbits/AuroraBackground';
import InfiniteMarquee from './components/reactbits/InfiniteMarquee';
import TrueFocus from './components/reactbits/TrueFocus';
import ProjectModal from './components/reactbits/ProjectModal';
import CommandMenu from './components/reactbits/CommandMenu';
import VariableProximity from './components/reactbits/VariableProximity';
import InteractiveTerminal from './components/reactbits/InteractiveTerminal';
import ExperienceTimeline from './components/reactbits/ExperienceTimeline';
import GithubHeatmap from './components/reactbits/GithubHeatmap';
import WhatsAppPreview from './components/reactbits/WhatsAppPreview';
import AudioToggle from './components/reactbits/AudioToggle';
import { soundFX } from './utils/soundEffects';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Command Menu (Ctrl+K) state
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  // Selected project for modal
  const [selectedProject, setSelectedProject] = useState(null);

  // Environment variable overrides with fallbacks to portfolioData
  const activeEmail = import.meta.env.VITE_CONTACT_EMAIL || portfolioData.contact.email;
  const activeWhatsApp = import.meta.env.VITE_WHATSAPP_PHONE || portfolioData.contact.whatsappNumber;
  const activeGithub = import.meta.env.VITE_GITHUB_URL || portfolioData.contact.socialLinks.github;

  // Typewriter state
  const roles = useMemo(() => portfolioData.personal.typewriterRoles, []);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Projects filter
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3500);
  }, []);

  // Initialize Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    soundFX.playClick();
    setIsDark((prev) => {
      const nextDark = !prev;
      if (nextDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('portfolio-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('portfolio-theme', 'light');
      }
      return nextDark;
    });
  }, []);

  // Scroll Progress and Scrollspy (Optimized with requestAnimationFrame throttling)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          if (totalScroll > 0) {
            setScrollProgress((currentScroll / totalScroll) * 100);
          }

          const sections = ['home', 'about', 'projects', 'contact'];
          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 200 && rect.bottom >= 200) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentFullRole = roles[roleIndex] || "Software Engineer";
    let timer;

    if (!isDeleting && displayedRole.length < currentFullRole.length) {
      timer = setTimeout(() => {
        setDisplayedRole(currentFullRole.substring(0, displayedRole.length + 1));
      }, 85);
    } else if (!isDeleting && displayedRole.length === currentFullRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayedRole.length > 0) {
      timer = setTimeout(() => {
        setDisplayedRole(currentFullRole.substring(0, displayedRole.length - 1));
      }, 40);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex, roles]);

  // Copy email handler
  const handleCopyEmail = useCallback(() => {
    soundFX.playPop();
    navigator.clipboard.writeText(activeEmail);
    showToast("Alamat email berhasil disalin ke clipboard!");
  }, [showToast, activeEmail]);

  // Form submit handler with Confetti
  const handleFormSubmit = (e) => {
    e.preventDefault();
    soundFX.playClick();
    const errors = {};
    if (!formData.name.trim()) errors.name = "Nama wajib diisi";
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = "Email valid wajib diisi";
    if (!formData.subject.trim()) errors.subject = "Subjek wajib diisi";
    if (!formData.message.trim()) errors.message = "Pesan wajib diisi";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      soundFX.playSuccess();
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      showToast("Terima kasih! Pesan Anda telah berhasil terkirim.");

      // Confetti effect
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#3b82f6', '#60a5fa', '#10b981', '#ffffff'],
      });
    }, 700);
  };

  // WhatsApp Forward handler
  const handleWhatsAppForward = () => {
    soundFX.playPop();
    const name = formData.name.trim() || "Pengunjung";
    const email = formData.email.trim() || "-";
    const subject = formData.subject.trim() || "Diskusi Proyek";
    const msg = formData.message.trim() || portfolioData.contact.whatsappDefaultMessage;

    const text = `Halo ${portfolioData.personal.name},%0A%0A*Nama:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subjek:* ${encodeURIComponent(subject)}%0A%0A*Pesan:*%0A${encodeURIComponent(msg)}`;
    window.open(`https://wa.me/${activeWhatsApp}?text=${text}`, '_blank');
    showToast("Membuka WhatsApp...");
  };

  const filteredProjects = selectedFilter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter((p) => p.category === selectedFilter);

  return (
    <div className="bg-slate-50 dark:bg-obsidian-950 text-slate-900 dark:text-slate-100 min-h-screen font-sans selection:bg-accent selection:text-white transition-colors duration-300 relative overflow-x-hidden">
      
      {/* React Bits: Command Palette (Ctrl+K) */}
      <CommandMenu
        isOpen={commandMenuOpen}
        setIsOpen={setCommandMenuOpen}
        onToggleTheme={toggleTheme}
        isDark={isDark}
        onCopyEmail={handleCopyEmail}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-accent via-blue-400 to-sky-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ==================== NAVBAR (EXACTLY 4 ITEMS) ==================== */}
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-white/80 dark:bg-obsidian-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-white/10 z-40 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" onClick={() => soundFX.playClick()} className="font-mono text-xl font-bold tracking-tight flex items-center space-x-1 group">
            <span className="text-slate-400 dark:text-slate-500 group-hover:text-accent transition-colors">&lt;</span>
            <DecryptedText text={portfolioData.personal.initials} speed={40} className="text-slate-900 dark:text-white" />
            <span className="text-accent">.</span>
            <span className="text-slate-400 dark:text-slate-500 group-hover:text-accent transition-colors">/&gt;</span>
          </a>

          {/* Desktop Navigation (Exactly 4 items) */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {['home', 'about', 'projects', 'contact'].map((item) => {
              const label = item === 'home' ? 'Home' : item === 'about' ? 'About Me' : item === 'projects' ? 'Projects' : 'Contact';
              const isActive = activeSection === item;
              return (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => soundFX.playClick()}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive ? 'text-accent font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-2">
            
            {/* Audio Feedback Toggle */}
            <AudioToggle />

            {/* Quick Command Palette Button */}
            <button
              onClick={() => { soundFX.playPop(); setCommandMenuOpen(true); }}
              className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-obsidian-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 text-xs font-mono hover:border-accent hover:text-accent transition-colors cursor-pointer"
              title="Tekan Ctrl+K untuk pencarian cepat"
            >
              <Command className="w-3.5 h-3.5" />
              <span>K</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-obsidian-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Toggle theme mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* WhatsApp Quick CTA in Header */}
            <Magnet magnetStrength={0.25}>
              <a
                href={`https://wa.me/${activeWhatsApp}?text=${encodeURIComponent(portfolioData.contact.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playPop()}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all text-xs font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </Magnet>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => { soundFX.playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-obsidian-800 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-obsidian-900 border-b border-slate-200 dark:border-white/10 px-6 py-5 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-1.5 border-b border-slate-100 dark:border-white/5 ${activeSection === 'home' ? 'text-accent' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-1.5 border-b border-slate-100 dark:border-white/5 ${activeSection === 'about' ? 'text-accent' : 'text-slate-700 dark:text-slate-200'}`}
              >
                About Me
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-1.5 border-b border-slate-100 dark:border-white/5 ${activeSection === 'projects' ? 'text-accent' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-1.5 border-b border-slate-100 dark:border-white/5 ${activeSection === 'contact' ? 'text-accent' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Contact
              </a>
              
              <button
                onClick={() => { setMobileMenuOpen(false); setCommandMenuOpen(true); }}
                className="w-full text-left py-2 text-sm text-slate-500 font-mono flex items-center justify-between"
              >
                <span>Pencarian Cepat</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-obsidian-800 text-xs">Ctrl+K</span>
              </button>

              <a
                href={`https://wa.me/${activeWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-xl bg-emerald-500 text-white font-semibold shadow-lg text-sm"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ==================== 1. HOME SECTION ==================== */}
      <section id="home" className="min-h-[calc(100vh-72px)] flex items-center pt-[72px] pb-16 relative">
        
        {/* React Bits: Atmospheric Aurora Glow */}
        <AuroraBackground className="absolute inset-0 z-0 pointer-events-none" />

        {/* React Bits: Particles Interactive Canvas Background (Optimized count for 60fps) */}
        <Particles
          particleCount={24}
          particleColors={isDark ? ['#3b82f6', '#60a5fa', '#94a3b8'] : ['#2563eb', '#3b82f6', '#64748b']}
          speed={0.35}
          particleHoverFactor={1.8}
          className="opacity-60"
        />

        <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* React Bits: ShinyText inside Status Pill */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-obsidian-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4"></span>
              <ShinyText text={portfolioData.personal.statusBadge} speed={3.5} />
            </div>

            {/* React Bits: DecryptedText on Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-tight">
              {portfolioData.personal.heroGreeting}{" "}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">
                <DecryptedText
                  text={portfolioData.personal.name}
                  speed={35}
                  animateOn="hover"
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                />
              </span>
            </h1>

            {/* Dynamic Typewriter */}
            <div className="text-xl sm:text-2xl font-semibold font-mono text-slate-600 dark:text-slate-300 flex items-center justify-center lg:justify-start space-x-2">
              <span className="text-slate-400 dark:text-slate-500">I build as a</span>
              <span className="text-slate-900 dark:text-white font-bold border-b-2 border-accent pb-0.5">
                {displayedRole}
              </span>
              <span className="text-accent animate-pulse font-normal">|</span>
            </div>

            {/* React Bits: BlurText on Bio */}
            <div className="max-w-xl mx-auto lg:mx-0">
              <BlurText
                text={portfolioData.personal.bio}
                delay={40}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
              />
            </div>

            {/* React Bits: Magnet Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Magnet magnetStrength={0.3}>
                <a
                  href="#projects"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-200"
                >
                  <span>Lihat Proyek</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
              </Magnet>

              <Magnet magnetStrength={0.3}>
                <a
                  href="#contact"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white dark:bg-obsidian-900 hover:bg-slate-100 dark:hover:bg-obsidian-800 text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-200"
                >
                  <span>Hubungi Saya</span>
                </a>
              </Magnet>

              <Magnet magnetStrength={0.2}>
                <a
                  href="#about"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center space-x-1.5 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-semibold transition-colors"
                >
                  <span>Tentang Saya &darr;</span>
                </a>
              </Magnet>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center lg:justify-start space-x-3 pt-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mr-1">Social:</span>
              
              <Magnet magnetStrength={0.4}>
                <a
                  href={activeGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="p-2.5 rounded-xl bg-white dark:bg-obsidian-900 text-slate-600 dark:text-slate-300 hover:text-accent border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-center"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Magnet>

              <Magnet magnetStrength={0.4}>
                <a
                  href={portfolioData.contact.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="p-2.5 rounded-xl bg-white dark:bg-obsidian-900 text-slate-600 dark:text-slate-300 hover:text-accent border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-center"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </Magnet>

              <Magnet magnetStrength={0.4}>
                <a
                  href={`https://wa.me/${activeWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playPop()}
                  className="p-2.5 rounded-xl bg-white dark:bg-obsidian-900 text-slate-600 dark:text-slate-300 hover:text-emerald-500 border border-slate-200 dark:border-white/10 transition-colors flex items-center justify-center"
                  aria-label="WhatsApp Contact"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </Magnet>
            </div>

          </div>

          {/* Right Visual: Profile Card (Adjusted downwards via pt-4 lg:pt-14 as requested) */}
          <div className="lg:col-span-5 flex justify-center pt-4 lg:pt-14">
            <TiltedCard maxTilt={12} className="w-full max-w-sm">
              <SpotlightCard className="p-5 shadow-2xl">
                
                {/* Terminal Header Bar (Layer 1: translateZ 15px) */}
                <div
                  style={{ transform: 'translateZ(15px)' }}
                  className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-white/5 mb-4"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    {portfolioData.personal.terminalUser}
                  </span>
                </div>

                {/* Profile Avatar with Layered Z-Depth (Layer 2: translateZ 35px) */}
                <div
                  style={{ transform: 'translateZ(35px)' }}
                  className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-obsidian-800 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4 shadow-md"
                >
                  <svg viewBox="0 0 200 200" width="100%" height="100%" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="100" r="95" fill="url(#avatarGrad)" stroke="#334155" strokeWidth="2" />
                    <path d="M40 100 H70 L85 85 H120" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
                    <path d="M80 140 H115 L130 120 H160" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
                    <circle cx="100" cy="75" r="32" fill="#cbd5e1" />
                    <path d="M50 160 C50 125, 75 118, 100 118 C125 118, 150 125, 150 160 Z" fill="#94a3b8" />
                    <rect x="76" y="68" width="20" height="12" rx="3" fill="none" stroke="#0f172a" strokeWidth="2.5" />
                    <rect x="104" y="68" width="20" height="12" rx="3" fill="none" stroke="#0f172a" strokeWidth="2.5" />
                    <line x1="96" y1="74" x2="104" y2="74" stroke="#0f172a" strokeWidth="2" />
                  </svg>

                  {/* Floating Parallax Badges (Layer 3: translateZ 50px) */}
                  <div
                    style={{ transform: 'translateZ(50px)' }}
                    className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 dark:bg-obsidian-800/95 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-xl text-xs font-semibold flex items-center space-x-1.5"
                  >
                    <span>⚡</span>
                    <span className="text-slate-800 dark:text-slate-200">{portfolioData.personal.cardBadges.topRight}</span>
                  </div>
                  <div
                    style={{ transform: 'translateZ(50px)' }}
                    className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/95 dark:bg-obsidian-800/95 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-xl text-xs font-semibold flex items-center space-x-1.5"
                  >
                    <span>🚀</span>
                    <span className="text-slate-800 dark:text-slate-200">{portfolioData.personal.cardBadges.bottomLeft}</span>
                  </div>
                </div>

                {/* Profile Info Footer (Layer 1: translateZ 20px) */}
                <div
                  style={{ transform: 'translateZ(20px)' }}
                  className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-white/5 text-left"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Lokasi</span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{portfolioData.personal.location}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Fokus Utama</span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{portfolioData.personal.focusArea}</p>
                  </div>
                </div>

              </SpotlightCard>
            </TiltedCard>
          </div>

        </div>

        {/* React Bits: Infinite Marquee (Continuous sliding Tech Ticker at the bottom of Hero) */}
        <div className="absolute bottom-0 left-0 right-0 py-2 border-t border-slate-200/50 dark:border-white/5 bg-slate-100/40 dark:bg-obsidian-900/40 backdrop-blur-xs">
          <InfiniteMarquee items={portfolioData.techTicker} speed={28} />
        </div>

      </section>

      {/* ==================== 2. ABOUT ME SECTION ==================== */}
      <section id="about" className="py-24 border-t border-slate-200/60 dark:border-white/5 relative">
        
        {/* React Bits: Interactive Squares Grid Background */}
        <Squares
          squareSize={42}
          borderColor={isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)"}
          hoverFillColor="rgba(59, 130, 246, 0.12)"
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
          
          {/* Section Header */}
          <div>
            <span className="text-accent text-sm font-mono font-medium tracking-wider uppercase">
              {portfolioData.about.sectionNumber}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
              <VariableProximity label={portfolioData.about.title} maxScale={1.14} />
            </h2>
            <div className="w-12 h-1 bg-accent rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Story & Metrics (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl font-bold font-heading text-slate-800 dark:text-slate-100 leading-snug">
                {portfolioData.about.heading}
              </h3>
              {portfolioData.about.paragraphs.map((p, idx) => (
                <p key={idx} className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p}
                </p>
              ))}

              {/* React Bits: TrueFocus Core Pillars Tracker */}
              <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-obsidian-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider text-center mb-1">
                  Prinsip Rekayasa Perangkat Lunak:
                </div>
                <TrueFocus
                  sentence={portfolioData.about.engineeringPrinciples}
                  manualMode={false}
                  pauseBetweenAnimations={1.6}
                />
              </div>

              {/* React Bits: CountUp Metrics Component */}
              <div className="grid grid-cols-3 gap-4 py-2">
                {portfolioData.about.stats.map((st, idx) => (
                  <SpotlightCard key={idx} className="p-4 text-center">
                    <span className="block text-3xl font-extrabold text-accent font-heading">
                      <CountUp to={st.value} duration={2.0} suffix={st.suffix} />
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{st.label}</span>
                  </SpotlightCard>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-2">
                <Magnet magnetStrength={0.3}>
                  <a
                    href="#contact"
                    onClick={() => soundFX.playClick()}
                    className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all inline-block"
                  >
                    Mulai Diskusi
                  </a>
                </Magnet>

                <a
                  href={`mailto:${activeEmail}`}
                  onClick={() => soundFX.playClick()}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-obsidian-900 hover:bg-slate-200 dark:hover:bg-obsidian-800 text-slate-700 dark:text-slate-300 text-sm font-semibold border border-slate-200 dark:border-white/10 transition-all flex items-center space-x-2"
                >
                  <span>Kirim Email</span>
                </a>
              </div>

            </div>

            {/* Right Column: Interactive Terminal Playground & Pillars (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* React Bits: Interactive Terminal Playground */}
              <InteractiveTerminal />

              {/* Pillars Cards */}
              {portfolioData.about.pillars.map((pil, idx) => (
                <SpotlightCard key={idx} className="p-4.5 flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                    {idx === 0 ? <Layers className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{pil.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{pil.description}</p>
                  </div>
                </SpotlightCard>
              ))}

            </div>

          </div>

          {/* Deep Additional Sections: Career Timeline & GitHub Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
            
            {/* Career Experience Timeline (7 cols) */}
            <div className="lg:col-span-7">
              <ExperienceTimeline experiences={portfolioData.experiences} />
            </div>

            {/* GitHub Activity Heatmap & Skill Matrix (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <GithubHeatmap />

              {/* Categorized Tech Stack */}
              <SpotlightCard className="p-5 space-y-4">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-200 pb-2 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span>Keahlian & Teknologi Lengkap</span>
                  <Code className="w-4 h-4 text-accent" />
                </h4>

                {/* Frontend */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400">Frontend:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {portfolioData.skills.frontend.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-obsidian-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 hover:border-accent hover:text-accent transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400">Backend & DB:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {portfolioData.skills.backend.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-obsidian-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 hover:border-accent hover:text-accent transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400">Tools:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {portfolioData.skills.tools.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-obsidian-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 hover:border-accent hover:text-accent transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </SpotlightCard>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== 3. PROJECTS SECTION ==================== */}
      <section id="projects" className="py-24 border-t border-slate-200/60 dark:border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="mb-10">
            <span className="text-accent text-sm font-mono font-medium tracking-wider uppercase">03. Portofolio Karya</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
              <VariableProximity label="Featured Projects" maxScale={1.14} />
            </h2>
            <div className="w-12 h-1 bg-accent rounded-full mt-3 mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl text-sm sm:text-base">
              Kumpulan proyek terpilih yang mencerminkan dedikasi saya terhadap clean code, performa optimal, dan user experience. Klik kartu untuk melihat analisis arsitektur mendalam.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {[
              { id: 'all', label: 'Semua Proyek' },
              { id: 'fullstack', label: 'Full-Stack' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend & API' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => { soundFX.playClick(); setSelectedFilter(btn.id); }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === btn.id
                    ? 'bg-accent text-white border border-accent shadow-sm'
                    : 'bg-white dark:bg-obsidian-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-accent'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <SpotlightCard
                key={project.id}
                onClick={() => { soundFX.playPop(); setSelectedProject(project); }}
                className={`flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 cursor-pointer ${
                  project.featured ? 'border-accent/40 shadow-xl' : ''
                }`}
              >
                {/* React Bits: BorderBeam on Featured Card */}
                {project.featured && (
                  <BorderBeam size={180} duration={7} colorFrom="#3b82f6" colorTo="#60a5fa" />
                )}

                {/* Thumbnail / Header Mockup */}
                <div className="h-44 bg-slate-100 dark:bg-obsidian-800 p-4 border-b border-slate-200 dark:border-white/10 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center space-x-1.5 bg-black/30 dark:bg-black/50 px-3 py-1.5 rounded-md w-fit backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span className="font-mono text-[10px] text-slate-400 ml-2">https://app.{project.category}.dev</span>
                  </div>

                  {/* Visual Bar Accent */}
                  <div className="flex items-end space-x-3 h-16 px-4">
                    <div className="flex-1 bg-accent/40 rounded-t h-[45%] group-hover:h-[65%] transition-all duration-500"></div>
                    <div className="flex-1 bg-accent/70 rounded-t h-[75%] group-hover:h-[90%] transition-all duration-500"></div>
                    <div className="flex-1 bg-accent/50 rounded-t h-[60%] group-hover:h-[75%] transition-all duration-500"></div>
                    <div className="flex-1 bg-accent rounded-t h-[90%] group-hover:h-[100%] transition-all duration-500"></div>
                  </div>

                  {project.featured && (
                    <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-semibold text-[11px]">
                      Featured
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                      <span>{project.categoryLabel}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-accent transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                      {project.desc}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-2 mb-4">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-5 pt-3 border-t border-slate-100 dark:border-white/5 text-xs font-semibold">
                      <span className="text-accent hover:underline inline-flex items-center space-x-1">
                        <span>Lihat Detail Arsitektur</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                </div>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== 4. CONTACT SECTION ==================== */}
      <section id="contact" className="py-24 border-t border-slate-200/60 dark:border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="mb-14">
            <span className="text-accent text-sm font-mono font-medium tracking-wider uppercase">04. Mari Berkolaborasi</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
              <VariableProximity label="Contact Me" maxScale={1.14} />
            </h2>
            <div className="w-12 h-1 bg-accent rounded-full mt-3 mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl text-sm sm:text-base">
              Punya ide proyek, tawaran kerjasama, atau sekadar ingin bertukar pikiran seputar software engineering? Pintu saya selalu terbuka.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Channels & Real-Time WhatsApp Live Preview (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <h3 className="text-xl font-bold font-heading text-slate-800 dark:text-slate-100 mb-2">Hubungi Langsung</h3>

              {/* WhatsApp Highlight Card */}
              <a
                href={`https://wa.me/${activeWhatsApp}?text=${encodeURIComponent(portfolioData.contact.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playPop()}
                className="block"
              >
                <SpotlightCard className="p-5 border-emerald-500/30 hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-500 font-semibold block">Fast Response</span>
                      <span className="text-base font-bold text-slate-900 dark:text-white block">{portfolioData.contact.whatsappDisplay}</span>
                      <span className="text-xs text-emerald-500 font-medium">Buka obrolan WhatsApp &rarr;</span>
                    </div>
                  </div>
                </SpotlightCard>
              </a>

              {/* React Bits: Real-Time WhatsApp Message Live Preview */}
              <WhatsAppPreview
                name={formData.name}
                email={formData.email}
                subject={formData.subject}
                message={formData.message}
              />

              {/* Email Card with Copy button */}
              <SpotlightCard className="p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">Email Pribadi</span>
                    <a href={`mailto:${activeEmail}`} className="text-sm font-bold text-slate-900 dark:text-white hover:text-accent transition-colors">
                      {activeEmail}
                    </a>
                  </div>
                </div>
                <Magnet magnetStrength={0.3}>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-obsidian-800 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                    title="Salin Email"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </Magnet>
              </SpotlightCard>

              {/* Location Card */}
              <SpotlightCard className="p-5 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-obsidian-800 text-slate-400 flex items-center justify-center flex-shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">Lokasi & Zona Waktu</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">{portfolioData.personal.location} ({portfolioData.personal.timeZone})</span>
                </div>
              </SpotlightCard>

            </div>

            {/* Right Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <SpotlightCard className="p-7 shadow-xl">
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-1">Kirim Pesan</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">Isi formulir dan pesan akan siap dikirimkan kepada saya.</p>

                <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-800 border ${formErrors.name ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'} text-slate-900 dark:text-white text-sm focus:outline-none focus:border-accent transition-all`}
                        placeholder={portfolioData.personal.name}
                      />
                      {formErrors.name && <span className="text-xs text-rose-500 mt-1 block">{formErrors.name}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Anda *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-800 border ${formErrors.email ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'} text-slate-900 dark:text-white text-sm focus:outline-none focus:border-accent transition-all`}
                        placeholder="nama@email.com"
                      />
                      {formErrors.email && <span className="text-xs text-rose-500 mt-1 block">{formErrors.email}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subjek Pesan *</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-800 border ${formErrors.subject ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'} text-slate-900 dark:text-white text-sm focus:outline-none focus:border-accent transition-all`}
                      placeholder="Tawaran Kerjasama / Konsultasi Proyek"
                    />
                    {formErrors.subject && <span className="text-xs text-rose-500 mt-1 block">{formErrors.subject}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Isi Pesan *</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-800 border ${formErrors.message ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'} text-slate-900 dark:text-white text-sm focus:outline-none focus:border-accent transition-all`}
                      placeholder="Ceritakan detail proyek atau pertanyaan Anda..."
                    />
                    {formErrors.message && <span className="text-xs text-rose-500 mt-1 block">{formErrors.message}</span>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Magnet magnetStrength={0.2} className="flex-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? 'Mengirimkan...' : 'Kirim Pesan'}</span>
                      </button>
                    </Magnet>

                    <button
                      type="button"
                      onClick={handleWhatsAppForward}
                      className="py-3 px-5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/30 text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Kirim ke WhatsApp</span>
                    </button>
                  </div>

                </form>
              </SpotlightCard>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 border-t border-slate-200/60 dark:border-white/5 bg-white dark:bg-obsidian-950">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <a href="#home" onClick={() => soundFX.playClick()} className="font-mono text-base font-bold text-slate-800 dark:text-white">
              <span className="text-slate-400">&lt;</span>{portfolioData.personal.initials}<span className="text-accent">.</span><span className="text-slate-400">/&gt;</span>
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} {portfolioData.personal.name}. Modern Minimalist Architecture.
            </p>
          </div>
          <div className="flex items-center space-x-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <a href="#home" onClick={() => soundFX.playClick()} className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</a>
            <a href="#about" onClick={() => soundFX.playClick()} className="hover:text-slate-900 dark:hover:text-white transition-colors">About Me</a>
            <a href="#projects" onClick={() => soundFX.playClick()} className="hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a>
            <a href="#contact" onClick={() => soundFX.playClick()} className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Toast Popup Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 px-4 py-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-white/10 shadow-2xl flex items-center space-x-3 z-50 animate-in fade-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">{toast.message}</span>
        </div>
      )}

    </div>
  );
}
