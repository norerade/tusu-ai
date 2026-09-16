import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Target,
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

export const Stage3Diagnostic: React.FC = () => {
  const { diagnostics, profile, setCurrentStage } = useApp();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" />
            <span>Этап 3 из 7</span> • <span>AI-диагностика профиля</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Диагностический отчет абитуриента
          </h1>
          <p className="text-sm text-slate-400">
            Объективная оценка академических сил, выявление узких мест и стратегия поступления.
          </p>
        </div>

        <button
          onClick={() => setCurrentStage(2)}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
        >
          Редактировать анкету
        </button>
      </div>

      {/* Hero Diagnostic Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/30 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Резюме профиля: {profile.name || 'Абитуриент'}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {diagnostics.summary}
            </p>

            {/* Educational Goal */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 flex items-start gap-3">
              <Target className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                  Сформулированная образовательная цель
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                  {diagnostics.educationalGoal}
                </div>
              </div>
            </div>
          </div>

          {/* Readiness Score Meter */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center text-center shrink-0 w-full md:w-52 space-y-2 shadow-inner">
            <div className="text-xs text-slate-400 font-medium">Индекс готовности</div>
            <div className="relative flex items-center justify-center">
              <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                {diagnostics.readinessScore}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${diagnostics.readinessScore}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400">
              {diagnostics.readinessScore >= 75
                ? 'Высокая конкурентность'
                : diagnostics.readinessScore >= 55
                ? 'Хорошая база, требуется добор тестов'
                : 'Требуется ранняя подготовка'}
            </span>
          </div>
        </div>
      </div>

      {/* Strengths & Limitations Two-Column Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span>Сильные стороны и преимущества</span>
          </div>

          <ul className="space-y-3">
            {diagnostics.strengths.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Limitations & Bottlenecks */}
        <div className="bg-slate-900/50 border border-amber-500/20 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 text-amber-400 font-bold text-base">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span>Ограничения, риски и дефициты</span>
          </div>

          <ul className="space-y-3">
            {diagnostics.limitations.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  !
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Strategy Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
            Рекомендуемая стратегия поступления
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {diagnostics.recommendedStrategy}
          </p>
        </div>
      </div>

      {/* Stage Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setCurrentStage(2)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к анкете</span>
        </button>

        <button
          onClick={() => setCurrentStage(4)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
        >
          <span>Смотреть рекомендации вузов (Этап 4)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
