import { UserProfile, ScoredRecommendation, RoadmapTask } from '../types';

/**
 * Генерация персональной дорожной карты поступления
 */
export function generatePersonalRoadmap(
  profile: UserProfile,
  recommendations: ScoredRecommendation[]
): RoadmapTask[] {
  const topUni = recommendations[0]?.university;
  const targetYear = profile.targetYear;
  const currentYear = targetYear - 1; // Например, 2025 для поступления в 2026

  const tasks: RoadmapTask[] = [];

  // =====================
  // Q1: АКАДЕМИЧЕСКИЙ БУСТ И ТЕСТЫ (Осень)
  // =====================
  const q1Title = `Q1 (Сентябрь — Ноябрь ${currentYear}): Экзамены и академический профиль`;

  // Экзамен IELTS
  if (!profile.ielts || profile.ielts < 6.5) {
    tasks.push({
      id: 'task-ielts-reg',
      quarter: 'Q1',
      quarterTitle: q1Title,
      title: 'Записаться и сдать экзамен IELTS / TOEFL',
      description: `Для большинства целевых программ (включая ${topUni ? topUni.name : 'вузы'}) необходим сертификат от 6.5. Сдайте пробный mock-test и забронируйте дату сдачи.`,
      category: 'exams',
      dueDate: `${currentYear}-10-25`,
      dueLabel: `до 25 октября ${currentYear}`,
      priority: 'critical',
      isCompleted: false,
      actionGuide: 'Пройдите бесплатный диагностический тест на CambridgeEnglish или British Council, выявите слабые секции (Writing/Speaking).'
    });
  }

  // SAT Digital (если рассматриваются зарубежные вузы или NU)
  const needsSat = profile.targetCountries.some(c => ['usa', 'asia_korea', 'kz'].includes(c));
  if (needsSat && (!profile.sat || profile.sat < 1350)) {
    tasks.push({
      id: 'task-sat-prep',
      quarter: 'Q1',
      quarterTitle: q1Title,
      title: 'Сдать SAT Digital на 1350+ баллов',
      description: 'Регистрация на осенний раунд CollegeBoard (октябрь/декабрь). Необходим для закрытия требований NU, KAIST или американских программ.',
      category: 'exams',
      dueDate: `${currentYear}-11-05`,
      dueLabel: `до 5 ноября ${currentYear}`,
      priority: 'important',
      isCompleted: false,
      actionGuide: 'Установите приложение Bluebook, прорешайте официальные тесты 1-4, сфокусируйтесь на секции Math (проще набрать 750+).'
    });
  }

  // Внеучебная деятельность
  tasks.push({
    id: 'task-activities-cv',
    quarter: 'Q1',
    quarterTitle: q1Title,
    title: 'Упаковать внеучебные достижения в академическое CV',
    description: 'Оформить олимпиады, хакатоны, волонтерство и технические проекты в формате European CV / Common App Activities List (не более 10 активностей с глаголами действия).',
    category: 'activities',
    dueDate: `${currentYear}-11-20`,
    dueLabel: `до 20 ноября ${currentYear}`,
    priority: 'recommended',
    isCompleted: false,
    actionGuide: 'Используйте формулу: «Достиг X, измеряемого Y, сделав Z». Избегайте общих фраз, укажите точные метрики.'
  });

  // =====================
  // Q2: ДОКУМЕНТЫ И МОТИВАЦИОННЫЕ ПИСЬМА (Зима)
  // =====================
  const q2Title = `Q2 (Декабрь — Февраль): Пакет документов и эссе`;

  tasks.push({
    id: 'task-transcript-request',
    quarter: 'Q2',
    quarterTitle: q2Title,
    title: 'Запросить официальный транскрипт с оценками за 9-11 классы',
    description: 'Получить табель успеваемости в школе с печатью директора, перевести на английский язык у нотариуса или в бюро переводов.',
    category: 'documents',
    dueDate: `${currentYear}-12-15`,
    dueLabel: `до 15 декабря ${currentYear}`,
    priority: 'critical',
    isCompleted: false,
    actionGuide: 'Убедитесь, что все предметы переведены корректно и средний балл (GPA) подтвержден подписью завуча.'
  });

  tasks.push({
    id: 'task-sop-draft',
    quarter: 'Q2',
    quarterTitle: q2Title,
    title: 'Написать мотивационное письмо (Personal Statement / SOP)',
    description: `Подготовить цельное эссе (500-650 слов): почему именно ${topUni ? topUni.programName : 'выбранная специальность'}, какую проблему хотите решить и почему вам подходит программа.`,
    category: 'documents',
    dueDate: `${targetYear}-01-10`,
    dueLabel: `до 10 января ${targetYear}`,
    priority: 'critical',
    isCompleted: false,
    actionGuide: 'Воспользуйтесь встроенным в наш сервис AI-советником по эссе для проверки структуры и ключевых смысловых триггеров.'
  });

  tasks.push({
    id: 'task-rec-letters',
    quarter: 'Q2',
    quarterTitle: q2Title,
    title: 'Получить 2 рекомендательных письма от преподавателей',
    description: 'Обратиться к учителям математики, информатики или английского. Подготовить для них "brag sheet" — краткий список ваших успехов на их уроках.',
    category: 'documents',
    dueDate: `${targetYear}-01-20`,
    dueLabel: `до 20 января ${targetYear}`,
    priority: 'important',
    isCompleted: false,
    actionGuide: 'Письмо должно быть на официальном бланке школы с корпоративной почтой учителя и контактным телефоном.'
  });

  // Ранний дедлайн (Early rounds / KAIST / NU)
  if (topUni) {
    tasks.push({
      id: 'task-early-submission',
      quarter: 'Q2',
      quarterTitle: q2Title,
      title: `Подача заявки в ${topUni.name}`,
      description: `Финальная загрузка анкеты на портале вуза (${topUni.officialSourceUrl}) до официального дедлайна.`,
      category: 'documents',
      dueDate: topUni.applicationDeadline,
      dueLabel: topUni.deadlineLabel,
      priority: 'critical',
      isCompleted: false,
      relatedUniversityId: topUni.id,
      actionGuide: 'Проверьте оплату регистрационного взноса (application fee waiver при наличии) и корректность PDF файлов.'
    });
  }

  // =====================
  // Q3: СТИПЕНДИИ И ПОДАЧА ВУЗОВ КЗ/ЕС (Весна)
  // =====================
  const q3Title = `Q3 (Март — Май ${targetYear}): Финансирование и основные дедлайны`;

  if (profile.targetCountries.includes('kz')) {
    tasks.push({
      id: 'task-ent-registration',
      quarter: 'Q3',
      quarterTitle: q3Title,
      title: 'Сдать грантовое ЕНТ (Основной весенний/летний поток)',
      description: 'Целевой порог для IT-специальностей и сильных вузов (AITU, КБТУ, КазНУ) — от 105–115+ баллов.',
      category: 'exams',
      dueDate: `${targetYear}-05-25`,
      dueLabel: `до 25 мая ${targetYear}`,
      priority: 'critical',
      isCompleted: false,
      actionGuide: 'Сфокусируйтесь на контекстных заданиях по математике и информатике. Регулярно проходите платные симуляторы НЦТ.'
    });
  }

  if (profile.targetCountries.includes('eu_italy')) {
    tasks.push({
      id: 'task-italy-dsu-prep',
      quarter: 'Q3',
      quarterTitle: q3Title,
      title: 'Подготовка пакета документов на стипендию DSU (Италия)',
      description: 'Сбор справок о доходах семьи за предшествующий год, апостилирование свидетельств и оформление ISEE Parificato для 100% покрытия расходов.',
      category: 'finance',
      dueDate: `${targetYear}-05-15`,
      dueLabel: `до 15 мая ${targetYear}`,
      priority: 'important',
      isCompleted: false,
      actionGuide: 'Апостиль на справки ставится в ЦОНе/Минюсте заранее, так как процесс занимает от 2 до 4 недель.'
    });
  }

  // =====================
  // Q4: ОФФЕРЫ, ВИЗЫ И ФИНАЛЬНЫЙ СТАРТ (Лето)
  // =====================
  const q4Title = `Q4 (Июнь — Август ${targetYear}): Зачисление, грант и виза`;

  if (profile.targetCountries.includes('kz')) {
    tasks.push({
      id: 'task-kz-grant-contest',
      quarter: 'Q4',
      quarterTitle: q4Title,
      title: 'Подача документов на конкурс государственного гранта РК',
      description: 'Электронная подача через портал Egov/e-University с выбором 4 комбинаций образовательных программ.',
      category: 'finance',
      dueDate: `${targetYear}-07-18`,
      dueLabel: `13–20 июля ${targetYear}`,
      priority: 'critical',
      isCompleted: false,
      actionGuide: 'Распределите 4 программы грамотно: 1-я — приоритетная мечта, 2-3 — уверенные, 4-я — 100% надежный гарант.'
    });
  }

  tasks.push({
    id: 'task-visa-housing',
    quarter: 'Q4',
    quarterTitle: q4Title,
    title: 'Оформление студенческой визы и бронь общежития',
    description: 'После получения официального Letter of Acceptance: подача на студенческую визу в консульство, подтверждение финобеспечения, медицинская страховка.',
    category: 'documents',
    dueDate: `${targetYear}-08-10`,
    dueLabel: `до 10 августа ${targetYear}`,
    priority: 'critical',
    isCompleted: false,
    actionGuide: 'Запишитесь в посольство сразу при получении оффера — летом открывается пиковый сезон очередей.'
  });

  return tasks;
}

/**
 * Определение текущего приоритетного следующего действия (Stage 7)
 */
export function getImmediateNextAction(tasks: RoadmapTask[]): RoadmapTask | null {
  // Ищем первую невыполненную задачу с критическим приоритетом, затем с важным
  const uncompleted = tasks.filter(t => !t.isCompleted);
  if (uncompleted.length === 0) return null;

  const critical = uncompleted.find(t => t.priority === 'critical');
  if (critical) return critical;

  const important = uncompleted.find(t => t.priority === 'important');
  if (important) return important;

  return uncompleted[0];
}
