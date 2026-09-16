import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RecommendationTier, ScoredRecommendation } from '../../types';
import {
  Compass,
  Sparkles,
  ExternalLink,
  GitCompare,
  CheckCircle2,
  Calendar,
  DollarSign,
  GraduationCap,
  Award,
  ArrowRight,
  ArrowLeft,
  Info,
  ShieldCheck
} from 'lucide-react';

export const Stage4Recommendations: React.FC = () => {
  const {
    recommendations,
    comparedUniIds,
    toggleCompareUni,
    setCurrentStage,
    setSelectedUniForDetail,
    setIsEssayModalOpen
  } = useApp();

  const [activeTierFilter, setActiveTierFilter] = useState<'all' | RecommendationTier>('all');

  const filteredRecommendations = activeTierFilter === 'all'
    ? recommendations
    : recommendations.filter(r => r.tier === activeTierFilter);

  const getTierBadge = (tier: RecommendationTier) => {
    switch (tier) {
      case 'dream':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
            🌟 Dream (Амбициозный)
          </span>
        );
      case 'target':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
            🎯 Target (Реалистичный)
          </span>
        );
      case 'safety':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            🛡️ Safety (Надежный)
          </span>
        );
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Этап 4 из 7</span> • <span>Рекомендации программ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Персонализированный подбор университетов
          </h1>
          <p className="text-sm text-slate-400">
            Каждый вариант обоснован вашим GPA, баллами экзаменов, страной и бюджетом на понятном языке.
          </p>
        </div>

        {/* Floating Compare Action Counter */}
        {comparedUniIds.length > 0 && (
          <button
            onClick={() => setCurrentStage(5)}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <GitCompare className="w-4 h-4" />
            <span>Сравнить выбранные ({comparedUniIds.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Tier Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <span className="text-xs font-semibold text-slate-400 mr-2">Категории:</span>
        <button
          onClick={() => setActiveTierFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTierFilter === 'all'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Все ({recommendations.length})
        </button>
        <button
          onClick={() => setActiveTierFilter('target')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTierFilter === 'target'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          🎯 Target ({recommendations.filter(r => r.tier === 'target').length})
        </button>
        <button
          onClick={() => setActiveTierFilter('dream')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTierFilter === 'dream'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              : 'text-slate-400 hover:text-purple-300'
          }`}
        >
          🌟 Dream ({recommendations.filter(r => r.tier === 'dream').length})
        </button>
        <button
          onClick={() => setActiveTierFilter('safety')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTierFilter === 'safety'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-emerald-300'
          }`}
        >
          🛡️ Safety ({recommendations.filter(r => r.tier === 'safety').length})
        </button>
      </div>

      {/* University Cards Grid */}
      <div className="space-y-6">
        {filteredRecommendations.map((rec) => {
          const uni = rec.university;
          const isCompared = comparedUniIds.includes(uni.id);

          return (
            <div
              key={uni.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-slate-900/60 backdrop-blur-sm ${
                isCompared
                  ? 'border-cyan-500 ring-1 ring-cyan-500/40 shadow-xl shadow-cyan-500/5'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header Banner */}
              <div className="p-5 sm:p-6 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/40">
                <div className="flex items-start gap-3.5">
                  <div className="text-3xl p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                    {uni.logo}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-lg sm:text-xl text-white">{uni.name}</h3>
                      <span className="text-xs text-slate-400">({uni.nativeName})</span>
                    </div>
                    <div className="text-sm font-medium text-cyan-400 mt-0.5">
                      {uni.programName}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
                      <span>📍 {uni.city}, {uni.countryName}</span>
                      <span>•</span>
                      <span>🌐 {uni.language}</span>
                      <span>•</span>
                      <span className="text-indigo-300">🏆 {uni.ranking}</span>
                    </div>
                  </div>
                </div>

                {/* Badges & Match Score */}
                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    {getTierBadge(rec.tier)}
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950">
                      {rec.matchScore}% Матч
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Шанс поступления: <strong className="text-slate-200">{rec.chanceCategory}</strong>
                  </div>
                </div>
              </div>

              {/* Card Body: Explanation & Details */}
              <div className="p-5 sm:p-6 space-y-5">
                {/* Human-readable "Why it fits" block */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{rec.whyItFits.title}</span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold block text-[11px]">Академическое соответствие:</span>
                      <p>{rec.whyItFits.academicFit}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold block text-[11px]">Финансовая модель:</span>
                      <p>{rec.whyItFits.financialFit}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold block text-[11px]">Карьерный вектор:</span>
                      <p>{rec.whyItFits.careerFit}</p>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="pt-1 flex flex-wrap gap-2">
                    {rec.whyItFits.points.map((p, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                      <span>Стоимость / Грант</span>
                    </div>
                    <div className="font-bold text-slate-200">
                      {uni.tuitionUsdPerYear === 0 ? 'Бесплатно (Грант)' : `$${uni.tuitionUsdPerYear.toLocaleString()} / год`}
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5 truncate">
                      {uni.scholarshipName}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Требования тестов</span>
                    </div>
                    <div className="font-bold text-slate-200">
                      IELTS {uni.minIelts}+ {uni.minSat ? `• SAT ${uni.minSat}+` : ''} {uni.minEnt ? `• ЕНТ ${uni.minEnt}+` : ''}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Мин. GPA: {uni.minGpa}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Дедлайн подачи</span>
                    </div>
                    <div className="font-bold text-slate-200 line-clamp-1">
                      {uni.deadlineLabel}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Прием на Fall 2026
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Верификация данных</span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium line-clamp-1">
                      {uni.dataSourceNotice}
                    </div>
                    <a
                      href={uni.officialSourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>Официальный сайт</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCompareUni(uni.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isCompared
                          ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                      <span>{isCompared ? 'В сравнении ✓' : 'Добавить к сравнению'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUniForDetail(uni);
                        setIsEssayModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Гид по эссе</span>
                    </button>
                  </div>

                  <a
                    href={uni.officialSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                  >
                    <span>Перейти к правилам приема</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          onClick={() => setCurrentStage(3)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к диагностике</span>
        </button>

        <button
          onClick={() => setCurrentStage(5)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
        >
          <span>Перейти к матрице сравнения (Этап 5)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
