import { BeltType, PulleySpecs, ToothProfile } from "../types";

// Профили зубчатых ремней
export const beltProfiles: Record<BeltType, ToothProfile> = {
  GT2: {
    pitch: 2,
    toothHeight: 1.38,
    topWidth: 0.76,
    baseWidth: 1.0,
    radialCompensation: 0.2,
    toothDepth: 0.75,
    angle: 40,
  },
  GT3: {
    pitch: 3,
    toothHeight: 1.5,
    topWidth: 1.25,
    baseWidth: 1.8,
    radialCompensation: 0.3,
    toothDepth: 1.0,
    angle: 40,
  },
  T5: {
    pitch: 5,
    toothHeight: 1.2,
    topWidth: 1.8,
    baseWidth: 2.6,
    radialCompensation: 0.8, // Увеличим для 3D-печати
    toothDepth: 1.2,
    angle: 40,
    minTeeth: 12,
    maxTeeth: 60,
  },
  T10: {
    pitch: 10,
    toothHeight: 4.5,
    topWidth: 4.0,
    baseWidth: 6.0,
    radialCompensation: 0.8,
    toothDepth: 2.5,
    angle: 40,
  },
  HTD3M: {
    pitch: 3,
    toothHeight: 1.73,
    topWidth: 1.3,
    baseWidth: 2.0,
    radialCompensation: 0.25,
    toothDepth: 1.15,
    angle: 40,
  },
  HTD5M: {
    pitch: 5,
    toothHeight: 2.85,
    topWidth: 2.0,
    baseWidth: 3.0,
    radialCompensation: 0.4,
    toothDepth: 1.95,
    angle: 40,
  },
};

// Стандартные шкивы T5
export const t5StandardSpecs: Record<string, PulleySpecs> = {
    "T5x10": { teeth: 10, pitchDiameter: 16.05, outerDiameter: 15.05, flangeDiameter: 20, hubDiameter: 8, boreDiameter: 4 },
    "T5x12": { teeth: 12, pitchDiameter: 19.25, outerDiameter: 18.25, flangeDiameter: 23, hubDiameter: 11, boreDiameter: 4 },
    "T5x14": { teeth: 14, pitchDiameter: 22.45, outerDiameter: 21.45, flangeDiameter: 25, hubDiameter: 13, boreDiameter: 4 },
    "T5x15": { teeth: 15, pitchDiameter: 24.05, outerDiameter: 23.05, flangeDiameter: 28, hubDiameter: 16, boreDiameter: 6 },
    "T5x16": { teeth: 16, pitchDiameter: 25.65, outerDiameter: 24.60, flangeDiameter: 32, hubDiameter: 18, boreDiameter: 6 },
    "T5x18": { teeth: 18, pitchDiameter: 28.80, outerDiameter: 27.80, flangeDiameter: 32, hubDiameter: 20, boreDiameter: 6 },
    "T5x19": { teeth: 19, pitchDiameter: 30.40, outerDiameter: 29.40, flangeDiameter: 36, hubDiameter: 22, boreDiameter: 6 },
    "T5x20": { teeth: 20, pitchDiameter: 32.00, outerDiameter: 31.00, flangeDiameter: 36, hubDiameter: 24, boreDiameter: 6 },
    "T5x22": { teeth: 22, pitchDiameter: 35.15, outerDiameter: 34.15, flangeDiameter: 38, hubDiameter: 26, boreDiameter: 6 },
    "T5x24": { teeth: 24, pitchDiameter: 38.40, outerDiameter: 37.40, flangeDiameter: 42, hubDiameter: 26, boreDiameter: 6 },
    "T5x25": { teeth: 25, pitchDiameter: 39.95, outerDiameter: 38.95, flangeDiameter: 44, hubDiameter: 26, boreDiameter: 6 },
    "T5x26": { teeth: 26, pitchDiameter: 41.60, outerDiameter: 40.60, flangeDiameter: 44, hubDiameter: 26, boreDiameter: 6 },
    "T5x27": { teeth: 27, pitchDiameter: 43.20, outerDiameter: 42.20, flangeDiameter: 48, hubDiameter: 32, boreDiameter: 8 },
    "T5x28": { teeth: 28, pitchDiameter: 44.75, outerDiameter: 43.75, flangeDiameter: 48, hubDiameter: 32, boreDiameter: 8 },
    "T5x30": { teeth: 30, pitchDiameter: 47.95, outerDiameter: 46.95, flangeDiameter: 51, hubDiameter: 34, boreDiameter: 8 },
    "T5x32": { teeth: 32, pitchDiameter: 51.10, outerDiameter: 50.10, flangeDiameter: 54, hubDiameter: 38, boreDiameter: 8 },
    "T5x36": { teeth: 36, pitchDiameter: 57.45, outerDiameter: 56.45, flangeDiameter: 64, hubDiameter: 38, boreDiameter: 8 },
    "T5x40": { teeth: 40, pitchDiameter: 63.85, outerDiameter: 62.85, flangeDiameter: 66, hubDiameter: 40, boreDiameter: 8 },
    "T5x42": { teeth: 42, pitchDiameter: 67.00, outerDiameter: 66.00, flangeDiameter: 70, hubDiameter: 40, boreDiameter: 8 },
    "T5x44": { teeth: 44, pitchDiameter: 70.20, outerDiameter: 69.20, flangeDiameter: 70, hubDiameter: 40, boreDiameter: 8 },
    "T5x48": { teeth: 48, pitchDiameter: 76.55, outerDiameter: 75.55, flangeDiameter: undefined, hubDiameter: 50, boreDiameter: 8 },
    "T5x60": { teeth: 60, pitchDiameter: 95.65, outerDiameter: 94.65, flangeDiameter: undefined, hubDiameter: 65, boreDiameter: 8 },
  };
  

