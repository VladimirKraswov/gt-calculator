import type { BeltType, PulleySpecs } from "../types";
import { beltProfiles, t5StandardSpecs } from "../utils/constants";

export const getScrewType = (boreDiameter: number): string => {
  if (boreDiameter <= 5) return "M3";
  if (boreDiameter <= 12) return "M4";
  if (boreDiameter <= 17) return "M5";
  if (boreDiameter <= 30) return "M6";
  return "M8";
};

type CalculatedPulley = {
  teeth: number;
  pitchDiameter: number;
  outerDiameter: number;
  rootDiameter: number;
  isStandard: boolean;
  flangeDiameter?: number;
  boreDiameter?: number;
  hubDiameter?: number;
  screwType?: string;
  standardSpecs?: PulleySpecs;
};

/**
 * Рассчитывает точные параметры шкива
 */
export const calculatePulley = (
  beltType: BeltType,
  teeth: number,
  options?: { 
    forPrinting?: boolean;
    includeStandard?: boolean;
  }
): CalculatedPulley => {
  const profile = beltProfiles[beltType];

  // Проверка допустимого количества зубьев
  if (profile.minTeeth && teeth < profile.minTeeth) {
    throw new Error(`Минимальное количество зубьев для ${beltType}: ${profile.minTeeth}`);
  }
  if (profile.maxTeeth && teeth > profile.maxTeeth) {
    throw new Error(`Максимальное количество зубьев для ${beltType}: ${profile.maxTeeth}`);
  }

  const standardKey = `${beltType}x${teeth}`;
  const standardSpecs = t5StandardSpecs[standardKey];

  // Расчёт делительного диаметра
  const calculatedPitchDiameter = (profile.pitch * teeth) / Math.PI;

  // Расчёт внешнего диаметра через глубину зуба (а не radialCompensation)
  const calculatedOuterDiameter = calculatedPitchDiameter - (2 * profile.toothDepth);

  // Расчёт корневого диаметра для печати канавок
  const calculatedRootDiameter = calculatedPitchDiameter - (2 * profile.toothHeight);

  const result: CalculatedPulley = {
    teeth,
    pitchDiameter: standardSpecs?.pitchDiameter || parseFloat(calculatedPitchDiameter.toFixed(3)),
    outerDiameter: standardSpecs?.outerDiameter || parseFloat(calculatedOuterDiameter.toFixed(3)),
    rootDiameter: parseFloat(calculatedRootDiameter.toFixed(3)), // всегда считаем вручную
    isStandard: !!standardSpecs,
    ...(standardSpecs ? {
      flangeDiameter: standardSpecs.flangeDiameter,
      boreDiameter: standardSpecs.boreDiameter,
      hubDiameter: standardSpecs.hubDiameter,
      screwType: standardSpecs.boreDiameter ? getScrewType(standardSpecs.boreDiameter) : undefined
    } : {})
  };

  if (options?.includeStandard && standardSpecs) {
    result.standardSpecs = standardSpecs;
  }

  return result;
};

/**
 * Генерирует рекомендации по моделированию
 */
export const getToothRecommendation = (
  beltType: BeltType,
  teeth: number
): string => {
  const profile = beltProfiles[beltType];
  const { pitchDiameter, outerDiameter, rootDiameter } = calculatePulley(beltType, teeth, { forPrinting: true });

  let tips = [
    `=== Параметры для ${beltType}-${teeth} ===`,
    `Стандартные параметры профиля:`,
    `- Высота зуба = ${profile.toothHeight} мм`,
    `- Глубина канавки (toothDepth) = ${profile.toothDepth} мм`,
    `- Ширина вершины = ${profile.topWidth} мм`,
    `- Ширина основания = ${profile.baseWidth} мм`,
    `\nРасчётные размеры шкива:`,
    `- Делительный диаметр (P.D.) = ${pitchDiameter.toFixed(3)} мм`,
    `- Внешний диаметр (O.D.) = ${outerDiameter.toFixed(3)} мм`,
    `- Корневой диаметр (Root D.) = ${rootDiameter.toFixed(3)} мм`,
  ];

  if (teeth < 16) {
    tips.push(
      "\nРекомендации для малых шкивов:",
      "- Уменьшить толщину зуба на 15-20%",
      "- Использовать сопло ≤ 0.3 мм",
      "- Печатать с 100% заполнением"
    );
  } else if (teeth < 30) {
    tips.push(
      "\nРекомендации:",
      "- Стандартная толщина зуба",
      "- Сопло 0.4 мм оптимально",
      "- 3-4 периметра заполнения"
    );
  } else {
    tips.push(
      "\nРекомендации для крупных шкивов:",
      "- Проверить усадку материала после печати",
      "- Сопло 0.4–0.6 мм",
      "- 4–6 периметров для прочности"
    );
  }

  return tips.join("\n");
};
