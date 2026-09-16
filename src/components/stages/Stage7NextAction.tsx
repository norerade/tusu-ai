import React from 'react';
import { useApp } from '../../context/AppContext';
import { getImmediateNextAction } from '../../utils/roadmapGenerator';
import {
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Flame,
  Award,
  Clock,
  Compass,
  Download,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Stage7NextAction: React.FC = () => {
  const {
    roadmapTasks,
    toggleTaskCompletion,
    setCurrentStage,
    setIsCalendarModalOpen,
    setIsEssayModalOpen,
    progressPercentage,
    profile
  } = useApp();

  const nextAction = getImmediateNextAction(roadmapTasks);
  const completedTasks = roadmapTasks.filter(t => t.isCompleted);
  const upcomingTasks = roadmapTasks.filter(t => !t.isCompleted && t.id !== nextAction?.id);

  const handleCompleteCurrent = () => {
    if (!nextAction) return;

    // Trigger rich celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    toggleTaskCompletion(nextAction.id);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-1.5 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Этап 7 из 7</span> • <span>Фокус-действие</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Что делать <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">прямо сейчас</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Не распыляйтесь на 10 задач одновременно. Сконцентрируйтесь на одном ключевом действии с наивысшим приоритетом.
        </p>
      </div>

      {nextAction ? (
        /* Spotlight Card: The #1 Immediate Next Action */
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/10 space-y-6">
          {/* Top highlight bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30 animate-pulse">
              <Flame className="w-4 h-4 text-cyan-400" />
              <span>ФОКУС №1 В ВАШЕМ МАРШРУТЕ</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Дедлайн: <strong className="text-white">{nextAction.dueLabel}</strong></span>
            </div>
          </div>

          {/* Action Title and Description */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {nextAction.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {nextAction.description}
            </p>
          </div>

          {/* Tactical Advice & Guide */}
          {nextAction.actionGuide && (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Тактический план выполнения:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {nextAction.actionGuide}
              </p>
            </div>
          )}

          {/* Big Interactive "Mark as Done" CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleCompleteCurrent}
              className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>Отметить выполненным ✓</span>
            </button>

            <button
              onClick={() => setIsCalendarModalOpen(true)}
              className="w-full sm:w-auto py-4 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>В календарь</span>
            </button>
          </div>
        </div>
      ) : (
        /* All Tasks Completed State */
        <div className="p-10 rounded-3xl bg-slate-900/60 border border-emerald-500/30 text-center space-y-4 shadow-2xl">
          <PartyPopper className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
          <h2 className="text-2xl font-bold text-white">Поздравляем! Все этапы маршрута закрыты!</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Вы успешно подготовили профиль, сдали все тесты и подали документы. Теперь проверяйте почту и ждите официальных писем о зачислении!
          </p>
          <button
            onClick={() => setCurrentStage(6)}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700"
          >
            Посмотреть общий список задач
          </button>
        </div>
      )}

      {/* Progress & Upcoming Tasks Preview */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Next in Queue */}
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Что будет дальше (в очереди)</span>
            <span>{upcomingTasks.length} задач</span>
          </div>

          <div className="space-y-2.5">
            {upcomingTasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-200 truncate">{task.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{task.dueLabel}</span>
                  </div>
                </div>
              </div>
            ))}
            {upcomingTasks.length === 0 && (
              <div className="text-xs text-slate-400 py-3 text-center">Очередь задач пуста</div>
            )}
          </div>
        </div>

        {/* Completed History */}
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Уже выполнено</span>
            <span className="text-emerald-400 font-bold">{completedTasks.length} шагов</span>
          </div>

          <div className="space-y-2.5">
            {completedTasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5 opacity-75"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-300 line-through truncate">{task.title}</div>
                  <div className="text-[10px] text-emerald-400/80 mt-0.5">Готово</div>
                </div>
              </div>
            ))}
            {completedTasks.length === 0 && (
              <div className="text-xs text-slate-400 py-3 text-center">Выполненных шагов пока нет</div>
            )}
          </div>
        </div>
      </div>

      {/* Useful Tools Quick Access */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/30 to-slate-900 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Нужна помощь с мотивационным письмом?</span>
          </div>
          <p className="text-xs text-slate-400">
            Используйте нашего AI-советника по эссе, чтобы составить сильную структуру для выбранного вуза.
          </p>
        </div>

        <button
          onClick={() => setIsEssayModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer transition-colors shrink-0"
        >
          Открыть советник по эссе
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentStage(6)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к роадмапу</span>
        </button>

        <button
          onClick={() => setCurrentStage(1)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>На главную страницу</span>
        </button>
      </div>
    </div>
  );
};
