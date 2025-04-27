import React from "react";
import { useTheme } from "antd-style";

interface DimensionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  labelOffsetX?: number;
  labelOffsetY?: number;
  textAnchor?: "start" | "middle" | "end";
  lineColor?: string;
  textColor?: string;
}

const DimensionLine: React.FC<DimensionLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  label,
  labelOffsetX = 0,
  labelOffsetY = -5,
  textAnchor = "middle",
  lineColor,
  textColor,
}) => {
  const token = useTheme();

  const centerX = (x1 + x2) / 2 + labelOffsetX;
  const centerY = (y1 + y2) / 2 + labelOffsetY;

  // Цвета по умолчанию, если явно не передали
  const finalLineColor = lineColor || token.colorTextSecondary;
  const finalTextColor = textColor || token.colorTextSecondary;

  return (
    <>
      <defs>
        <marker
          id="arrow-end"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill={finalLineColor} />
        </marker>
        <marker
          id="arrow-start"
          markerWidth="6"
          markerHeight="6"
          refX="1"
          refY="3"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill={finalLineColor} />
        </marker>
      </defs>

      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={finalLineColor}
        strokeWidth={1}
        markerStart="url(#arrow-start)"
        markerEnd="url(#arrow-end)"
      />
      <text
        x={centerX}
        y={centerY}
        fill={finalTextColor}
        fontSize={14}
        textAnchor={textAnchor}
      >
        {label}
      </text>
    </>
  );
};

export default DimensionLine;
