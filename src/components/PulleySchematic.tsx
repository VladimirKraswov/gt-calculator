import React from "react";
import { useTheme } from "antd-style";
import DimensionLine from "./DimensionLine";
import type { BeltType } from "../types";

const PULLEY_SVG_W = 400;
const PULLEY_SVG_H = 300;
const MAX_RADIUS_PX = 120;

interface Props {
  beltType: BeltType;
  teeth: number;
  results: any;
}

const PulleySchematic: React.FC<Props> = ({ beltType, teeth, results }) => {
  const token = useTheme();
  if (!results) return null;

  const { pitchDiameter, outerDiameter, rootDiameter } = results;
  const scale = MAX_RADIUS_PX / (outerDiameter / 2);

  const pitchR = (pitchDiameter / 2) * scale;
  const outerR = (outerDiameter / 2) * scale;
  const rootR = (rootDiameter / 2) * scale;

  const cx = PULLEY_SVG_W / 2;
  const cy = PULLEY_SVG_H / 2;

  const step = (2 * Math.PI) / teeth;

  // Цвета для каждого диаметра
  const colors = {
    pitch: token.colorPrimary,
    outer: token.colorWarning,
    root: token.colorSuccess,
  };

  return (
    <svg
      width={PULLEY_SVG_W}
      height={PULLEY_SVG_H}
      viewBox={`0 0 ${PULLEY_SVG_W} ${PULLEY_SVG_H}`}
      style={{
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorder}`,
        borderRadius: 4,
      }}
    >
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={token.colorTextSecondary} />
        </marker>
      </defs>

      {/* Pitch circle */}
      <circle
        cx={cx}
        cy={cy}
        r={pitchR}
        stroke={colors.pitch}
        strokeWidth={2}
        fill="none"
      />

      {/* Outer circle */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        stroke={colors.outer}
        strokeWidth={2}
        strokeDasharray="4,4"
        fill="none"
      />

      {/* Root circle */}
      <circle
        cx={cx}
        cy={cy}
        r={rootR}
        stroke={colors.root}
        strokeWidth={2}
        strokeDasharray="2,2"
        fill="none"
      />

      {/* Teeth lines */}
      {Array.from({ length: teeth }).map((_, i) => {
        const ang = i * step;
        return (
          <line
            key={i}
            x1={cx + rootR * Math.cos(ang)}
            y1={cy + rootR * Math.sin(ang)}
            x2={cx + outerR * Math.cos(ang)}
            y2={cy + outerR * Math.sin(ang)}
            stroke={token.colorText}
            strokeWidth={1}
          />
        );
      })}

      {/* Dimension lines */}
      <DimensionLine
        x1={cx - pitchR - 20}
        y1={cy}
        x2={cx + pitchR + 20}
        y2={cy}
        label={`Ø${pitchDiameter.toFixed(1)} мм`}
        lineColor={colors.pitch}
        textColor={colors.pitch}
      />
      <DimensionLine
        x1={cx - outerR - 20}
        y1={cy + 30}
        x2={cx + outerR + 20}
        y2={cy + 30}
        label={`Ø${outerDiameter.toFixed(1)} мм`}
        labelOffsetY={15}
        lineColor={colors.outer}
        textColor={colors.outer}
      />
      <DimensionLine
        x1={cx - rootR - 20}
        y1={cy + 60}
        x2={cx + rootR + 20}
        y2={cy + 60}
        label={`Ø${rootDiameter.toFixed(1)} мм`}
        labelOffsetY={15}
        lineColor={colors.root}
        textColor={colors.root}
      />

      {/* Title */}
      <text
        x={20}
        y={25}
        fill={token.colorText}
        fontSize={16}
        fontWeight="bold"
      >
        Шкив {beltType}, {teeth} зубьев
      </text>
    </svg>
  );
};

export default PulleySchematic;
