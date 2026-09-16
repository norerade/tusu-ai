import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ExternalLink,
  MapPin,
  Globe2,
  DollarSign,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Award,
  ShieldCheck
} from 'lucide-react';

export const UniversityDetailModal: React.FC = () => {
  const {
    selectedUniForDetail,
    setSelectedUniForDetail,
    setIsEssayModalOpen
  } = useApp();

  if (!selectedUniForDetail) return null;

  const uni = selectedUniForDetail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/70">
          <div className="flex items-center gap-3.5">
            <div className="text-3xl p-3 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
              {uni.logo}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{uni.name}</h3>
              <p className="text-xs text-slate-400">{uni.nativeName}</p>
              <div className="text-xs font-semibold text-cyan-400 mt-0.5">{uni.programName}</div>
            </div>
          </div>

          <button
            onClick={() => setSelectedUniForDetail(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Key Strengths */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Ключевые преимущества программы:
            </div>
            <div className="space-y-2">
              {uni.keyStrengths.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarship & Funding details */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Гранты и стипендии: {uni.scholarshipName}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {uni.scholarshipDetails}
            </p>
          </div>

          {/* Requirements & Deadlines */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="text-[11px] font-semibold text-slate-400">Минимальные требования:</div>
              <div className="text-slate-200">
                • Мин. GPA: <strong className="text-white">{uni.minGpa}</strong>
              </div>
              <div className="text-slate-200">
                • IELTS: <strong className="text-white">{uni.minIelts}+</strong>
              </div>
              {uni.minSat && (
                <div className="text-slate-200">
                  • SAT: <strong className="text-white">{uni.minSat}+</strong>
                </div>
              )}
              {uni.minEnt && (
                <div className="text-slate-200">
                  • ЕНТ: <strong className="text-white">{uni.minEnt}+</strong>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="text-[11px] font-semibold text-slate-400">Сроки и дедлайны:</div>
              <div className="font-bold text-cyan-300">{uni.deadlineLabel}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Семестр начала: Осень 2026 (Fall Intake)
              </div>
            </div>
          </div>

          {/* Career & Verification */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400">Карьерный трек:</div>
            <p className="text-xs text-slate-300">{uni.careerProspects}</p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{uni.dataSourceNotice}</span>
              </div>
              <a
                href={uni.officialSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Официальный сайт</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              setSelectedUniForDetail(null);
              setIsEssayModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Составить эссе для {uni.name.split(' ')[0]}</span>
          </button>

          <button
            onClick={() => setSelectedUniForDetail(null)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
