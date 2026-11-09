import React from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import portfolioData from '../../data/portfolioData';

/**
 * ExperienceTimeline - React Bits Component
 * Dimensional interactive career journey timeline with glowing nodes.
 * Automatically synchronizes with src/data/portfolioData.js
 */
export default function ExperienceTimeline({ experiences = portfolioData.experiences }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2">
        <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center space-x-2">
          <Briefcase className="w-4 h-4 text-accent" />
          <span>Riwayat Karir & Pengalaman</span>
        </h4>
        <span className="text-xs font-mono text-emerald-500 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          ● Aktif Berkarya
        </span>
      </div>

      <div className="relative border-l border-slate-200 dark:border-white/10 ml-3 space-y-8 pl-6">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative group">
            {/* Glowing Timeline Dot */}
            <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-obsidian-950 border-2 border-accent group-hover:scale-125 group-hover:shadow-[0_0_10px_#3b82f6] transition-all" />

            <SpotlightCard className="p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h5 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                    {exp.role}
                  </h5>
                  <span className="text-xs text-accent font-semibold">
                    {exp.company} &bull; <span className="text-slate-400 font-normal">{exp.type}</span>
                  </span>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-obsidian-800 text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {exp.description}
              </p>

              {/* Highlights */}
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Skill Tags */}
              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </SpotlightCard>
          </div>
        ))}
      </div>
    </div>
  );
}
