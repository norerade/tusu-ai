import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto bg-slate-950 border-t border-slate-900 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-slate-300">AdmitRoute AI</span>
          </div>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span>Разработано для LOCUS Startup Hackathon 2026 (Кейс 02: Код сабмита LOCUSCASE2)</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Верифицировано по правилам приема 2025/2026</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Демонстрационные данные и rule-based scoring</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
