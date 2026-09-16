import React from 'react';
import { useApp } from '../../context/AppContext';
import { StudyField, TargetCountry, BudgetTier, EducationLevel, UserProfile } from '../../types';
import {
  User,
  GraduationCap,
  BookOpen,
  DollarSign,
  Globe2,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';

const STUDY_FIELDS: { id: StudyField; label: string; icon: string }[] = [
  { id: 'cs_it', label: 'Computer Science & ИИ', icon: '💻' },
  { id: 'engineering', label: 'Инженерия и робототехника', icon: '⚙️' },
  { id: 'business_econ', label: 'Бизнес, финансы и стартапы', icon: '📈' },
  { id: 'medicine_bio', label: 'Биомедицина и биотехнологии', icon: '🧬' },
  { id: 'design_media', label: 'UI/UX дизайн и медиа', icon: '🎨' },
  { id: 'humanities_law', label: 'Международные отношения и право', icon: '⚖️' },
];

const TARGET_COUNTRIES: { id: TargetCountry; label: string; flag: string; desc: string }[] = [
  { id: 'kz', label: 'Казахстан', flag: '🇰🇿', desc: 'Гранты МОН РК, NU, Astana IT, КБТУ' },
  { id: 'eu_germany', label: 'Германия', flag: '🇩🇪', desc: 'TUM, бесплатные программы, DAAD' },
  { id: 'eu_italy', label: 'Италия', flag: '🇮🇹', desc: 'Polimi, Sapienza, стипендия DSU до €7.5k' },
  { id: 'asia_korea', label: 'Южная Корея', flag: '🇰🇷', desc: 'KAIST, UNIST, 100% стипендии' },
  { id: 'usa', label: 'США', flag: '🇺🇸', desc: 'Georgia Tech, Minerva, Need-based aid' },
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
      {/* Title & Context */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
          <span>Этап 2 из 7</span> • <span>Анкета абитуриента</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Настройте ваш образовательный профиль
        </h1>
        <p className="text-sm text-slate-400">
          Изменение любого параметра мгновенно пересчитывает рекомендации и дедлайны дорожной карты.
        </p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 backdrop-blur-sm shadow-xl">
        {/* Section 1: Базовая информация */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>1. Текущий статус и сроки</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Имя абитуриента
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                placeholder="Например, Алихан"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Текущий класс / Статус
              </label>
              <select
                value={profile.level}
                onChange={(e) => updateProfile({ level: e.target.value as EducationLevel })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
              >
                <option value="grade_9">9 класс (ранняя подготовка)</option>
                <option value="grade_10">10 класс (активный трек)</option>
                <option value="grade_11">11 класс (выпускной год 2026)</option>
                <option value="graduate">Выпускник школы</option>
                <option value="gap_year">Gap Year (повторное поступление)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Год начала учебы в вузе
              </label>
              <select
                value={profile.targetYear}
                onChange={(e) => updateProfile({ targetYear: parseInt(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
              >
                <option value={2026}>Осень 2026 (Основной цикл)</option>
                <option value={2027}>Осень 2027</option>
                <option value={2028}>Осень 2028</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Направления обучения */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>2. Интересы и направления учебы</span>
            </div>
            <span className="text-[11px] text-slate-400">Можно выбрать несколько</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {STUDY_FIELDS.map((field) => {
              const isSelected = profile.fields.includes(field.id);
              return (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => handleFieldToggle(field.id)}
                  className={`p-3 rounded-xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <span className="text-xl">{field.icon}</span>
                  <span className="text-xs font-semibold">{field.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Академические показатели и экзамены */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>3. Оценки и сертификаты экзаменов</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* GPA */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Средний балл (GPA)</span>
                <span className="text-xs font-bold text-emerald-400">{profile.gpa.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="5.0"
                step="0.05"
                value={profile.gpa}
                onChange={(e) => updateProfile({ gpa: parseFloat(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>3.0 (Удовл.)</span>
                <span>4.0 (Хор.)</span>
                <span>5.0 (Отл.)</span>
              </div>
            </div>

            {/* IELTS */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">IELTS / Английский</span>
                <span className="text-xs font-bold text-cyan-400">
                  {profile.ielts ? profile.ielts.toFixed(1) : 'Не сдан'}
                </span>
              </div>
              <select
                value={profile.ielts || ''}
                onChange={(e) =>
                  updateProfile({ ielts: e.target.value ? parseFloat(e.target.value) : null })
                }
                className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              >
                <option value="">Пока не сдавал</option>
                <option value="5.0">5.0 (A2/B1)</option>
                <option value="5.5">5.5 (B2 начальный)</option>
                <option value="6.0">6.0 (B2 уверенный)</option>
                <option value="6.5">6.5 (Стандарт Европы)</option>
                <option value="7.0">7.0 (С1 сильный)</option>
                <option value="7.5">7.5 (Отличный результат)</option>
                <option value="8.0">8.0+ (Near native)</option>
              </select>
            </div>

            {/* SAT */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">SAT Digital</span>
                <span className="text-xs font-bold text-indigo-400">
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
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              />
              <span className="text-[10px] text-slate-400 block">Для США, NU, Кореи</span>
            </div>

            {/* ЕНТ */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">ЕНТ (Казахстан)</span>
                <span className="text-xs font-bold text-amber-400">
                  {profile.ent ? `${profile.ent} / 140` : 'Нет'}
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
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
              />
              <span className="text-[10px] text-slate-400 block">Для грантов МОН РК</span>
            </div>
          </div>

          {/* Олимпиады и внеучебка */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Олимпиадные достижения и награды
              </label>
              <select
                value={profile.olympiadLevel}
                onChange={(e) =>
                  updateProfile({
                    olympiadLevel: e.target.value as UserProfile['olympiadLevel']
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
              >
                <option value="none">Нет наград</option>
                <option value="school">Школьный уровень</option>
                <option value="city">Районный / Городской призер</option>
                <option value="republic">Республиканская олимпиада (Дарын, Жаутыков)</option>
                <option value="international">Международные олимпиады (IOI, IMO, IPhO)</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer w-full hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={profile.hasVolunteeringOrProjects}
                  onChange={(e) =>
                    updateProfile({ hasVolunteeringOrProjects: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-cyan-500 accent-cyan-500 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Есть проекты, хакатоны или волонтерство
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Усиливает портфолио для зарубежных стипендий
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Бюджет и Целевые страны */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>4. Финансовые возможности и страны</span>
          </div>

          {/* Бюджет */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Планируемый бюджет на обучение в год:
            </label>
            <div className="grid sm:grid-cols-4 gap-3">
              {[
                { id: 'grant_only', label: '100% Грант / $0', desc: 'Только программы со стипендией или бюджетом' },
                { id: 'low_5k', label: 'До $5,000 / год', desc: 'Доступный контракт (вузы РК, Италия, Германия)' },
                { id: 'mid_15k', label: 'До $15,000 / год', desc: 'Средний бюджет в Европе и Азии' },
                { id: 'high_30k_plus', label: '$30,000+ / год', desc: 'США и топовые коммерческие программы' },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => updateProfile({ budget: b.id as BudgetTier })}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    profile.budget === b.id
                      ? 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-100">{b.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{b.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Страны */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-300">
                Приоритетные страны обучения:
              </label>
              <span className="text-[11px] text-slate-400">Выберите интересующие направления</span>
            </div>
            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {TARGET_COUNTRIES.map((tc) => {
                const isSelected = profile.targetCountries.includes(tc.id);
                return (
                  <button
                    key={tc.id}
                    type="button"
                    onClick={() => handleCountryToggle(tc.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg">{tc.flag}</span>
                      <span className="text-xs font-bold text-slate-200">{tc.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{tc.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 5: Заметки и цели */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Дополнительные пожелания или проекты (необязательно)
          </label>
          <textarea
            value={profile.notes}
            onChange={(e) => updateProfile({ notes: e.target.value })}
            placeholder="Например: хочу заниматься алгоритмическим трейдингом или интересуюсь стипендией DSU в Италии..."
            rows={2}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentStage(1)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к интро</span>
        </button>

        <button
          onClick={() => setCurrentStage(3)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
        >
          <span>Сформировать диагностику (Этап 3)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
