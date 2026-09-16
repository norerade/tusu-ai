import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_PRESETS } from '../../data/presets';
import { Compass, Sparkles, Calendar, RotateCcw, Award } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentStage,
    setCurrentStage,
    loadPreset,
    resetAll,
    setIsCalendarModalOpen,
    setIsEssayModalOpen,
    progressPercentage
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div
          onClick={() => setCurrentStage(1)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">
                AdmitRoute<span className="text-cyan-400">.AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                LOCUSCASE2
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">Персональный AI-маршрут поступления</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Jury Presets */}
          <div className="relative group">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors shadow-sm"
              title="Готовые профили абитуриентов для проверки жюри"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline">Демо-профили</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1 rounded font-bold">Жюри</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl p-2 hidden group-hover:block group-focus-within:block animate-in fade-in zoom-in-95 duration-150 z-50">
              <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                Выберите тестовый сценарий
              </div>
              <div className="space-y-1 mt-1">
                {DEMO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => loadPreset(preset)}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{preset.avatar}</span>
                      <span className="text-xs font-semibold text-slate-100 group-hover/item:text-cyan-300">
                        {preset.title.split('—')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{preset.tagline}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Essay Advisor Button */}
          <button
            onClick={() => setIsEssayModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Советник по эссе</span>
          </button>

          {/* Calendar Export Button */}
          <button
            onClick={() => setIsCalendarModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Дедлайны</span>
          </button>

          {/* Progress Indicator */}
          {currentStage >= 3 && (
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="text-right">
                <div className="text-[11px] text-slate-400">Прогресс плана</div>
                <div className="text-xs font-bold text-emerald-400">{progressPercentage}%</div>
              </div>
              <div className="w-12 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={resetAll}
            title="Сбросить все данные"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
