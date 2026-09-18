import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { Bot, Brain, BriefcaseBusiness, ChevronRight, FileText, MessageCircle, Sparkles, UserRound, X } from 'lucide-react';

type Account = { firstName: string; lastName: string; middleName: string; nickname: string; age: string; email: string };
type Portfolio = { experience: string; skills: string; achievements: string; volunteering: string; hobbies: string; files: string[] };
type ChatMessage = { role: 'user' | 'assistant'; text: string };

const ACCOUNT_KEY = 'tusu_account_v1';
const PORTFOLIO_KEY = 'tusu_portfolio_v1';
const MBTI_KEY = 'tusu_mbti_v1';
const CAREER_KEY = 'tusu_career_v1';
const OFFTOPIC = 'Я могу помочь только с вопросами об учёбе и поступлении 🎓';
const fieldClass = 'w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-zinc-500';
const educationWords = ['универс', 'вуз', 'учеб', 'поступ', 'грант', 'стипенд', 'специальност', 'професс', 'экзам', 'ielts', 'sat', 'ент', 'gpa', 'факультет', 'программ', 'магист', 'бакалавр', 'колледж'];

const mbtiQuestions: [string, string[]][] = [
  ['После насыщенной недели я восстанавливаюсь', ['в компании людей', 'в тишине и наедине']],
  ['Принимая решение, я больше доверяю', ['фактам и логике', 'ценностям и людям']],
  ['Мне интереснее', ['проверенные детали', 'идеи и возможности']],
  ['В работе мне ближе', ['чёткий план', 'гибкость и спонтанность']],
];
const careerQuestions: [string, string[]][] = [
  ['Что вам нравится больше?', ['решать задачи с данными', 'помогать и общаться с людьми', 'создавать визуальные проекты']],
  ['Какая среда мотивирует?', ['технологичная и динамичная', 'исследовательская и глубокая', 'творческая и свободная']],
  ['Каким результатом вы гордитесь?', ['работающим продуктом', 'полезным решением для людей', 'яркой идеей или историей']],
];
const mbtiInfo: Record<string, { title: string; strengths: string; fields: string }> = {
  ENTP: { title: 'Новатор', strengths: 'любознательность, аргументация, гибкость', fields: 'предпринимательство, product management, IT' },
  INFJ: { title: 'Советник', strengths: 'эмпатия, системное мышление, смысл', fields: 'психология, образование, международные отношения' },
  ISTJ: { title: 'Организатор', strengths: 'надёжность, внимание к деталям, дисциплина', fields: 'инженерия, финансы, право' },
  ESFP: { title: 'Энтузиаст', strengths: 'коммуникация, энергия, практичность', fields: 'медиа, маркетинг, ивенты' },
};

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"><div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-700 bg-[#121215] p-5 shadow-2xl sm:p-7"><button onClick={onClose} className="absolute right-4 top-4 text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>{children}</div></div>;
}

