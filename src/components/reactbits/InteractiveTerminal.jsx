import React, { useState, useMemo } from 'react';
import { Terminal, Copy, Check, Code, FileText } from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';
import portfolioData from '../../data/portfolioData';

/**
 * InteractiveTerminal - React Bits Component
 * Dimensional developer playground with tabbed code views and simulated interactive shell.
 * Automatically synchronizes with src/data/portfolioData.js
 */
export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState('profile.ts');
  const [copied, setCopied] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { cmd: 'whoami', output: `${portfolioData.personal.name} - ${portfolioData.personal.typewriterRoles[0]}` },
    { cmd: 'tech --status', output: 'System operational: Next.js, TypeScript, PostgreSQL, Docker (100% healthy)' }
  ]);

  const tabs = [
    { id: 'profile.ts', label: 'profile.ts', icon: <Code className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'stack.json', label: 'stack.json', icon: <FileText className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'terminal.sh', label: 'terminal.sh', icon: <Terminal className="w-3.5 h-3.5 text-amber-400" /> }
  ];

  const files = useMemo(() => ({
    'profile.ts': `export const developer: Engineer = {
  name: "${portfolioData.personal.name}",
  roles: ${JSON.stringify(portfolioData.personal.typewriterRoles)},
  location: "${portfolioData.personal.location} (${portfolioData.personal.timeZone})",
  status: "${portfolioData.personal.statusBadge}"
};`,
    'stack.json': JSON.stringify({
      coreStack: portfolioData.skills,
      metrics: {
        experienceYears: portfolioData.about.stats[0]?.value || 3,
        completedProjects: portfolioData.about.stats[1]?.value || 25,
        qualityCommitment: `${portfolioData.about.stats[2]?.value || 99}%`
      }
    }, null, 2)
  }), []);

  const handleCopy = () => {
    soundFX.playClick();
    const content = files[activeTab] || `${portfolioData.personal.name} Portfolio`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    soundFX.playClick();
    let reply = `Command not recognized: '${cmd}'. Available: help, whoami, skills, clear, contact`;

    if (cmd === 'help') {
      reply = 'Commands: whoami, skills, projects, contact, stats, clear';
    } else if (cmd === 'whoami') {
      reply = `${portfolioData.personal.name} — ${portfolioData.personal.bio}`;
    } else if (cmd === 'skills') {
      reply = `Frontend: ${portfolioData.skills.frontend.join(', ')} | Backend: ${portfolioData.skills.backend.join(', ')}`;
    } else if (cmd === 'projects') {
      reply = `${portfolioData.projects.length} featured projects live in portfolio. Check the Projects section below.`;
    } else if (cmd === 'contact') {
      reply = `Email: ${portfolioData.contact.email} | WA: ${portfolioData.contact.whatsappDisplay}`;
    } else if (cmd === 'stats') {
      reply = portfolioData.about.stats.map(s => `${s.label}: ${s.value}${s.suffix}`).join(' | ');
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    }

    setTerminalHistory((prev) => [...prev, { cmd: commandInput.trim(), output: reply }]);
    setCommandInput('');
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-white/10 overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/80 dark:bg-obsidian-950/80 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">playground-env</span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { soundFX.playClick(); setActiveTab(tab.id); }}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-obsidian-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Copy button */}
        {activeTab !== 'terminal.sh' && (
          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-accent transition-colors cursor-pointer"
            title="Salin Kode"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 font-mono text-xs overflow-x-auto min-h-[220px] max-h-[260px] scrollbar-thin">
        {activeTab !== 'terminal.sh' ? (
          <pre className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre font-mono">
            {files[activeTab]}
          </pre>
        ) : (
          <div className="space-y-3">
            <div className="text-slate-400 dark:text-slate-500 text-[11px]">
              Ketik <span className="text-accent font-semibold">'help'</span> untuk melihat perintah terminal yang tersedia.
            </div>

            {terminalHistory.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
                  <span className="text-emerald-500">user@portofolio:~$</span>
                  <span>{item.cmd}</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 pl-4 whitespace-pre-wrap">
                  {item.output}
                </div>
              </div>
            ))}

            <form onSubmit={handleCommandSubmit} className="flex items-center space-x-1.5 pt-1">
              <span className="text-emerald-500">user@portofolio:~$</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="ketik help, whoami, skills..."
                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white text-xs font-mono"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
