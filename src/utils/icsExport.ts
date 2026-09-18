import { RoadmapTask } from '../types';

/**
 * Создание и скачивание .ics файла для добавления дедлайнов в календарь
 */
export function exportTasksToICalendar(tasks: RoadmapTask[], studentName: string = 'Абитуриент') {
  const events = tasks.map((task) => {
    // Форматирование даты в формат YYYYMMDD
    const cleanDate = task.dueDate.replace(/-/g, '');
    const uid = `tusu-${task.id}-${cleanDate}@tusu.ai`;

    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${cleanDate}T090000Z`,
      `DTSTART;VALUE=DATE:${cleanDate}`,
      `DTEND;VALUE=DATE:${cleanDate}`,
      `SUMMARY:[Поступление] ${task.title}`,
      `DESCRIPTION:${task.description.replace(/\n/g, ' ')}\\nПриоритет: ${task.priority.toUpperCase()}`,
      `STATUS:${task.isCompleted ? 'COMPLETED' : 'CONFIRMED'}`,
      'END:VEVENT'
    ].join('\r\n');
  }).join('\r\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TUSU.AI AI//Personal Admission Roadmap//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:Маршрут поступления — ${studentName}`,
    'X-WR-TIMEZONE:Asia/Almaty',
    events,
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `tusu-deadlines-${cleanFilename(studentName)}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function cleanFilename(str: string): string {
  return str.toLowerCase().replace(/[^a-zа-я0-9]/gi, '-');
}
