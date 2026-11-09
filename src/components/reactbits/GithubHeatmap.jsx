import React, { useState } from 'react';
import { GitCommit, Flame, Award, TrendingUp } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

/**
 * GithubHeatmap - React Bits Component
 * Interactive simulated GitHub contribution matrix with streak analytics.
 */
export default function GithubHeatmap() {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate 26 weeks x 7 days (6 months of vibrant activity)
  const weeks = 24;
  const days = 7;

  // Realistic commit distribution
  const grid = Array.from({ length: weeks }, (_, wIndex) =>
    Array.from({ length: days }, (_, dIndex) => {
      // Deterministic pseudo-randomness for stable rendering
      const rand = ((wIndex * 7 + dIndex) * 9301 + 49297) % 233280 / 233280;
      let count = 0;
      if (rand > 0.82) count = Math.floor(rand * 12);
      else if (rand > 0.55) count = Math.floor(rand * 6) + 1;
      else if (rand > 0.25) count = Math.floor(rand * 3) + 1;
      return {
        date: `2026-W${wIndex + 1}-D${dIndex + 1}`,
        count,
      };
    })
  );

  const getColor = (count) => {
    if (count === 0) return 'bg-slate-200/60 dark:bg-white/5';
    if (count <= 2) return 'bg-blue-400/40 dark:bg-blue-900/60';
    if (count <= 5) return 'bg-blue-500/70 dark:bg-blue-700/80';
    if (count <= 8) return 'bg-blue-600 dark:bg-blue-500';
    return 'bg-blue-700 dark:bg-blue-400';
  };

  return (
    <SpotlightCard className="p-5 space-y-4">
      {/* Title & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center space-x-2">
          <GitCommit className="w-4 h-4 text-accent" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Aktivitas Kode & Kontribusi (GitHub)
          </h4>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          <span className="flex items-center space-x-1 text-slate-500">
            <TrendingUp className="w-3.5 h-3.5 text-accent" />
            <strong className="text-slate-800 dark:text-slate-200">842+</strong> commits / thn
          </span>
          <span className="flex items-center space-x-1 text-slate-500">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <strong className="text-slate-800 dark:text-slate-200">94 hari</strong> streak
          </span>
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="relative overflow-x-auto pb-1">
        <div className="flex gap-1 min-w-[460px]">
          {grid.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1 flex-1">
              {week.map((cell, dIdx) => (
                <div
                  key={dIdx}
                  onMouseEnter={() => setHoveredCell(cell)}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`w-full aspect-square rounded-[2.5px] ${getColor(cell.count)} transition-all duration-150 hover:scale-125 hover:z-10 cursor-pointer`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Hover Info */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
        <div>
          {hoveredCell ? (
            <span className="text-slate-800 dark:text-slate-200 font-semibold">
              {hoveredCell.count} kontribusi pada hari ini
            </span>
          ) : (
            <span>Arahkan kursor pada kotak untuk melihat detail</span>
          )}
        </div>

        <div className="flex items-center space-x-1.5">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-200 dark:bg-white/5" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-400/40 dark:bg-blue-900/60" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-500/70 dark:bg-blue-700/80" />
          <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-700 dark:bg-blue-400" />
          <span>More</span>
        </div>
      </div>
    </SpotlightCard>
  );
}

