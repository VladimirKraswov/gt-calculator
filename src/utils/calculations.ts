import type { BeltType } from "../types";

export type ToothProfile = {
  pitch: number;          // Шаг зуба (мм)
  toothHeight: number;   // Высота зуба (мм)
  topWidth: number;      // Ширина вершины зуба (мм)
  baseWidth: number;     // Ширина основания зуба (мм)
  angle?: number;        // Угол наклона (град)
};

export const beltProfiles: Record<BeltType, ToothProfile> = {
  GT2: {
    pitch: 2,
    toothHeight: 1.38,
    topWidth: 0.8,
    baseWidth: 1.0,
    angle: 40,
  },
  GT3: {
    pitch: 3,
    toothHeight: 1.5,
    topWidth: 1.3,
    baseWidth: 1.8,
    angle: 40,
  },
  T5: {
    pitch: 5,
    toothHeight: 2.2,
    topWidth: 2.0,
    baseWidth: 3.0,
    angle: 40,
  },
  T10: {
    pitch: 10,
    toothHeight: 4.5,
    topWidth: 4.0,
    baseWidth: 6.0,
    angle: 40,
  },
  HTD3M: {
    pitch: 3,
    toothHeight: 1.73,
    topWidth: 1.3,
    baseWidth: 2.0,
    angle: 40,
  },
  HTD5M: {
    pitch: 5,
    toothHeight: 2.85,
    topWidth: 2.0,
    baseWidth: 3.0,
    angle: 40,
  },
};

/**
 * Рассчитывает точные параметры шкива по стандарту ISO
 */
export const calculatePulleyRadius = (
  beltType: BeltType,
  teeth: number
): {
  pitchRadius: number;    // Делительный радиус (мм)
  outerRadius: number;    // Внешний радиус (мм)
  pitchDiameter: number;  // Делительный диаметр (мм)
  outerDiameter: number; // Внешний диаметр (мм)
} => {
  const { pitch, toothHeight } = beltProfiles[beltType];
  
  // Основные расчёты по стандарту ISO
  const pitchRadius = (pitch * teeth) / (2 * Math.PI);
  const outerRadius = pitchRadius + toothHeight;

  return {
    pitchRadius: parseFloat(pitchRadius.toFixed(3)),
    outerRadius: parseFloat(outerRadius.toFixed(3)),
    pitchDiameter: parseFloat((pitchRadius * 2).toFixed(3)),
    outerDiameter: parseFloat((outerRadius * 2).toFixed(3)),
  };
};

/**
 * Генерирует рекомендации по моделированию
 */
export const getToothRecommendation = (
  beltType: BeltType,
  teeth: number
): string => {
  const profile = beltProfiles[beltType];
  
  let tips = [
    `Для ${beltType}: высота зуба = ${profile.toothHeight} мм`,
    `Ширина вершины = ${profile.topWidth} мм`,
    `Ширина основания = ${profile.baseWidth} мм`,
  ];

  if (teeth < 16) {
    tips.push("Рекомендация: уменьшить толщину зуба на 20%");
    tips.push("Использовать сопло 0.3 мм или меньше");
  } else {
    tips.push("Рекомендация: стандартная толщина зуба");
    tips.push("Можно использовать сопло 0.4 мм");
  }

  return tips.join("\n");
};