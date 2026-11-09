import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, FileText } from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';

/**
 * InteractiveTerminal - React Bits Component
 * Dimensional developer playground with tabbed code views and simulated interactive shell.
 */
export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState('profile.ts');
  const [copied, setCopied] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { cmd: 'whoami', output: 'Carson Roderick - Software Engineer & Coder' },
    { cmd: 'tech --status', output: 'System operational: Next.js, TypeScript, PostgreSQL, Docker (100% healthy)' }
  ]);

  const tabs = [
    { id: 'profile.ts', label: 'profile.ts', icon: <Code className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'stack.json', label: 'stack.json', icon: <FileText className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'terminal.sh', label: 'terminal.sh', icon: <Terminal className="w-3.5 h-3.5 text-amber-400" /> }
  ];

  const files = {
    'profile.ts': `export const developer: Engineer = {
  name: "Carson Roderick",
  roles: ["Software Engineer", "Full-Stack Builder", "Architect"],
  location: "Jakarta, Indonesia (WIB / GMT+7)",
  commitment: "Clean Code & High Scalability",
  passion: "Designing resilient systems that scale effortlessly.",
  status: "Available for high-impact opportunities"
};`,
    'stack.json': `{
  "coreStack": {
    "frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    "backend": ["Node.js", "Express", "RESTful API", "GraphQL"],
    "database": ["PostgreSQL", "Redis", "MongoDB"],
    "devops": ["Docker", "Git/GitHub Actions", "Linux"]
  },
  "metrics": {
    "uptimeCommitment": "99.9%",
    "experienceYears": 3,
    "completedProjects": 25
  }
}`
  };

  const handleCopy = () => {
    soundFX.playClick();
    const content = files[activeTab] || 'Carson Roderick Portfolio';
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    soundFX.playPop();

    let output = '';
    if (cmd === 'help') {
      output = 'Available commands: whoami, skills, projects, contact, clear';
    } else if (cmd === 'whoami') {
      output = 'Carson Roderick - Passionate Software Engineer & Coder';
    } else if (cmd === 'skills') {
      output = 'TypeScript, React, Next.js, Node.js, PostgreSQL, Docker, Tailwind CSS';
    } else if (cmd === 'projects') {
      output = '4 Featured Projects loaded. Scroll down to Projects section!';
    } else if (cmd === 'contact') {
      output = 'WhatsApp: +62 812-3456-7890 | Email: carson.roderick@example.com';
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    } else {
      output = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: commandInput, output }]);
    setCommandInput('');
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/80 dark:bg-obsidian-950/80">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/90" />
          <span className="w-3 h-3 rounded-full bg-amber-500/90" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
        </div>

        {/* Tab switcher */}
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playClick();
                setActiveTab(tab.id);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-obsidian-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          title="Salin isi kode"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Editor Body */}
      <div className="p-4 sm:p-5 max-h-72 overflow-y-auto leading-relaxed">
        {activeTab === 'terminal.sh' ? (
          <div className="space-y-3">
            <div className="text-slate-400 dark:text-slate-500">
              Carson Interactive Terminal v1.0.0. Type <span className="text-accent font-semibold">'help'</span> to see commands.
            </div>

            {terminalHistory.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center space-x-2 text-emerald-500 dark:text-emerald-400">
                  <span>carson@portfolio:~$</span>
                  <span className="text-slate-800 dark:text-slate-200">{item.cmd}</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400 pl-4 border-l border-slate-200 dark:border-white/10">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Input prompt */}
            <form onSubmit={handleCommandSubmit} className="flex items-center space-x-2 pt-1">
              <span className="text-emerald-500 dark:text-emerald-400">carson@portfolio:~$</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="type a command..."
                className="flex-1 bg-transparent text-slate-900 dark:text-white focus:outline-none"
              />
            </form>
          </div>
        ) : (
          <pre className="text-slate-700 dark:text-slate-300 overflow-x-auto whitespace-pre">
            <code>{files[activeTab]}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

