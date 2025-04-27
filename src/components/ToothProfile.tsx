import React from "react";
import { useTheme } from "antd-style";
import { beltProfiles } from "../utils/constants";
import DimensionLine from "./DimensionLine"; // <-- Подключаем новый компонент
import type { BeltType } from "../types";

const TOOTH_SVG_W = 400;
const TOOTH_SVG_H = 300;
const TOOTH_BASE_Y = 200;

interface Props {
  beltType: BeltType;
}

const ToothProfile: React.FC<Props> = ({ beltType }) => {
  const token = useTheme();
  const profile = beltProfiles[beltType];
  const scale = 100 / profile.toothHeight;

  const baseW = profile.baseWidth * scale;
  const topW = profile.topWidth * scale;
  const h_px = profile.toothHeight * scale;
  const cx = TOOTH_SVG_W / 2;
  const y0 = TOOTH_BASE_Y;

  const leftB = cx - baseW / 2;
  const rightB = cx + baseW / 2;
  const leftT = cx - topW / 2;
  const rightT = cx + topW / 2;
  const topY = y0 - h_px;

  return (
    <svg
      width={TOOTH_SVG_W}
      height={TOOTH_SVG_H}
      viewBox={`0 0 ${TOOTH_SVG_W} ${TOOTH_SVG_H}`}
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

      {/* Baseline */}
      <line
        x1={0}
        y1={y0}
        x2={TOOTH_SVG_W}
        y2={y0}
        stroke={token.colorTextDisabled}
        strokeDasharray="4,4"
      />

      {/* Tooth shape */}
      <polygon
        points={`${leftB},${y0} ${rightB},${y0} ${rightT},${topY} ${leftT},${topY}`}
        fill={token.colorPrimaryBg}
        stroke={token.colorPrimaryBorder}
        strokeWidth={1.5}
      />

      {/* Dimension lines */}
      <DimensionLine
        x1={leftB}
        y1={y0 + 20}
        x2={rightB}
        y2={y0 + 20}
        label={`${profile.baseWidth.toFixed(2)} мм`}
      />
      <DimensionLine
        x1={leftT}
        y1={topY - 20}
        x2={rightT}
        y2={topY - 20}
        label={`${profile.topWidth.toFixed(2)} мм`}
      />
      <DimensionLine
        x1={rightB + 20}
        y1={y0}
        x2={rightT + 20}
        y2={topY}
        label={`${profile.toothHeight.toFixed(2)} мм`}
        textAnchor="start"
      />

      {/* Title */}
      <text
        x={20}
        y={25}
        fill={token.colorText}
        fontSize={16}
        fontWeight="bold"
      >
        Профиль зуба {beltType}
      </text>
    </svg>
  );
};

export default ToothProfile;