export const AccountHub: React.FC = () => {
  const [account, setAccount] = useState<Account | null>(() => { try { return JSON.parse(localStorage.getItem(ACCOUNT_KEY) || 'null'); } catch { return null; } });
  const [view, setView] = useState<'auth' | 'tour' | 'chat' | 'profile' | 'mbti' | 'career' | null>(() => localStorage.getItem(ACCOUNT_KEY) ? null : 'auth');
  const [tourStep, setTourStep] = useState(0);
  const [mbti, setMbti] = useState<string | null>(() => localStorage.getItem(MBTI_KEY));
  const [career, setCareer] = useState<string | null>(() => localStorage.getItem(CAREER_KEY));
  const [portfolio, setPortfolio] = useState<Portfolio>(() => { try { return JSON.parse(localStorage.getItem(PORTFOLIO_KEY) || '') || { experience: '', skills: '', achievements: '', volunteering: '', hobbies: '', files: [] }; } catch { return { experience: '', skills: '', achievements: '', volunteering: '', hobbies: '', files: [] }; } });
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', text: 'Привет! Я Chach — помогу разобраться с учёбой, университетами и поступлением. С чего начнём?' }]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (account) localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account)); }, [account]);
  useEffect(() => { localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio)); }, [portfolio]);

  const register = (data: FormData) => {
    const password = String(data.get('password') || ''); const confirm = String(data.get('confirm') || '');
    if (password.length < 8) return alert('Пароль должен содержать не менее 8 символов.');
    if (password !== confirm) return alert('Пароли не совпадают.');
    const next = { firstName: String(data.get('firstName')), lastName: String(data.get('lastName')), middleName: String(data.get('middleName')), nickname: String(data.get('nickname')), age: String(data.get('age')), email: String(data.get('email')) };
    setAccount(next); setView('tour');
  };
  const askChach = async () => {
    const text = question.trim(); if (!text || loading) return; setQuestion('');
    const next = [...messages, { role: 'user' as const, text }]; setMessages(next);
    if (!educationWords.some(word => text.toLowerCase().includes(word))) { setMessages([...next, { role: 'assistant', text: OFFTOPIC }]); return; }
    setLoading(true);
    try { const response = await fetch('/api/chach', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next.filter(m => m.role === 'user') }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); setMessages([...next, { role: 'assistant', text: data.text }]); }
    catch { setMessages([...next, { role: 'assistant', text: 'Chach пока не подключён. Добавьте ANTHROPIC_API_KEY в окружение сервера, и я смогу отвечать на вопросы.' }]); }
    finally { setLoading(false); }
  };
  const finishMbti = (answers: string[]) => { const type = `${answers[0] === '0' ? 'E' : 'I'}${answers[2] === '0' ? 'S' : 'N'}${answers[1] === '0' ? 'T' : 'F'}${answers[3] === '0' ? 'J' : 'P'}`; setMbti(type); localStorage.setItem(MBTI_KEY, type); };
  const finishCareer = (answers: string[]) => { const tech = answers.filter(x => x === '0').length; const human = answers.filter(x => x === '1').length; const result = tech >= 2 ? 'Технологии и аналитика' : human >= 2 ? 'Социальные и гуманитарные направления' : 'Креативные индустрии'; setCareer(result); localStorage.setItem(CAREER_KEY, result); };
  const makePdf = () => { if (!account) return; const doc = new jsPDF(); const lines = [`CV — ${account.lastName} ${account.firstName} ${account.middleName}`, `Никнейм: ${account.nickname}`, `Возраст: ${account.age}`, `Email: ${account.email}`, '', 'ОПЫТ', portfolio.experience || 'Не указан', '', 'НАВЫКИ', portfolio.skills || 'Не указаны', '', 'ДОСТИЖЕНИЯ', portfolio.achievements || 'Не указаны', '', 'ВОЛОНТЁРСТВО', portfolio.volunteering || 'Не указано', '', 'ХОББИ', portfolio.hobbies || 'Не указаны', '', 'ПРИЛОЖЕНИЯ', portfolio.files.join(', ') || 'Нет файлов']; doc.setFontSize(12); let y = 18; lines.forEach(line => { const wrapped = doc.splitTextToSize(line, 170); doc.text(wrapped, 20, y); y += wrapped.length * 7; if (y > 275) { doc.addPage(); y = 18; } }); doc.save(`CV-${account.nickname || 'tusu'}.pdf`); };

  const tour = [['Добро пожаловать в TUSU.AI', 'Я Chach. Здесь мы превратим цели поступления в понятный маршрут.'], ['Анкета и рекомендации', 'Заполните профиль — сервис рассчитает подходящие университеты и стипендии.'], ['Ваш личный кабинет', 'Пройдите тесты, добавьте достижения и спросите меня об учёбе в любой момент.']];
  return <>
    {account && <div className="fixed right-3 top-16 z-50 flex max-w-[calc(100vw-1.5rem)] items-center gap-2"><div className="hidden sm:flex gap-1">{!mbti && <button onClick={() => setView('mbti')} className="rounded-lg border border-amber-700/60 bg-amber-950/70 px-2 py-1 text-[11px] text-amber-200">Пройти MBTI</button>}{!career && <button onClick={() => setView('career')} className="rounded-lg border border-emerald-700/60 bg-emerald-950/70 px-2 py-1 text-[11px] text-emerald-200">Профориентация</button>}</div><button onClick={() => setView('chat')} className="rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-100 hover:bg-zinc-800"><MessageCircle className="mr-1 inline h-3.5 w-3.5" />Chach</button><button onClick={() => setView('profile')} className="rounded-lg border border-zinc-700 bg-zinc-900 p-1.5 text-zinc-200 hover:bg-zinc-800"><UserRound className="h-4 w-4" /></button></div>}
    {view === 'auth' && <Modal onClose={() => setView(null)}><div className="mb-6 flex items-center gap-3"><div className="rounded-xl bg-zinc-100 p-2 text-zinc-950"><Sparkles className="h-5 w-5" /></div><div><h2 className="text-xl font-bold">Создать профиль TUSU.AI</h2><p className="text-sm text-zinc-400">Начните свой маршрут поступления.</p></div></div><form action={register} className="space-y-3"><div className="grid gap-3 sm:grid-cols-3"><input required name="lastName" placeholder="Фамилия" className={fieldClass}/><input required name="firstName" placeholder="Имя" className={fieldClass}/><input name="middleName" placeholder="Отчество" className={fieldClass}/></div><div className="grid gap-3 sm:grid-cols-2"><input required name="nickname" placeholder="Никнейм" className={fieldClass}/><input required type="number" min="12" max="100" name="age" placeholder="Возраст" className={fieldClass}/></div><input required type="email" name="email" placeholder="Email" className={fieldClass}/><div className="grid gap-3 sm:grid-cols-2"><input required type="password" name="password" placeholder="Пароль (от 8 символов)" className={fieldClass}/><input required type="password" name="confirm" placeholder="Подтвердите пароль" className={fieldClass}/></div><p className="text-xs text-zinc-500">Пароль проверяется только при регистрации и не сохраняется в браузере.</p><button className="w-full rounded-xl bg-zinc-100 py-3 text-sm font-semibold text-zinc-950 hover:bg-white">Создать профиль <ChevronRight className="inline h-4 w-4" /></button></form></Modal>}
    {view === 'tour' && <Modal onClose={() => setView(null)}><Bot className="mb-4 h-8 w-8 text-emerald-400"/><div className="mb-1 text-xs font-mono text-emerald-400">ЗНАКОМСТВО С CHACH · {tourStep + 1}/3</div><h2 className="text-2xl font-bold">{tour[tourStep][0]}</h2><p className="mt-3 text-zinc-300">{tour[tourStep][1]}</p><div className="mt-7 flex justify-between"><button onClick={() => setView(null)} className="text-sm text-zinc-400 hover:text-white">Пропустить тур</button><button onClick={() => tourStep === 2 ? setView(null) : setTourStep(tourStep + 1)} className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950">{tourStep === 2 ? 'Начать' : 'Далее'} <ChevronRight className="inline h-4 w-4"/></button></div></Modal>}
    {view === 'chat' && <Modal onClose={() => setView(null)}><div className="mb-5 flex items-center gap-2"><Bot className="h-6 w-6 text-emerald-400"/><div><h2 className="font-bold">Chach</h2><p className="text-xs text-zinc-400">Образовательный советник</p></div></div><div className="h-80 space-y-3 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">{messages.map((m, i) => <div key={i} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto bg-zinc-200 text-zinc-950' : 'bg-zinc-800 text-zinc-100'}`}>{m.text}</div>)}{loading && <div className="text-sm text-zinc-400">Chach печатает…</div>}</div><div className="mt-3 flex gap-2"><input value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => e.key === 'Enter' && askChach()} className={fieldClass} placeholder="Спросите об учёбе или поступлении"/><button onClick={askChach} className="rounded-xl bg-zinc-100 px-4 text-zinc-950">→</button></div></Modal>}
    {view === 'mbti' && <Quiz title="Тест психотипа MBTI" subtitle="Ответьте на 4 вопроса — это лёгкая ориентация, а не психологическая диагностика." questions={mbtiQuestions} onDone={finishMbti} onSkip={() => setView(null)} result={mbti ? `${mbti} — ${(mbtiInfo[mbti] || mbtiInfo.ENTP).title}. Сильные стороны: ${(mbtiInfo[mbti] || mbtiInfo.ENTP).strengths}. Подходящие сферы: ${(mbtiInfo[mbti] || mbtiInfo.ENTP).fields}.` : undefined}/>} 
    {view === 'career' && <Quiz title="Тест профориентации" subtitle="Выберите самые близкие вам варианты." questions={careerQuestions} onDone={finishCareer} onSkip={() => setView(null)} result={career ? `Ваш ориентир: ${career}. Изучите программы в этой сфере, поговорите с практиками и соберите 2–3 проекта для портфолио.` : undefined}/>} 
    {view === 'profile' && account && <Modal onClose={() => setView(null)}><div className="mb-6 flex items-center gap-3"><BriefcaseBusiness className="h-6 w-6 text-emerald-400"/><div><h2 className="text-xl font-bold">Профиль и портфолио</h2><p className="text-sm text-zinc-400">{account.firstName} {account.lastName} · @{account.nickname}</p></div></div><div className="grid gap-3 sm:grid-cols-2">{(['experience','skills','achievements','volunteering','hobbies'] as const).map(key => <label key={key} className="text-sm text-zinc-300">{{experience:'Опыт',skills:'Навыки',achievements:'Достижения',volunteering:'Волонтёрство',hobbies:'Хобби'}[key]}<textarea value={portfolio[key]} onChange={e => setPortfolio({...portfolio, [key]: e.target.value})} className={`${fieldClass} mt-1 min-h-20`} /></label>)}</div><label className="mt-4 block rounded-xl border border-dashed border-zinc-700 p-4 text-sm text-zinc-300"><FileText className="mr-2 inline h-4 w-4"/>Добавить дипломы, сертификаты, грамоты или проекты<input multiple type="file" className="mt-2 block text-xs" onChange={e => setPortfolio({...portfolio, files: [...portfolio.files, ...Array.from(e.target.files || []).map(f => f.name)]})}/></label>{portfolio.files.length > 0 && <p className="mt-2 text-xs text-zinc-400">Файлы: {portfolio.files.join(', ')}</p>}<button onClick={makePdf} className="mt-5 w-full rounded-xl bg-zinc-100 py-3 text-sm font-semibold text-zinc-950">Сгенерировать и скачать CV (PDF)</button></Modal>}
  </>;
};

function Quiz({ title, subtitle, questions, onDone, onSkip, result }: { title: string; subtitle: string; questions: [string, string[]][]; onDone: (a: string[]) => void; onSkip: () => void; result?: string }) {
  const [answers, setAnswers] = useState<string[]>([]); const [done, setDone] = useState(Boolean(result));
  if (done && result) return <Modal onClose={onSkip}><Brain className="mb-3 h-7 w-7 text-emerald-400"/><h2 className="text-xl font-bold">Ваш результат</h2><p className="mt-3 leading-relaxed text-zinc-300">{result}</p><button onClick={onSkip} className="mt-6 w-full rounded-xl bg-zinc-100 py-3 text-sm font-semibold text-zinc-950">Готово</button></Modal>;
  return <Modal onClose={onSkip}><h2 className="text-xl font-bold">{title}</h2><p className="mt-1 text-sm text-zinc-400">{subtitle}</p><div className="mt-5 space-y-5">{questions.map(([q, options], i) => <div key={q}><p className="mb-2 text-sm text-zinc-200">{i + 1}. {q}</p><div className="grid gap-2 sm:grid-cols-2">{options.map((o, j) => <button key={o} onClick={() => setAnswers(a => { const n = [...a]; n[i] = String(j); return n; })} className={`rounded-lg border p-2 text-left text-sm ${answers[i] === String(j) ? 'border-emerald-400 bg-emerald-950/40' : 'border-zinc-800 bg-zinc-950'}`}>{o}</button>)}</div></div>)}</div><div className="mt-6 flex justify-between"><button onClick={onSkip} className="text-sm text-zinc-400">Пропустить</button><button disabled={answers.length !== questions.length} onClick={() => { onDone(answers); setDone(true); }} className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-40">Узнать результат</button></div></Modal>;
}
