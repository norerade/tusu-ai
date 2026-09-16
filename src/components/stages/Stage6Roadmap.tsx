import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoadmapTask } from '../../types';
import {
  Milestone,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Download,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Stage6Roadmap: React.FC = () => {
  const {
    roadmapTasks,
    toggleTaskCompletion,
    setCurrentStage,
    setIsCalendarModalOpen,
    progressPercentage
  } = useApp();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | RoadmapTask['category']>('all');

  const filteredTasks = activeCategoryFilter === 'all'
    ? roadmapTasks
    : roadmapTasks.filter(t => t.category === activeCategoryFilter);

  // Группировка по четвертям
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'] as const;

  const handleToggle = (taskId: string, currentStatus: boolean) => {
    toggleTaskCompletion(taskId);
    if (!currentStatus) {
      // Праздничный конфетти при отметке выполнения
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const getCategoryIcon = (category: RoadmapTask['category']) => {
    switch (category) {
      case 'exams':
        return <Clock className="w-3.5 h-3.5 text-cyan-400" />;
      case 'documents':
        return <FileText className="w-3.5 h-3.5 text-indigo-400" />;
      case 'finance':
        return <DollarSign className="w-3.5 h-3.5 text-emerald-400" />;
      case 'activities':
        return <Trophy className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  const getPriorityBadge = (priority: RoadmapTask['priority']) => {
    switch (priority) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            Критический
          </span>
        );
      case 'important':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Важный
          </span>
        );
      case 'recommended':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400">
            Рекомендованный
          </span>
        );
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Milestone className="w-3.5 h-3.5" />
            <span>Этап 6 из 7</span> • <span>Персональный Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Пошаговый маршрут поступления
          </h1>
          <p className="text-sm text-slate-400">
            Интерактивный план подготовки: экзамены, пакет документов, дедлайны стипендий и визы.
          </p>
        </div>

        {/* Calendar Export CTA */}
        <button
          onClick={() => setIsCalendarModalOpen(true)}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>Экспорт дедлайнов в календарь (.ics)</span>
        </button>
      </div>

      {/* Progress Bar Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-200">Общий прогресс маршрута:</span>
            <span className="text-sm font-extrabold text-emerald-400">{progressPercentage}%</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Выполнено {roadmapTasks.filter(t => t.isCompleted).length} из {roadmapTasks.length} ключевых этапов
          </p>
        </div>

        <div className="w-full sm:w-64 bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
        <span className="text-xs text-slate-400 mr-2">Фильтр:</span>
        <button
          onClick={() => setActiveCategoryFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeCategoryFilter === 'all'
              ? 'bg-slate-800 text-white border border-slate-700 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Все ({roadmapTasks.length})
        </button>
        <button
          onClick={() => setActiveCategoryFilter('exams')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeCategoryFilter === 'exams'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          Экзамены
        </button>
        <button
          onClick={() => setActiveCategoryFilter('documents')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeCategoryFilter === 'documents'
              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
              : 'text-slate-400 hover:text-indigo-300'
          }`}
        >
          Документы и эссе
        </button>
        <button
          onClick={() => setActiveCategoryFilter('finance')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeCategoryFilter === 'finance'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
              : 'text-slate-400 hover:text-emerald-300'
          }`}
        >
          Гранты и стипендии
        </button>
        <button
          onClick={() => setActiveCategoryFilter('activities')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeCategoryFilter === 'activities'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
              : 'text-slate-400 hover:text-amber-300'
          }`}
        >
          Внеучебка / CV
        </button>
      </div>

      {/* Quarters Timeline */}
      <div className="space-y-8">
        {quarters.map((q) => {
          const qTasks = filteredTasks.filter(t => t.quarter === q);
          if (qTasks.length === 0) return null;

          return (
            <div key={q} className="space-y-4">
              {/* Quarter Header */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-extrabold text-xs flex items-center justify-center">
                  {q}
                </div>
                <h3 className="font-bold text-white text-base">
                  {qTasks[0]?.quarterTitle}
                </h3>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-slate-800 ml-4">
                {qTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleToggle(task.id, task.isCompleted)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group ${
                      task.isCompleted
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-65'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Interactive Checkbox */}
                      <button
                        type="button"
                        className="mt-0.5 shrink-0 focus:outline-none"
                      >
                        {task.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        )}
                      </button>

                      {/* Content */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-bold ${
                                task.isCompleted
                                  ? 'line-through text-slate-400'
                                  : 'text-white group-hover:text-cyan-300 transition-colors'
                              }`}
                            >
                              {task.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {getPriorityBadge(task.priority)}
                            <div className="flex items-center gap-1 text-xs font-semibold text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
                              <Calendar className="w-3 h-3 text-cyan-400" />
                              <span>{task.dueLabel}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {task.description}
                        </p>

                        {/* Action guide / Tip */}
                        {task.actionGuide && (
                          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-cyan-200/80 flex items-start gap-2">
                            <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] shrink-0">
                              💡 Лайфхак:
                            </span>
                            <span>{task.actionGuide}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentStage(5)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к сравнению</span>
        </button>

        <button
          onClick={() => setCurrentStage(7)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
        >
          <span>Ключевое следующее действие (Этап 7)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