// Стандартные шкивы GT2
export const gt2StandardSpecs: Record<string, PulleySpecs> = {
    "GT2x16": { teeth: 16, pitchDiameter: 10.18, outerDiameter: 12.22, flangeDiameter: 16, boreDiameter: 5 },
    "GT2x18": { teeth: 18, pitchDiameter: 11.46, outerDiameter: 13.50, flangeDiameter: 18, boreDiameter: 5 },
    "GT2x20": { teeth: 20, pitchDiameter: 12.73, outerDiameter: 14.77, flangeDiameter: 18, boreDiameter: 5 },
    "GT2x22": { teeth: 22, pitchDiameter: 14.01, outerDiameter: 16.05, flangeDiameter: 20, boreDiameter: 6 },
    "GT2x24": { teeth: 24, pitchDiameter: 15.28, outerDiameter: 17.32, flangeDiameter: 20, boreDiameter: 6 },
    "GT2x26": { teeth: 26, pitchDiameter: 16.56, outerDiameter: 18.60, flangeDiameter: 22, boreDiameter: 6 },
    "GT2x28": { teeth: 28, pitchDiameter: 17.83, outerDiameter: 19.87, flangeDiameter: 22, boreDiameter: 6 },
    "GT2x30": { teeth: 30, pitchDiameter: 19.11, outerDiameter: 21.15, flangeDiameter: 25, boreDiameter: 6 },
    "GT2x32": { teeth: 32, pitchDiameter: 20.38, outerDiameter: 22.42, flangeDiameter: 25, boreDiameter: 6 },
    "GT2x36": { teeth: 36, pitchDiameter: 22.91, outerDiameter: 24.95, flangeDiameter: 30, boreDiameter: 8 },
    "GT2x40": { teeth: 40, pitchDiameter: 25.46, outerDiameter: 27.50, flangeDiameter: 32, boreDiameter: 8 },
    "GT2x44": { teeth: 44, pitchDiameter: 28.00, outerDiameter: 30.04, flangeDiameter: 36, boreDiameter: 8 },
    "GT2x48": { teeth: 48, pitchDiameter: 30.55, outerDiameter: 32.59, flangeDiameter: 38, boreDiameter: 8 },
    "GT2x60": { teeth: 60, pitchDiameter: 38.19, outerDiameter: 40.23, flangeDiameter: 45, boreDiameter: 10 },
  };
  

// Объединяем все стандарты
export const standardPulleySpecs: Record<string, PulleySpecs> = {
    ...t5StandardSpecs,
    ...gt2StandardSpecs,
  };
