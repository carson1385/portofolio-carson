import React from 'react';
import { MessageSquare, CheckCheck } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import portfolioData from '../../data/portfolioData';

/**
 * WhatsAppPreview - React Bits Component
 * Real-time interactive WhatsApp message preview with realistic chat bubble styling.
 */
export default function WhatsAppPreview({ name, email, subject, message }) {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const devName = portfolioData.personal.name;
  const initials = portfolioData.personal.initials;

  const isMessageFilled = Boolean(message && message.trim().length > 0);

  return (
    <SpotlightCard className="p-5 border-emerald-500/25 bg-white dark:bg-obsidian-900 overflow-hidden shadow-md">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 mb-3.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {initials}
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{devName} (Direct)</h5>
            <span className="text-[10px] text-emerald-500 font-semibold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online &bull; Siap Merespons</span>
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
          Live WhatsApp Preview
        </span>
      </div>

      {/* Chat Area Background */}
      <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-obsidian-950/70 border border-slate-200/60 dark:border-white/5 space-y-2">
        <div className="text-[10px] text-center text-slate-400 font-mono py-0.5">
          Hari ini &bull; Pesan Terenkripsi End-to-End
        </div>

        {/* Dynamic Bubble */}
        <div className="ml-auto max-w-[90%] p-3.5 rounded-2xl rounded-tr-xs bg-emerald-600 text-white shadow-lg space-y-1 text-xs transition-all duration-200">
          <div className="text-[11px] font-bold text-emerald-100 border-b border-emerald-500/40 pb-1">
            Halo {devName}!
          </div>

          <div className="space-y-0.5 text-[11px] leading-relaxed pt-1">
            <div><strong>Pengirim:</strong> {name.trim() || 'Nama Anda'}</div>
            <div><strong>Email:</strong> {email.trim() || 'email@domain.com'}</div>
            <div><strong>Subjek:</strong> {subject.trim() || 'Diskusi Proyek'}</div>
            <div className="mt-1.5 pt-1 border-t border-emerald-500/30 text-emerald-50">
              "{message.trim() || 'Pesan Anda akan muncul di sini secara real-time saat Anda mengetik di formulir...'}"
            </div>
          </div>

          <div className="flex items-center justify-end space-x-1 text-[9px] text-emerald-200 pt-1.5">
            <span>{currentTime}</span>
            <CheckCheck className="w-3.5 h-3.5 text-emerald-200" />
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
