import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, Briefcase, Mail, MessageSquare, Sun, Moon, Copy, FileText, X } from 'lucide-react';

/**
 * CommandMenu - React Bits Component
 * Quick navigation palette triggered by Ctrl+K / Cmd+K.
 */
export default function CommandMenu({ isOpen, setIsOpen, onToggleTheme, isDark, onCopyEmail }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const actions = [
    { id: 'home', label: 'Buka Halaman Home', category: 'Navigasi', icon: <Home className="w-4 h-4" />, action: () => { window.location.hash = '#home'; setIsOpen(false); } },
    { id: 'about', label: 'Buka Bagian About Me', category: 'Navigasi', icon: <User className="w-4 h-4" />, action: () => { window.location.hash = '#about'; setIsOpen(false); } },
    { id: 'projects', label: 'Buka Bagian Projects', category: 'Navigasi', icon: <Briefcase className="w-4 h-4" />, action: () => { window.location.hash = '#projects'; setIsOpen(false); } },
    { id: 'contact', label: 'Buka Bagian Contact', category: 'Navigasi', icon: <Mail className="w-4 h-4" />, action: () => { window.location.hash = '#contact'; setIsOpen(false); } },
    { id: 'wa', label: 'Chat Langsung via WhatsApp', category: 'Kontak', icon: <MessageSquare className="w-4 h-4 text-emerald-500" />, action: () => { window.open('https://wa.me/6281234567890', '_blank'); setIsOpen(false); } },
    { id: 'copy', label: 'Salin Alamat Email', category: 'Kontak', icon: <Copy className="w-4 h-4 text-accent" />, action: () => { onCopyEmail(); setIsOpen(false); } },
    { id: 'theme', label: isDark ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode', category: 'Tampilan', icon: isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />, action: () => { onToggleTheme(); setIsOpen(false); } },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-white/5 space-x-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari perintah atau bagian... (misal: projects, email, whatsapp)"
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                autoFocus
              />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-obsidian-800 text-slate-400">
                ESC
              </span>
            </div>

            {/* Actions List */}
            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              {filtered.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">Tidak ada perintah yang cocok.</div>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-obsidian-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                        {item.icon}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-accent transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-obsidian-800 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-obsidian-850/50 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Navigasi Cepat &bull; Carson Roderick</span>
              <span>Tekan ↵ untuk memilih</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

