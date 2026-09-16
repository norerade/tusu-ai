import React from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITIES } from '../../data/universities';
import {
  GitCompare,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Award
} from 'lucide-react';

export const Stage5Compare: React.FC = () => {
  const {
    comparedUniIds,
    toggleCompareUni,
    recommendations,
    setCurrentStage,
    profile
  } = useApp();

  // Получаем данные сравниваемых вузов
  const comparedUnis = UNIVERSITIES.filter(u => comparedUniIds.includes(u.id));

  // Если выбрано меньше 2, подсказываем добавить
  const isReady = comparedUnis.length >= 2;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Этап 5 из 7</span> • <span>Матрица сравнения</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Сравнение ключевых вариантов
          </h1>
          <p className="text-sm text-slate-400">
            Сопоставьте требования, стоимость, дедлайны и шансы для взвешенного выбора.
          </p>
        </div>

        {/* Quick University Selector Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400">Добавить в сравнение:</span>
          {UNIVERSITIES.slice(0, 5).map((u) => {
            const isSel = comparedUniIds.includes(u.id);
            return (
              <button
                key={u.id}
                onClick={() => toggleCompareUni(u.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isSel
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {u.name.split(' ')[0]} {isSel ? '✓' : '+'}
              </button>
            );
          })}
        </div>
      </div>

      {!isReady ? (
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
          <HelpCircle className="w-10 h-10 text-cyan-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Выберите минимум 2 университета для сравнения</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Вернитесь на этап рекомендаций или нажмите на чипсы вузов выше, чтобы активировать аналитическую матрицу.
          </p>
          <button
            onClick={() => setCurrentStage(4)}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-colors"
          >
            Выбрать программы в каталоге
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* AI Comparative Verdict Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>AI-вердикт: какой вариант выбрать именно вам</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Исходя из вашего профиля (GPA {profile.gpa.toFixed(2)}, {profile.ielts ? `IELTS ${profile.ielts}` : 'IELTS в процессе'}, бюджет: {profile.budget === 'grant_only' ? '100% грант' : 'семейный'}),{' '}
              <strong className="text-white">{comparedUnis[0]?.name}</strong> выделяется наименьшим финансовым риском и полной стипендиальной поддержкой, в то время как{' '}
              <strong className="text-white">{comparedUnis[1]?.name}</strong> обеспечивает более сильный международный бренд для глобального рынка труда. Рекомендуется подавать документы в оба вуза, распределив их как Target и Dream.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80">
                  <th className="p-4 sm:p-5 text-slate-400 font-semibold w-1/4">Параметр сравнения</th>
                  {comparedUnis.map((uni) => (
                    <th key={uni.id} className="p-4 sm:p-5 text-white font-bold w-1/3 border-l border-slate-800">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="text-base sm:text-lg flex items-center gap-2">
                            <span>{uni.logo}</span>
                            <span>{uni.name}</span>
                          </div>
                          <div className="text-xs font-normal text-cyan-400 mt-0.5">{uni.programName}</div>
                        </div>
                        <button
                          onClick={() => toggleCompareUni(uni.id)}
                          className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          title="Убрать из сравнения"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {/* Страна и город */}
                <tr className="hover:bg-slate-800/20">
                  <td className="p-4 sm:p-5 font-semibold text-slate-400">Локация</td>
                  {comparedUnis.map((uni) => (
                    <td key={uni.id} className="p-4 sm:p-5 border-l border-slate-800">
                      {uni.city}, {uni.countryName}
                    </td>
                  ))}
                </tr>

                {/* Стоимость обучения */}
                <tr className="hover:bg-slate-800/20 bg-slate-950/20">
                  <td className="p-4 sm:p-5 font-semibold text-slate-400">Стоимость в год</td>
                  {comparedUnis.map((uni) => (
                    <td key={uni.id} className="p-4 sm:p-5 border-l border-slate-800 font-bold">
                      {uni.tuitionUsdPerYear === 0 ? (
                        <span className="text-emerald-400 font-bold">$0 (100% Грант)</span>
                      ) : (
                        `$${uni.tuitionUsdPerYear.toLocaleString()} / год`
                      )}
                    </td>
                  ))}
                </tr>

                {/* Доступность стипендий */}
                <tr className="hover:bg-slate-800/20">
                  <td className="p-4 sm:p-5 font-semibold text-slate-400">Стипендия / Грант</td>
                  {comparedUnis.map((uni) => (
                    <td key={uni.id} className="p-4 sm:p-5 border-l border-slate-800">
                      <div className="font-semibold text-white">{uni.scholarshipName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{uni.scholarshipDetails}</div>
                    </td>
                  ))}
                </tr>

                {/* Расходы на жизнь */}
                <tr className="hover:bg-slate-800/20 bg-slate-950/20">
                  <td className="p-4 sm:p-5 font-semibold text-slate-400">Проживание и питание</td>
                  {comparedUnis.map((uni) => (
                    <td key={uni.id} className="p-4 sm:p-5 border-l border-slate-800">
                      ~${uni.livingCostUsdPerYear.toLocaleString()} в год
                    </td>
                  ))}
                </tr>

                {/* Требования по экзаменам */}
                <tr className="hover:bg-slate-800/20">
                  <td className="p-4 sm:p-5 font-semibold text-slate-400">Мин. требования (IELTS / SAT / ЕНТ)</td>
                  {comparedUnis.map((uni) => (
                    <td key={uni.id} className="p-4 sm:p-5 border-l border-slate-800 space-y-1">
                      <div>
                        IELTS: <strong className="text-white">{uni.minIelts}+</strong>
                        {profile.ielts && (
                          <span className={`ml-1 text-[11px] ${profile.ielts >= uni.minIelts ? 'text-emerald-400' : 'text-rose-400'}`}>
                            (у вас {profile.ielts})
                          </span>
                        )}
                      </div>
                      {uni.minSat && (
                        <div>
                          SAT: <strong className="text-white">{uni.minSat}+</strong>
                          {profile.sat && (
                            <span className={`ml-1 text-[11px] ${profile.sat >= uni.minSat ? 'text-emerald-400' : 'text-rose-400'}`}>
                              (у вас {profile.sat})
                            </span>
                          )}
                        </div>
                      )}
                      {uni.minEnt && (
                        <div>
                          ЕНТ: <strong className="text-white">{uni.minEnt}+</strong>
                          {profile.ent && (
                            <span className={`ml-1 text-[11px] ${profile.ent >= uni.minEnt ? 'text-emerald-400' : 'text-rose-400'}`}>
                              (у вас {profile.ent})
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Дедлайн подачи */}
                <tr className="hover:bg-slate-800/20 bg-slate-950/20">
                  <td className="p-4 sm:p-5 font-semibold text-slate-400">Дедлайн подачи заявок</td>
                  {comparedUnis.map((uni) => (
                    <td key={uni.id} className="p-4 sm:p-5 border-l border-slate-800 font-semibold text-indigo-300">
                      {uni.deadlineLabel}
                    </td>
                  ))}
                </tr>

                {/* Мировой рейтинг и престиж */}
                <tr className="hover:bg-slate-800/20">
                  <td className="p-4 sm:p-5 font-semibold text-slate-400">Рейтинг и селективность</td>
                  {comparedUnis.map((uni) => (
                    <td key={uni.id} className="p-4 sm:p-5 border-l border-slate-800">
                      <div>{uni.ranking}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Acceptance rate: {uni.acceptanceRate}</div>
                    </td>
                  ))}
                </tr>

                {/* Карьерные перспективы */}
                <tr className="hover:bg-slate-800/20 bg-slate-950/20">
                  <td className="p-4 sm:p-5 font-semibold text-slate-400">Карьерные перспективы</td>
                  {comparedUnis.map((uni) => (
                    <td key={uni.id} className="p-4 sm:p-5 border-l border-slate-800 text-xs text-slate-300">
                      {uni.careerProspects}
                    </td>
                  ))}
                </tr>

                {/* Ссылка на первоисточник */}
                <tr className="hover:bg-slate-800/20">
                  <td className="p-4 sm:p-5 font-semibold text-slate-400">Официальный источник</td>
                  {comparedUnis.map((uni) => (
                    <td key={uni.id} className="p-4 sm:p-5 border-l border-slate-800">
                      <a
                        href={uni.officialSourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:underline text-xs"
                      >
                        <span>Портал admissions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stage Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentStage(4)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к рекомендациям</span>
        </button>

        <button
          onClick={() => setCurrentStage(6)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
        >
          <span>Перейти к персональному роадмапу (Этап 6)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
