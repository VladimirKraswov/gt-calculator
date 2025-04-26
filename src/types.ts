// types.ts
export type BeltProfile = {
    pitch: number;       // Шаг зуба (мм)
    toothHeight: number; // Высота зуба (мм)
    widthOptions: number[]; // Доступные ширины ремня (мм)
  };
  
  export type BeltType = 'GT2' | 'GT3' | 'T5' | 'T10' | 'HTD3M' | 'HTD5M'; // и другие ваши типы
  
  export interface PulleyResult {
    radius: number;      // Радиус шкива (мм)
    diameter: number;    // Диаметр шкива (мм)
    recommendation: string; // Рекомендации по моделированию
  }

  export type ToothProfile = {
    pitch: number;          // Шаг зуба (мм)
    toothHeight: number;   // Высота зуба (мм)
    topWidth: number;      // Ширина вершины зуба (мм)
    baseWidth: number;     // Ширина основания зуба (мм)
    radialCompensation: number; // Радиальная компенсация для печати (мм)
    angle?: number;        // Угол наклона (град)
    minTeeth?: number;     // Минимальное кол-во зубьев
    maxTeeth?: number;     // Максимальное кол-во зубьев
  };

  export type PulleySpecs = {
    teeth: number;
    pitchDiameter: number;
    outerDiameter: number;
    flangeDiameter?: number;    // Диаметр фланца (F)
    boreDiameter?: number;      // Посадочный диаметр (M)
    hubDiameter?: number;       // Диаметр ступицы (Dm)
    screwType?: string;         // Тип крепёжного винта
  };