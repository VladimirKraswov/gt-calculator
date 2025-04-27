// Типы ремней
export type BeltType = 'GT2' | 'GT3' | 'T5' | 'T10' | 'HTD3M' | 'HTD5M';

// Профиль зуба ремня
export type ToothProfile = {
  pitch: number;          // Шаг зуба (мм)
  toothHeight: number;    // Высота зуба (мм)
  topWidth: number;       // Ширина вершины зуба (мм)
  baseWidth: number;      // Ширина основания зуба (мм)
  radialCompensation: number; // Радиальная компенсация для печати (мм)
  toothDepth: number;     // Реальная глубина канавки зуба (мм) !!! новое поле
  angle?: number;         // Угол наклона зуба (градусы)
  minTeeth?: number;      // Минимальное допустимое количество зубьев
  maxTeeth?: number;      // Максимальное допустимое количество зубьев
};

// Спецификации стандартного шкива
export type PulleySpecs = {
  teeth: number;              // Количество зубьев
  pitchDiameter: number;      // Делительный диаметр (мм)
  outerDiameter: number;      // Внешний диаметр (мм)
  flangeDiameter?: number;    // Диаметр фланца (F) (мм)
  boreDiameter?: number;      // Посадочный диаметр (M) (мм)
  hubDiameter?: number;       // Диаметр ступицы (Dm) (мм)
  screwType?: string;         // Тип резьбы под винт (например, M4)
};

// Результаты расчёта шкива
export interface PulleyResult {
  radius: number;             // Радиус шкива (мм)
  diameter: number;           // Диаметр шкива (мм)
  recommendation: string;     // Текстовые рекомендации по проектированию
}
