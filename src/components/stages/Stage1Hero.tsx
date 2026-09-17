import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_PRESETS } from '../../data/presets';
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';

export const Stage1Hero: React.FC = () => {
  const { setCurrentStage, loadPreset } = useApp();

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Кейс 02 • LOCUS Startup Hackathon 2026</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Абитуриенту нужен <span className="underline decoration-zinc-600 underline-offset-8">маршрут</span>, а не еще один список университетов
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
          TUSU.AI превращает академические баллы, бюджет и дедлайны в прозрачную стратегию: <strong className="text-zinc-200">куда поступать</strong>, <strong className="text-zinc-200">почему подходит именно этот вариант</strong> и <strong className="text-zinc-200">какое действие сделать следующим</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentStage(2)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Построить персональный маршрут</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => loadPreset(DEMO_PRESETS[0])}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/80 text-zinc-300 border border-zinc-800 hover:border-zinc-700 font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-zinc-400" />
            <span>Тест для жюри: Профиль Алихана (1 клик)</span>
          </button>
        </div>

        {/* Quick Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Анкета за 3 минуты</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
            <span>Казахстан + Европа + Азия + США</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>Гранты и стипендии (МОН РК, DSU, DAAD, KAIST)</span>
          </div>
        </div>
      </div>

      {/* Problem vs Solution Comparison Matrix */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Pain points */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Текущая реальность абитуриента
            </span>
          </div>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="text-zinc-600 font-mono text-xs mt-0.5">01</span>
              <span>50 открытых вкладок и разрозненные критерии приема без четкой системы.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-600 font-mono text-xs mt-0.5">02</span>
              <span>Безличные рейтинги («Top 100»), игнорирующие ваш реальный бюджет и GPA.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-600 font-mono text-xs mt-0.5">03</span>
              <span>Упущенные ранние дедлайны на 100% стипендии и государственные квоты.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-600 font-mono text-xs mt-0.5">04</span>
              <span>Тревожность и непонимание: что делать в первую очередь прямо сегодня.</span>
            </li>
          </ul>
        </div>

        {/* The TUSU.AI way */}
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-700/80 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
              Решение на платформе TUSU.AI
            </span>
          </div>
          <ul className="space-y-3 text-sm text-zinc-300">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-zinc-100 font-semibold">Объективная AI-диагностика:</strong> выявление реальных сильных сторон и дефицитов тестов.</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-zinc-100 font-semibold">Триада Dream / Target / Safety:</strong> сбалансированный портфель программ с объяснением причин.</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-zinc-100 font-semibold">Пошаговый Roadmap:</strong> четкие даты экзаменов, сбора справок, эссе и подачи документов.</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-zinc-100 font-semibold">Один выделенный фокус-шаг:</strong> концентрация на одной первостепенной задаче с трекингом.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3 Core Blocks */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 text-center">
          Как строится маршрут поступления
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
            <div className="font-mono text-xs text-zinc-400">01 / ВВОДНЫЕ</div>
            <div className="font-semibold text-zinc-100 text-base">Академическая анкета</div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Фиксация класса, GPA, баллов IELTS, SAT, ЕНТ, финансовых рамок и приоритетных стран.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
            <div className="font-mono text-xs text-zinc-400">02 / АНАЛИТИКА</div>
            <div className="font-semibold text-zinc-100 text-base">Подбор и сопоставление</div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Алгоритм вычисляет вероятность прохода, подбирает стипендии и строит матрицу сравнения.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2.5">
            <div className="font-mono text-xs text-zinc-400">03 / ДЕЙСТВИЕ</div>
            <div className="font-semibold text-zinc-100 text-base">Календарь и прогресс</div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Поквартальный план, экспорт дедлайнов в iCal и выполнение ключевого фокус-действия.
            </p>
          </div>
        </div>
      </div>

      {/* Jury Quick Test Suite */}
      <div className="p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Тестовые пресеты для проверки жюри (1 клик)
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Нажмите на готовый профиль, чтобы сразу увидеть расчет рекомендаций, диагностику и роадмап:
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset)}
              className="text-left p-4 rounded-xl bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-zinc-200 group-hover:text-white">
                  {preset.title.split('—')[0]}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {preset.profile.targetYear}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                {preset.tagline}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
