import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITIES } from '../../data/universities';
import {
  X,
  Award,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export const EssayAdvisorModal: React.FC = () => {
  const { isEssayModalOpen, setIsEssayModalOpen, profile, selectedUniForDetail } = useApp();
  const [copied, setCopied] = useState(false);
  const [selectedUniId, setSelectedUniId] = useState<string>(() => {
    return selectedUniForDetail?.id || UNIVERSITIES[0].id;
  });

  if (!isEssayModalOpen) return null;

  const currentUni = UNIVERSITIES.find(u => u.id === selectedUniId) || UNIVERSITIES[0];

  const essayStructure = [
    {
      section: 'Часть 1: Крючок и происхождение интереса (10-15% объема)',
      goal: 'Показать искру интереса через конкретную проблему или проект, а не через банальное «я с детства люблю компьютеры».',
      example: `«Работая над автоматизацией анализа данных во время школьного хакатона, я столкнулся с тем, как модели машинного обучения могут оптимизировать распределение ресурсов... Мой интерес к ${currentUni.programName} родился из желания создавать прикладные решения...»`
    },
    {
      section: 'Часть 2: Академический и практический фундамент (35-40%)',
      goal: 'Доказать, что у вас есть база для сложной программы: олимпиады, проекты, курсы, GPA.',
      example: `«Углубленное изучение математики и алгоритмов (GPA ${profile.gpa.toFixed(2)}) позволило мне войти в число призеров олимпиад. В своем проекте я применил Python и базы данных, преодолев сложности с оптимизацией запросов...»`
    },
    {
      section: `Часть 3: Почему именно ${currentUni.name}? (25-30%)`,
      goal: 'Конкретика: профессора, лаборатории, курсы или партнерства вуза. Показать, что вы изучили учебный план.',
      example: `«В ${currentUni.name} меня особенно привлекает лаборатория искусственного интеллекта и практический модуль по распределенным системам. Возможности стажировок в индустриальных хабах (${currentUni.city}) идеально сочетаются с моими целями...»`
    },
    {
      section: 'Часть 4: Долгосрочный вклад и видение карьеры (15-20%)',
      goal: 'Объяснить, кем вы станете после выпуска и какую пользу принесете обществу / индустрии.',
      example: `«После окончания программы я планирую работать над развитием AI-инфраструктуры в Центральной Азии и создавать масштабируемые решения для финтеха и науки...»`
    }
  ];

  const fullTextToCopy = essayStructure.map(s => `${s.section}\nЦЕЛЬ: ${s.goal}\nПРИМЕР:\n${s.example}\n`).join('\n---\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullTextToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">AI-советник по мотивационному эссе</h3>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded">SOP Framework</span>
              </div>
              <p className="text-xs text-slate-400">
                Персональная структура эссе под выбранный университет и специальность
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEssayModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* University Selector in Modal */}
        <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-400">Целевой университет:</span>
          <select
            value={selectedUniId}
            onChange={(e) => setSelectedUniId(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:border-cyan-400 focus:outline-none"
          >
            {UNIVERSITIES.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} — {u.programName}
              </option>
            ))}
          </select>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm">
          {/* Top Advice Card */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-indigo-200 text-xs">Золотое правило приемной комиссии:</div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Комиссия ищет ответ на 3 главных вопроса: «Почему этот кандидат?», «Почему именно эта программа?» и «Что он внесет в академическое сообщество?». Избегайте клише и подтверждайте каждый тезис фактами.
              </p>
            </div>
          </div>

          {/* 4 Sections Breakdown */}
          <div className="space-y-4">
            {essayStructure.map((part, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5"
              >
                <div className="font-bold text-cyan-300 text-xs sm:text-sm">
                  {part.section}
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Фокус:</strong> {part.goal}
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] sm:text-xs text-slate-200 italic leading-relaxed">
                  {part.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copied ? 'Скопировано в буфер!' : 'Скопировать шаблон эссе'}</span>
          </button>

          <button
            onClick={() => setIsEssayModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
          >
            Понятно, закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
