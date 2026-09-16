import React from 'react';
import { useApp } from '../../context/AppContext';
import { exportTasksToICalendar } from '../../utils/icsExport';
import {
  X,
  Calendar,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const CalendarExportModal: React.FC = () => {
  const {
    isCalendarModalOpen,
    setIsCalendarModalOpen,
    roadmapTasks,
    profile
  } = useApp();

  if (!isCalendarModalOpen) return null;

  const handleDownload = () => {
    exportTasksToICalendar(roadmapTasks, profile.name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Календарь дедлайнов поступления</h3>
              <p className="text-xs text-slate-400">
                Экспорт персональных сроков в Google Calendar, Apple iCal или Outlook
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCalendarModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Action Button */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-cyan-950/20 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Все {roadmapTasks.length} дедлайнов в одном файле</span>
              </div>
              <p className="text-xs text-slate-400">
                События с напоминаниями за 3 дня до дедлайна.
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Скачать .ICS файл</span>
            </button>
          </div>

          {/* How to import guide */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-indigo-400" />
              <span>Инструкция по добавлению (10 секунд):</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-300">iPhone / Mac / iPad:</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Нажмите на скачанный файл <code className="text-cyan-400">.ics</code> — календарь Apple откроется автоматически и предложит нажать «Добавить все события».
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-300">Google Calendar / Android:</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Откройте Настройки Google Календаря → «Импорт и экспорт» → Выберите скачанный файл и нажмите «Импортировать».
                </p>
              </div>
            </div>
          </div>

          {/* Deadlines List Preview */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ключевые события в вашем календаре ({roadmapTasks.length}):
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {roadmapTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium text-slate-200 truncate">{t.title}</span>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-300 shrink-0 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {t.dueLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={() => setIsCalendarModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
