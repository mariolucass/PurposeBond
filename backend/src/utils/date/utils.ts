import { format, isAfter, startOfWeek, subWeeks } from "date-fns";

export function getStartDateWeeksAgo(weeks: number): Date {
  return subWeeks(new Date(), weeks);
}

export function getWeekLabel(date: Date): string {
  return format(startOfWeek(date), "yyyy-MM-dd");
}

export function isDateInLastXWeeks(date: Date, weeks: number): boolean {
  const cutoff = subWeeks(new Date(), weeks);
  return isAfter(date, cutoff);
}
