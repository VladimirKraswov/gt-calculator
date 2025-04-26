// constants.ts
import { BeltType, PulleySpecs, ToothProfile } from "../types";

export const beltProfiles: Record<BeltType, ToothProfile> = {
  GT2: {
    pitch: 2,
    toothHeight: 1.38,
    topWidth: 0.76,
    baseWidth: 1.0,
    radialCompensation: 0.2,
    angle: 40,
  },
  GT3: {
    pitch: 3,
    toothHeight: 1.5,
    topWidth: 1.25,
    baseWidth: 1.8,
    radialCompensation: 0.3,
    angle: 40,
  },
  T5: {
    pitch: 5,
    toothHeight: 1.85,
    topWidth: 2.0,
    baseWidth: 2.85,
    radialCompensation: 0.65, // Уточнено по таблице (разница между P.D и O.D)
    angle: 40,
    minTeeth: 12,
    maxTeeth: 60
  },
  T10: {
    pitch: 10,
    toothHeight: 4.5,
    topWidth: 4.0,
    baseWidth: 6.0,
    radialCompensation: 0.8,
    angle: 40,
  },
  HTD3M: {
    pitch: 3,
    toothHeight: 1.73,
    topWidth: 1.3,
    baseWidth: 2.0,
    radialCompensation: 0.25,
    angle: 40,
  },
  HTD5M: {
    pitch: 5,
    toothHeight: 2.85,
    topWidth: 2.0,
    baseWidth: 3.0,
    radialCompensation: 0.4,
    angle: 40,
  },
};

export const t5StandardSpecs: Record<string, PulleySpecs> = {
    "T5x12": {
      teeth: 12,
      pitchDiameter: 19.10,
      outerDiameter: 18.25,
      flangeDiameter: 23,
      boreDiameter: 13
    },
    "T5x14": {
      teeth: 14,
      pitchDiameter: 22.28,
      outerDiameter: 21.43,
      flangeDiameter: 25,
      boreDiameter: 16,
      hubDiameter: 14
    },
    "T5x15": {
      teeth: 15,
      pitchDiameter: 23.88,
      outerDiameter: 23.03,
      flangeDiameter: 28,
      boreDiameter: 18,
      hubDiameter: 15
    },
    "T5x16": {
      teeth: 16,
      pitchDiameter: 25.46,
      outerDiameter: 24.61,
      flangeDiameter: 32,
      boreDiameter: 20,
      hubDiameter: 17
    },
    "T5x18": {
      teeth: 18,
      pitchDiameter: 28.65,
      outerDiameter: 27.80,
      flangeDiameter: 33,
      boreDiameter: 22,
      hubDiameter: 19
    },
    "T5x20": {
      teeth: 20,
      pitchDiameter: 31.83,
      outerDiameter: 30.98,
      flangeDiameter: 35,
      boreDiameter: 24,
      hubDiameter: 19
    },
    "T5x22": {
      teeth: 22,
      pitchDiameter: 35.01,
      outerDiameter: 34.16,
      flangeDiameter: 40,
      boreDiameter: 27,
      hubDiameter: 24
    },
    "T5x24": {
      teeth: 24,
      pitchDiameter: 38.20,
      outerDiameter: 37.35,
      flangeDiameter: 44,
      boreDiameter: 32,
      hubDiameter: 27
    },
    "T5x25": {
      teeth: 25,
      pitchDiameter: 39.79,
      outerDiameter: 38.94,
      flangeDiameter: 44,
      boreDiameter: 32,
      hubDiameter: 27
    },
    "T5x26": {
      teeth: 26,
      pitchDiameter: 41.38,
      outerDiameter: 40.53,
      flangeDiameter: 47,
      boreDiameter: 34,
      hubDiameter: 31
    },
    "T5x28": {
      teeth: 28,
      pitchDiameter: 44.56,
      outerDiameter: 43.71,
      flangeDiameter: 47,
      boreDiameter: 34,
      hubDiameter: 32
    },
    "T5x30": {
      teeth: 30,
      pitchDiameter: 47.75,
      outerDiameter: 46.90,
      flangeDiameter: 51,
      boreDiameter: 36,
      hubDiameter: 33
    },
    "T5x32": {
      teeth: 32,
      pitchDiameter: 50.93,
      outerDiameter: 50.08,
      flangeDiameter: 55,
      boreDiameter: 39,
      hubDiameter: 37
    },
    "T5x34": {
      teeth: 34,
      pitchDiameter: 54.11,
      outerDiameter: 53.26,
      flangeDiameter: 60,
      boreDiameter: 46,
      hubDiameter: 40
    },
    "T5x36": {
      teeth: 36,
      pitchDiameter: 57.30,
      outerDiameter: 56.45,
      flangeDiameter: 60,
      boreDiameter: 46,
      hubDiameter: 40
    },
    "T5x40": {
      teeth: 40,
      pitchDiameter: 63.66,
      outerDiameter: 62.81,
      flangeDiameter: 67,
      boreDiameter: 50,
      hubDiameter: 47
    },
    "T5x44": {
      teeth: 44,
      pitchDiameter: 70.03,
      outerDiameter: 69.18,
      flangeDiameter: 74,
      boreDiameter: 53,
      hubDiameter: 50
    },
    "T5x48": {
      teeth: 48,
      pitchDiameter: 76.39,
      outerDiameter: 75.54,
      flangeDiameter: 83,
      boreDiameter: 63,
      hubDiameter: 60
    },
    "T5x50": {
      teeth: 50,
      pitchDiameter: 79.58,
      outerDiameter: 78.73,
      flangeDiameter: 87,
      boreDiameter: 68,
      hubDiameter: 63
    },
    "T5x60": {
      teeth: 60,
      pitchDiameter: 95.49,
      outerDiameter: 94.64,
      flangeDiameter: 99,
      boreDiameter: 78,
      hubDiameter: 75
    }
  };