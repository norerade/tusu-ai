import React from 'react';
import { useApp, StageNumber } from '../../context/AppContext';
import {
  Sparkles,
  UserCheck,
  Activity,
  Compass,
  GitCompare,
  Milestone,
  CheckCircle2
} from 'lucide-react';

interface StepInfo {
  number: StageNumber;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const STEPS: StepInfo[] = [
  { number: 1, title: 'Вход', subtitle: 'О сервисе', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { number: 2, title: 'Профиль', subtitle: 'Анкета', icon: <UserCheck className="w-3.5 h-3.5" /> },
  { number: 3, title: 'Диагностика', subtitle: 'Анализ сил', icon: <Activity className="w-3.5 h-3.5" /> },
  { number: 4, title: 'Рекомендации', subtitle: 'Подбор вузов', icon: <Compass className="w-3.5 h-3.5" /> },
  { number: 5, title: 'Сравнение', subtitle: 'Матрица выбора', icon: <GitCompare className="w-3.5 h-3.5" /> },
  { number: 6, title: 'Roadmap', subtitle: 'План поступления', icon: <Milestone className="w-3.5 h-3.5" /> },
  { number: 7, title: 'Следующий шаг', subtitle: 'Фокус-действие', icon: <CheckCircle2 className="w-3.5 h-3.5" /> }
];

export const Stepper: React.FC = () => {
  const { currentStage, setCurrentStage } = useApp();

  return (
    <div className="w-full bg-slate-900/60 border-b border-slate-800/80 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile View: Current Step Badge + Progress Bar */}
        <div className="sm:hidden flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Этап {currentStage} из 7
            </span>
            <span className="text-xs font-bold text-cyan-400">
              {STEPS[currentStage - 1].title}: {STEPS[currentStage - 1].subtitle}
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-300 rounded-full"
              style={{ width: `${(currentStage / 7) * 100}%` }}
            />
          </div>
          {/* Quick jump pill scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
            {STEPS.map((step) => (
              <button
                key={step.number}
                onClick={() => setCurrentStage(step.number)}
                className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap font-medium transition-all shrink-0 ${
                  currentStage === step.number
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : currentStage > step.number
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800/50 text-slate-400'
                }`}
              >
                {step.number}. {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop View: Full Interactive Stepper */}
        <nav aria-label="Progress" className="hidden sm:block">
          <ol className="flex items-center justify-between w-full">
            {STEPS.map((step, idx) => {
              const isCurrent = currentStage === step.number;
              const isPast = currentStage > step.number;

              return (
                <li key={step.number} className="flex-1 relative">
                  <button
                    onClick={() => setCurrentStage(step.number)}
                    className="w-full text-left flex items-center group focus:outline-none"
                  >
                    {/* Connecting Line */}
                    {idx !== 0 && (
                      <div
                        className={`absolute left-0 top-4 -translate-y-1/2 w-full h-0.5 -z-10 transition-colors duration-300 ${
                          isPast ? 'bg-emerald-500/60' : 'bg-slate-800'
                        }`}
                        style={{ width: 'calc(100% - 2rem)', left: '-50%' }}
                      />
                    )}

                    <div className="flex flex-col items-center mx-auto text-center">
                      {/* Step Circle */}
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isCurrent
                            ? 'bg-gradient-to-tr from-cyan-500 to-indigo-500 text-slate-950 shadow-md shadow-cyan-500/30 ring-2 ring-cyan-400/50 scale-110'
                            : isPast
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 group-hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700/60 group-hover:border-slate-600'
                        }`}
                      >
                        {isPast ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : step.icon}
                      </div>

                      {/* Step Labels */}
                      <span
                        className={`mt-1.5 text-xs font-semibold tracking-tight transition-colors ${
                          isCurrent
                            ? 'text-cyan-300'
                            : isPast
                            ? 'text-slate-200'
                            : 'text-slate-400 group-hover:text-slate-300'
                        }`}
                      >
                        {step.title}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden md:block">
                        {step.subtitle}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
