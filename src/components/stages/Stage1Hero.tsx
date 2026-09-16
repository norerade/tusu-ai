import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_PRESETS } from '../../data/presets';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Compass,
  FileSpreadsheet,
  GraduationCap
} from 'lucide-react';

export const Stage1Hero: React.FC = () => {
  const { setCurrentStage, loadPreset } = useApp();

  return (
    <div className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Top Value Banner */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Официальный кейс 02 • LOCUS Startup Hackathon 2026</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Абитуриенту нужен <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400">маршрут</span>, а не еще один список университетов
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Превратите ваши оценки, бюджет и интересы в прозрачный персонализированный план: <strong className="text-white">куда поступать</strong>, <strong className="text-white">почему этот вариант подходит</strong> и <strong className="text-cyan-400">какое действие сделать следующим</strong>.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setCurrentStage(2)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 text-white font-bold text-base shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Построить персональный маршрут</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => loadPreset(DEMO_PRESETS[0])}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Тест для жюри: Профиль Алихана (1 клик)</span>
          </button>
        </div>

        {/* Value metrics tags */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Анкета за 3 минуты</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Казахстан + Европа + Азия + США</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Фокус на 100% гранты и стипендии</span>
          </div>
        </div>
      </div>

      {/* Problem vs Solution Comparison Card */}
      <div className="grid md:grid-cols-2 gap-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        {/* The Old Painful Way */}
        <div className="space-y-4 border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0 md:pr-6">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Как происходит сейчас (Хаос и стресс)</span>
          </div>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold text-base leading-none">✕</span>
              <span>50 открытых вкладок с разрозненными правилами приема, налогами и взносами.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold text-base leading-none">✕</span>
              <span>Общие безличные рейтинги («Top 100 universities»), не учитывающие ваш реальный бюджет и баллы.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold text-base leading-none">✕</span>
              <span>Пропущенные дедлайны ранней подачи на стипендии (DSU, DAAD, KAIST, МОН РК).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold text-base leading-none">✕</span>
              <span>Непонимание: за что хвататься прямо сейчас (IELTS, эссе, ЕНТ или транскрипт?).</span>
            </li>
          </ul>
        </div>

        {/* The AdmitRoute AI Way */}
        <div className="space-y-4 md:pl-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Как решает AdmitRoute AI</span>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
              <span><strong className="text-white">Точная диагностика:</strong> мгновенный аудит сильных сторон, узких мест и шансов на грант.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
              <span><strong className="text-white">Триада Dream / Target / Safety:</strong> подбор вузов с прозрачным объяснением «почему подходит».</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
              <span><strong className="text-white">Интерактивный Roadmap:</strong> четкие даты экзаменов, сбора документов и дедлайнов.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
              <span><strong className="text-white">Один следующий шаг:</strong> выделенное действие №1 прямо сейчас с трекером прогресса.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3 Steps Overview Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white text-center">Как устроен ваш путь к зачислению</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
              01
            </div>
            <h3 className="font-semibold text-white text-base">Умная анкета профиля</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Укажите текущий класс, оценки (GPA), сданные тесты (IELTS, SAT, ЕНТ), приоритетные страны и комфортный бюджет.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
              02
            </div>
            <h3 className="font-semibold text-white text-base">Подбор и сравнение программ</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Алгоритм сопоставляет критерии с базой вузов, классифицирует варианты по уровню риска и показывает доступные гранты.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              03
            </div>
            <h3 className="font-semibold text-white text-base">Пошаговый план и календарь</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Получите дорожную карту по кварталам, экспортируйте дедлайны в календарь (.ics) и отмечайте выполненные шаги.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Launcher for Jury */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white text-sm">Проверочный сценарий для экспертов жюри</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Нажмите на любого абитуриента, чтобы мгновенно протестировать расчет рекомендаций, диагностику и дорожную карту:
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset)}
              className="text-left p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl p-1.5 rounded-lg bg-slate-800 group-hover:scale-110 transition-transform">
                  {preset.avatar}
                </span>
                <div>
                  <div className="font-semibold text-sm text-slate-100 group-hover:text-cyan-300">
                    {preset.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {preset.tagline}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
