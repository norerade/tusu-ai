import { UserProfile, UniversityProgram, ScoredRecommendation, DiagnosticReport, RecommendationTier } from '../types';
import { UNIVERSITIES } from '../data/universities';

/**
 * Нормализация GPA к 5-балльной шкале для сопоставления
 */
export function normalizeGpa(gpa: number, scale: '4.0' | '5.0'): number {
  if (scale === '4.0') {
    return Math.min(5.0, (gpa / 4.0) * 5.0);
  }
  return gpa;
}

/**
 * Анализ профиля и расчет скоринга рекомендаций
 */
export function computeRecommendations(
  profile: UserProfile,
  universities: UniversityProgram[] = UNIVERSITIES
): ScoredRecommendation[] {
  const normGpa = normalizeGpa(profile.gpa, profile.gpaScale);

  const scoredList: ScoredRecommendation[] = universities.map((uni) => {
    let score = 50; // Базовый скор
    const matchReasons: string[] = [];
    const risks: string[] = [];
    const scholarships: string[] = [];

    // 1. Совпадение по направлению
    const fieldMatch = profile.fields.includes(uni.field);
    if (fieldMatch) {
      score += 20;
      matchReasons.push(`Программа точно соответствует интересу: ${uni.programName}`);
    } else {
      score -= 15;
    }

    // 2. Совпадение по стране
    const countryMatch = profile.targetCountries.includes(uni.country);
    if (countryMatch) {
      score += 15;
    } else {
      score -= 25; // Если страна вообще не выбрана пользователем
    }

    // 3. Академическая успеваемость (GPA)
    if (normGpa >= uni.minGpa) {
      score += 15;
      matchReasons.push(`Ваш средний балл (${profile.gpa.toFixed(2)}) выше проходного (${uni.minGpa})`);
    } else {
      score -= 20;
      risks.push(`Текущий GPA (${profile.gpa.toFixed(2)}) ниже желаемого минимума вуза (${uni.minGpa})`);
    }

    // 4. Языковой тест (IELTS)
    if (profile.ielts !== null && profile.ielts >= uni.minIelts) {
      score += 15;
      matchReasons.push(`Уровень IELTS ${profile.ielts} полностью закрывает требование (мин. ${uni.minIelts})`);
    } else if (profile.ielts !== null && profile.ielts < uni.minIelts) {
      score -= 15;
      risks.push(`Требуется пересдача IELTS: у вас ${profile.ielts}, вуз требует ${uni.minIelts}`);
    } else {
      // IELTS не сдан
      risks.push(`Сертификат IELTS пока не сдан (для поступления нужен балл от ${uni.minIelts})`);
      score -= 10;
    }

    // 5. Тесты SAT и ЕНТ
    if (uni.minSat) {
      if (profile.sat && profile.sat >= uni.minSat) {
        score += 15;
        matchReasons.push(`Балл SAT ${profile.sat} конкурентен для отбора (мин. ${uni.minSat})`);
      } else if (profile.sat && profile.sat < uni.minSat) {
        score -= 15;
        risks.push(`Балл SAT ${profile.sat} ниже медианы зачисленных (${uni.minSat})`);
      } else {
        risks.push(`Программа требует или рекомендует SAT (от ${uni.minSat})`);
        score -= 5;
      }
    }

    if (uni.minEnt) {
      if (profile.ent && profile.ent >= uni.minEnt) {
        score += 20;
        matchReasons.push(`Балл ЕНТ ${profile.ent} дает высокие шансы на государственный грант`);
      } else if (profile.ent && profile.ent < uni.minEnt) {
        score -= 20;
        risks.push(`Балл ЕНТ ${profile.ent} рискован для гранта (желательно ${uni.minEnt}+)`);
      }
    }

    // 6. Олимпиады и внеучебная деятельность
    if (profile.olympiadLevel === 'republic' || profile.olympiadLevel === 'international') {
      score += 15;
      matchReasons.push('Олимпиадный бэкграунд дает преимущество в конкурсном отборе портфолио');
    }

    // 7. Финансовое соответствие (Бюджет)
    if (uni.scholarshipAvailable) {
      scholarships.push(`${uni.scholarshipName}: ${uni.scholarshipDetails}`);
    }

    if (profile.budget === 'grant_only') {
      if (uni.tuitionUsdPerYear === 0 || uni.scholarshipAvailable) {
        score += 15;
        matchReasons.push('100% возможность учиться без оплаты за счет гранта/стипендии');
      } else {
        score -= 35;
        risks.push(`Высокая стоимость обучения ($${uni.tuitionUsdPerYear}/год) при нулевом бюджете`);
      }
    } else if (profile.budget === 'low_5k') {
      if (uni.tuitionUsdPerYear <= 5000) {
        score += 10;
      } else if (!uni.scholarshipAvailable) {
        score -= 20;
        risks.push(`Стоимость программы ($${uni.tuitionUsdPerYear}) превышает комфортный лимит ($5,000/год)`);
      }
    }

    // Нормализация скора в диапазон 20 - 98
    const finalScore = Math.max(20, Math.min(98, Math.round(score)));

    // Определение категории (Dream / Target / Safety)
    let tier: RecommendationTier = 'target';
    let chanceCategory: ScoredRecommendation['chanceCategory'] = 'Средние (50-74%)';

    const isTopAcceptance = parseInt(uni.acceptanceRate) <= 15;

    if (finalScore >= 80 && !isTopAcceptance) {
      tier = 'safety';
      chanceCategory = 'Высокие (75-90%)';
    } else if (finalScore >= 70 && !isTopAcceptance) {
      tier = 'target';
      chanceCategory = 'Средние (50-74%)';
    } else if (finalScore >= 60 || isTopAcceptance) {
      tier = 'dream';
      chanceCategory = finalScore >= 75 ? 'Конкурентные (30-49%)' : 'Экстремальные (<30%)';
    } else {
      tier = 'dream';
      chanceCategory = 'Конкурентные (30-49%)';
    }

    return {
      university: uni,
      tier,
      matchScore: finalScore,
      chanceCategory,
      whyItFits: {
        title: `Почему ${uni.name} подходит под ваш профиль:`,
        points: matchReasons.length > 0 ? matchReasons.slice(0, 3) : ['Совпадение по профилю и академическому треку'],
        academicFit: normGpa >= uni.minGpa
          ? `Ваш GPA (${profile.gpa.toFixed(2)}) полностью удовлетворяет академическому порогу программы.`
          : `Требуется усилить академический средний балл (порог ${uni.minGpa}).`,
        financialFit: uni.scholarshipAvailable
          ? `Доступна стипендия/грант: ${uni.scholarshipName}. Покрывает обучение полностью или частично.`
          : `Стоимость обучения составляет ~$${uni.tuitionUsdPerYear} в год + проживание ~$${uni.livingCostUsdPerYear}.`,
        careerFit: uni.careerProspects
      },
      risksAndBottlenecks: risks.length > 0 ? risks : ['Высокая конкуренция среди иностранных аппликантов.'],
      scholarshipOpportunities: scholarships
    };
  });

  // Сортировка: сначала с наивысшим matchScore
  return scoredList.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Генерация AI-диагностики профиля абитуриента
 */
export function generateDiagnostics(
  profile: UserProfile,
  recommendations: ScoredRecommendation[]
): DiagnosticReport {
  const normGpa = normalizeGpa(profile.gpa, profile.gpaScale);
  const strengths: string[] = [];
  const limitations: string[] = [];

  // Сильные стороны
  if (normGpa >= 4.5) {
    strengths.push(`Отличный академический показатель: GPA ${profile.gpa.toFixed(2)} открывает доступ к селективным грантам.`);
  } else if (normGpa >= 4.0) {
    strengths.push(`Уверенный средний балл (GPA ${profile.gpa.toFixed(2)}), достаточный для большинства бакалаврских программ.`);
  }

  if (profile.ielts && profile.ielts >= 7.0) {
    strengths.push(`Высокий уровень английского (IELTS ${profile.ielts}): освобождает от языковых курсов и дает преимущество.`);
  } else if (profile.ielts && profile.ielts >= 6.0) {
    strengths.push(`Рабочий уровень английского (IELTS ${profile.ielts}), покрывающий стандартные требования.`);
  }

  if (profile.sat && profile.sat >= 1350) {
    strengths.push(`Сильный результат SAT (${profile.sat}) позволяет конкурировать за стипендии в США, Корее и NU.`);
  }

  if (profile.ent && profile.ent >= 110) {
    strengths.push(`Высокий балл ЕНТ (${profile.ent}) гарантирует отличные шансы на грант МОН РК.`);
  }

  if (profile.olympiadLevel === 'republic' || profile.olympiadLevel === 'international') {
    strengths.push('Победы на республиканских/международных олимпиадах — сильнейший дифференциатор для приемных комиссий.');
  }

  if (profile.hasVolunteeringOrProjects) {
    strengths.push('Наличие внеучебных проектов и волонтерства усиливает Holistic Admissions (целостный отбор).');
  }

  if (strengths.length === 0) {
    strengths.push('Четкая мотивация и готовность к поступлению на профильные программы.');
  }

  // Ограничения и риски
  if (!profile.ielts || profile.ielts < 6.0) {
    limitations.push('Отсутствие подтвержденного сертификата IELTS 6.5+ — главный барьер для зарубежных грантов прямо сейчас.');
  }

  if (profile.budget === 'grant_only') {
    limitations.push('Ограничение бюджета: требуются программы со 100% финансированием (госгранты, стипендии DSU/DAAD/KAIST).');
  }

  if (!profile.hasVolunteeringOrProjects && profile.targetCountries.includes('usa')) {
    limitations.push('Для американских вузов критически не хватает внеклассной активности и лидерского портфолио.');
  }

  if (profile.level === 'grade_11' && (!profile.sat || !profile.ielts)) {
    limitations.push('Сжатые сроки (11 класс): необходимо сдать экзамены в первой половине учебного года до основных дедлайнов.');
  }

  if (limitations.length === 0) {
    limitations.push('Высокая конкуренция в пуле аппликантов на топовые грантовые места.');
  }

  // Расчет индекса готовности (Readiness Score)
  let readiness = 45;
  if (normGpa >= 4.5) readiness += 15;
  if (profile.ielts && profile.ielts >= 6.5) readiness += 15;
  if (profile.sat && profile.sat >= 1300) readiness += 15;
  if (profile.ent && profile.ent >= 105) readiness += 10;
  if (profile.olympiadLevel !== 'none') readiness += 10;
  if (profile.hasVolunteeringOrProjects) readiness += 5;

  const finalReadiness = Math.min(95, Math.max(35, readiness));

  // Формулировка образовательной цели
  const fieldNames: Record<string, string> = {
    cs_it: 'Computer Science & AI',
    engineering: 'Инженерия и робототехника',
    business_econ: 'Бизнес и аналитика',
    medicine_bio: 'Медицина и биотехнологии',
    design_media: 'Дизайн и цифровые медиа',
    humanities_law: 'Гуманитарные науки и право'
  };

  const selectedFields = profile.fields.map(f => fieldNames[f] || f).join(' / ');
  const goal = `Поступление на бакалавриат по направлению «${selectedFields}» на ${profile.targetYear} год с максимальным покрытием расходов через гранты и стипендии.`;

  const topTierUni = recommendations[0]?.university.name || 'целевые университеты';

  const strategy = profile.budget === 'grant_only'
    ? `Сфокусироваться на триаде: 1 Dream (например, ${topTierUni}), 2 Target с гарантированными региональными грантами (DSU / МОН РК) и 1 Safety. Первоочередной акцент — добор баллов по языку и подача в ранние раунды.`
    : `Стратегия сбалансированной подачи: подача документов в 3-5 программ с распределением рисков и упором на практическое портфолио.`;

  return {
    summary: `Абитуриент ${profile.name ? profile.name : 'пользователь'} ориентируется на направление ${selectedFields}. Обладает ${normGpa >= 4.5 ? 'высоким' : 'уверенным'} академическим потенциалом, планирует старт обучения в ${profile.targetYear} году.`,
    strengths,
    limitations,
    educationalGoal: goal,
    readinessScore: finalReadiness,
    recommendedStrategy: strategy
  };
}
