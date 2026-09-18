import React from 'react';
import { useApp } from '../../context/AppContext';
import { StudyField, TargetCountry, BudgetTier, EducationLevel, UserProfile } from '../../types';
import {
  User,
  GraduationCap,
  BookOpen,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';

const STUDY_FIELDS: { id: StudyField; label: string }[] = [
  { id: 'cs_it', label: 'Computer Science & AI' },
  { id: 'engineering', label: 'Инженерия и робототехника' },
  { id: 'business_econ', label: 'Бизнес и аналитика данных' },
  { id: 'medicine_bio', label: 'Биомедицина и биотехнологии' },
  { id: 'design_media', label: 'Дизайн и цифровые медиа' },
  { id: 'humanities_law', label: 'Международные отношения и право' },
];

const TARGET_COUNTRIES: { id: TargetCountry; label: string; flag: string; hint: string }[] = [
  { id: 'kz', label: 'Казахстан', flag: 'KZ', hint: 'NU, AITU, KBTU' }, { id: 'ru_russia', label: 'Россия', flag: 'RU', hint: 'ВШЭ, МФТИ' },
  { id: 'eu_germany', label: 'Германия', flag: 'DE', hint: 'TUM, DAAD' }, { id: 'eu_netherlands', label: 'Нидерланды', flag: 'NL', hint: 'TU Delft' }, { id: 'eu_czechia', label: 'Чехия', flag: 'CZ', hint: 'Charles University' },
  { id: 'eu_poland', label: 'Польша', flag: 'PL', hint: 'Warsaw University' }, { id: 'eu_hungary', label: 'Венгрия', flag: 'HU', hint: 'Stipendium Hungaricum' }, { id: 'eu_austria', label: 'Австрия', flag: 'AT', hint: 'TU Wien' },
  { id: 'usa', label: 'США', flag: 'US', hint: 'Georgia Tech' }, { id: 'canada', label: 'Канада', flag: 'CA', hint: 'University of Toronto' }, { id: 'uk', label: 'Великобритания', flag: 'UK', hint: 'UCL, Imperial' },
  { id: 'uae', label: 'ОАЭ', flag: 'AE', hint: 'NYU Abu Dhabi' }, { id: 'asia_korea', label: 'Южная Корея', flag: 'KR', hint: 'KAIST' }, { id: 'asia_japan', label: 'Япония', flag: 'JP', hint: 'University of Tokyo' },
  { id: 'asia_china', label: 'Китай', flag: 'CN', hint: 'Tsinghua' }, { id: 'asia_malaysia', label: 'Малайзия', flag: 'MY', hint: 'University of Malaya' }, { id: 'turkey', label: 'Турция', flag: 'TR', hint: 'METU' },
  { id: 'eu_italy', label: 'Италия', flag: 'IT', hint: 'Polimi, DSU' }, { id: 'eu_france', label: 'Франция', flag: 'FR', hint: 'PSL, École Polytechnique' }, { id: 'eu_spain', label: 'Испания', flag: 'ES', hint: 'University of Barcelona' },
];

export const Stage2Profile: React.FC = () => {
  const { profile, updateProfile, setCurrentStage } = useApp();

  const handleFieldToggle = (field: StudyField) => {
    const current = profile.fields;
    if (current.includes(field)) {
      if (current.length > 1) {
        updateProfile({ fields: current.filter((f) => f !== field) });
      }
    } else {
      updateProfile({ fields: [...current, field] });
    }
  };

  const handleCountryToggle = (country: TargetCountry) => {
    const current = profile.targetCountries;
    if (current.includes(country)) {
      if (current.length > 1) {
        updateProfile({ targetCountries: current.filter((c) => c !== country) });
      }
    } else {
      updateProfile({ targetCountries: [...current, country] });
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span>02 / АНКЕТА ПРОФИЛЯ</span>
          <span>•</span>
          <span>ДИНАМИЧЕСКИЙ РАСЧЕТ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Параметры абитуриента и академические цели
        </h1>
        <p className="text-sm text-zinc-400">
          Изменение каждого параметра напрямую влияет на матрицу соответствия и пошаговый роадмап.
        </p>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/90 rounded-2xl p-6 sm:p-8 space-y-8 backdrop-blur-sm">
        {/* Section 1: Базовые данные */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 border-b border-zinc-800 pb-2">
            <User className="w-3.5 h-3.5 text-zinc-400" />
            <span>01. Текущий статус и сроки</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Имя абитуриента
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                placeholder="Имя"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-zinc-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Текущий класс / Статус
              </label>
              <select
                value={profile.level}
                onChange={(e) => updateProfile({ level: e.target.value as EducationLevel })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-zinc-500 focus:outline-none transition-colors"
              >
                <option value="grade_9">9 класс (ранняя подготовка)</option>
                <option value="grade_10">10 класс (активный трек)</option>
                <option value="grade_11">11 класс (выпуск 2026)</option>
                <option value="graduate">Выпускник школы</option>
                <option value="gap_year">Gap Year (повторное поступление)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Год начала учебы в вузе
              </label>
              <select
                value={profile.targetYear}
                onChange={(e) => updateProfile({ targetYear: parseInt(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:border-zinc-500 focus:outline-none transition-colors"
              >
                <option value={2026}>Осень 2026 (Основной цикл)</option>
                <option value={2027}>Осень 2027</option>
                <option value={2028}>Осень 2028</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Направления */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
              <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
              <span>02. Приоритетные специальности</span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">Мультивыбор</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {STUDY_FIELDS.map((field) => {
              const isSelected = profile.fields.includes(field.id);
              return (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => handleFieldToggle(field.id)}
                  className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800/90 border-zinc-500 text-white shadow-sm'
                      : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <span className="text-xs font-medium">{field.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Экзамены и академические баллы */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 border-b border-zinc-800 pb-2">
            <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
            <span>03. Академическая успеваемость и экзамены</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* GPA */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-medium">Средний балл (GPA)</span>
                <span className="text-xs font-mono font-bold text-zinc-100">{profile.gpa.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={profile.gpa}
                onChange={(e) => updateProfile({ gpa: parseFloat(e.target.value) })}
                className="w-full accent-zinc-200 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>3.0</span>
                <span>4.0</span>
                <span>5.0</span>
              </div>
            </div>

            {/* IELTS */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-medium">IELTS</span>
                <span className="text-xs font-mono font-bold text-zinc-100">
                  {profile.ielts ? profile.ielts.toFixed(1) : 'Не сдан'}
                </span>
              </div>
              <select
                value={profile.ielts || ''}
                onChange={(e) =>
                  updateProfile({ ielts: e.target.value ? parseFloat(e.target.value) : null })
                }
                className="w-full px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs"
              >
                <option value="">Пока не сдавал</option>
                <option value="5.5">5.5 (B2 начальный)</option>
                <option value="6.0">6.0 (B2 уверенный)</option>
                <option value="6.5">6.5 (Стандарт Европы)</option>
                <option value="7.0">7.0 (С1 сильный)</option>
                <option value="7.5">7.5 (Отличный балл)</option>
                <option value="8.0">8.0+ (Near native)</option>
              </select>
            </div>

            {/* SAT */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-medium">SAT Digital</span>
                <span className="text-xs font-mono font-bold text-zinc-100">
                  {profile.sat ? profile.sat : 'Нет'}
                </span>
              </div>
              <input
                type="number"
                min="800"
                max="1600"
                step="10"
                value={profile.sat || ''}
                onChange={(e) =>
                  updateProfile({ sat: e.target.value ? parseInt(e.target.value) : null })
                }
                placeholder="Напр. 1350"
                className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs"
              />
            </div>

            {/* ЕНТ */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-medium">ЕНТ (РК)</span>
                <span className="text-xs font-mono font-bold text-zinc-100">
                  {profile.ent ? `${profile.ent}/140` : 'Нет'}
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="140"
                value={profile.ent || ''}
                onChange={(e) =>
                  updateProfile({ ent: e.target.value ? parseInt(e.target.value) : null })
                }
                placeholder="Напр. 115"
                className="w-full px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs"
              />
            </div>
          </div>

          {/* Олимпиады & Портфолио */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {([['toefl','TOEFL'],['nuet','NUET'],['gre','GRE'],['gmat','GMAT'],['a_level','A-Level'],['ib','IB']] as const).map(([key,label]) => (
              <label key={key} className="text-xs text-zinc-300">{label}
                <input type="number" value={profile.examScores?.[key] || ''} onChange={e => updateProfile({ examScores: { ...profile.examScores, [key]: e.target.value ? Number(e.target.value) : undefined } })} placeholder="Балл" className="mt-1 w-full px-2.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white" />
              </label>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Олимпиадный уровень
              </label>
              <select
                value={profile.olympiadLevel}
                onChange={(e) =>
                  updateProfile({
                    olympiadLevel: e.target.value as UserProfile['olympiadLevel']
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs"
              >
                <option value="none">Нет наград</option>
                <option value="school">Школьный уровень</option>
                <option value="city">Городской / Районный призер</option>
                <option value="republic">Республиканская олимпиада (Дарын, Жаутыков)</option>
                <option value="international">Международные олимпиады (IOI, IMO, IPhO)</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 cursor-pointer w-full hover:border-zinc-700 transition-colors">
                <input
                  type="checkbox"
                  checked={profile.hasVolunteeringOrProjects}
                  onChange={(e) =>
                    updateProfile({ hasVolunteeringOrProjects: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-zinc-200 accent-zinc-200 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-medium text-zinc-200">
                    Есть пет-проекты, хакатоны или волонтерство
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Усиливает holistic admissions при конкурсе стипендий
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Бюджет и Страны */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 border-b border-zinc-800 pb-2">
            <DollarSign className="w-3.5 h-3.5 text-zinc-400" />
            <span>04. Финансовые рамки и география</span>
          </div>

          {/* Бюджет */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-300">
              Комфортный бюджет на обучение в год:
            </label>
            <div className="grid sm:grid-cols-4 gap-2.5">
              {[
                { id: 'grant_only', label: '100% Грант / $0', desc: 'Только программы со стипендией или бюджетом' },
                { id: 'low_5k', label: 'До $5,000 / год', desc: 'Доступный контракт (вузы РК, Италия, Германия)' },
                { id: 'mid_15k', label: 'До $15,000 / год', desc: 'Средний бюджет в Европе и Азии' },
                { id: 'high_30k_plus', label: '$30,000+ / год', desc: 'США и топовые международные программы' },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => updateProfile({ budget: b.id as BudgetTier })}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    profile.budget === b.id
                      ? 'bg-zinc-800/90 border-zinc-400 text-white shadow-sm'
                      : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="text-xs font-semibold text-zinc-200">{b.label}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{b.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Страны */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-medium text-zinc-300">
              Приоритетные страны:
            </label>
            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {TARGET_COUNTRIES.map((tc) => {
                const isSelected = profile.targetCountries.includes(tc.id);
                return (
                  <button
                    key={tc.id}
                    type="button"
                    onClick={() => handleCountryToggle(tc.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-800/90 border-zinc-400 text-white shadow-sm'
                        : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-zinc-400 font-bold">{tc.flag}</span>
                      {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <div className="text-xs font-semibold text-zinc-200 mt-1">{tc.label}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{tc.hint}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentStage(1)}
          className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-800 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </button>

        <button
          onClick={() => setCurrentStage(3)}
          className="px-6 py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
        >
          <span>Перейти к диагностике (Этап 3)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
