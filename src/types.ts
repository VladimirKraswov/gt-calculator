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
    toothHeight: number;    // Высота зуба (мм)
    topWidth: number;       // Ширина вершины зуба (мм)
    baseWidth: number;      // Ширина основания зуба (мм)
    angle?: number;         // Угол наклона (град, опционально)
    widthOptions: number[]; // Доступные ширины ремня (мм)
  };