const RANKS: Record<number, string> = {
  0: "Новобранец",
  1: "Рядовой",
  2: "Ефрейтор",
  3: "Мл. Сержант",
  4: "Сержант",
  5: "Ст. Сержант",
  6: "Старшина",
  7: "Прапорщик",
  8: "Ст. Прапорщик",
  9: "Мл. Лейтенант",
  10: "Лейтенант",
  11: "Ст. Лейтенант",
  12: "Капитан",
  13: "Майор",
  14: "Подполковник",
  15: "Полковник",
  16: "Генерал-майор",
};

export function getRank(level: number | string | null | undefined): string {
  const n = Number(level ?? 1);
  if (Number.isNaN(n)) return "Рядовой";
  return RANKS[n] ?? "Рядовой";
}

export function getRankEmoji(level: number): string {
  if (level <= 1) return "👤";
  if (level <= 4) return "⭐";
  if (level <= 7) return "🌟";
  if (level <= 10) return "🎖️";
  if (level <= 13) return "🏅";
  return "🎗️";
}