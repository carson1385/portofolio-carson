import React from 'react';
import { MessageSquare, CheckCheck, Clock } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

/**
 * WhatsAppPreview - React Bits Component
 * Real-time interactive WhatsApp message preview with realistic chat bubble styling.
 */
export default function WhatsAppPreview({ name, email, subject, message }) {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <SpotlightCard className="p-5 border-emerald-500/25 bg-white dark:bg-obsidian-900 overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
            CR
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Carson Roderick (Direct)</h5>
            <span className="text-[10px] text-emerald-500 font-semibold block">Online &bull; Siap Merespons</span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-obsidian-800 px-2 py-0.5 rounded">
          Live Preview
        </span>
      </div>

      {/* Chat Area Background */}
      <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-obsidian-950/70 border border-slate-200/60 dark:border-white/5 space-y-2">
        <div className="text-[10px] text-center text-slate-400 font-mono py-0.5">
          Hari ini &bull; Pesan Terenkripsi End-to-End
        </div>

        {/* Dynamic Bubble */}
        <div className="ml-auto max-w-[88%] p-3 rounded-2xl rounded-tr-xs bg-emerald-600 text-white shadow-md space-y-1 text-xs">
          <div className="text-[11px] font-bold text-emerald-100 border-b border-emerald-500/40 pb-1">
            Halo Carson Roderick!
          </div>

          <div className="space-y-0.5 text-[11px] leading-relaxed pt-1">
            <div><strong>Pengirim:</strong> {name.trim() || 'Nama Anda'}</div>
            <div><strong>Email:</strong> {email.trim() || 'email@domain.com'}</div>
            <div><strong>Subjek:</strong> {subject.trim() || 'Topik Diskusi'}</div>
            <div className="mt-1.5 pt-1 border-t border-emerald-500/30 text-slate-100">
              "{message.trim() || 'Pesan Anda akan muncul di sini secara real-time saat Anda mengetik di formulir...'}"
            </div>
          </div>

          <div className="flex items-center justify-end space-x-1 text-[9px] text-emerald-200 pt-1">
            <span>{currentTime}</span>
            <CheckCheck className="w-3.5 h-3.5 text-emerald-200" />
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

