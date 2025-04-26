import React from "react";
import { useTheme } from "antd-style";
import { Select, InputNumber, Button, Card, Typography, Divider, Row, Col } from "antd";
import { calculatePulley, getToothRecommendation } from "../utils/calculations";
import { beltProfiles } from "../utils/constants";
import type { BeltType } from "../types";

const { Title, Text } = Typography;
const { Option } = Select;

// SVG constants
const PULLEY_SVG_W = 400;
const PULLEY_SVG_H = 300;
const TOOTH_SVG_W = 400;
const TOOTH_SVG_H = 300;
const MAX_RADIUS_PX = 120;
const TOOTH_BASE_Y = 200; // Y coordinate for tooth base line

const PulleyCalculator: React.FC = () => {
  const token = useTheme();
  const [beltType, setBeltType] = React.useState<BeltType>("GT2");
  const [teeth, setTeeth] = React.useState<number>(20);
  const [results, setResults] = React.useState<any>(null);

  const handleCalculate = () => {
    // Get geometric data and recommendations
    const calc = calculatePulley(beltType, teeth);
    const rec = getToothRecommendation(beltType, teeth);
    setResults({ ...calc, recommendation: rec });
  };

  // Full pulley schematic
  const renderPulleySchematic = () => {
    if (!results) return null;

    const { pitchDiameter, outerDiameter } = results;
    const pitchR_mm = pitchDiameter / 2;
    const outerR_mm = outerDiameter / 2;

    const cx = PULLEY_SVG_W / 2;
    const cy = PULLEY_SVG_H / 2;

    // Scale so that outer radius maps to MAX_RADIUS_PX
    const scale = MAX_RADIUS_PX / outerR_mm;
    const pitchR = pitchR_mm * scale;
    const outerR = outerR_mm * scale;

    const count = Math.min(teeth, 72);
    const step = (2 * Math.PI) / count;

    return (
      <svg
        width={PULLEY_SVG_W}
        height={PULLEY_SVG_H}
        viewBox={`0 0 ${PULLEY_SVG_W} ${PULLEY_SVG_H}`}
        style={{ background: token.colorFillAlter, border: `1px solid ${token.colorBorder}`, borderRadius: 4 }}
      >
        {/* Pitch circle */}
        <circle cx={cx} cy={cy} r={pitchR} stroke={token.colorPrimaryBorder} strokeWidth={2} fill="none" />
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={outerR} stroke={token.colorTextDisabled} strokeWidth={1} strokeDasharray="4,4" fill="none" />
        {/* Teeth */}
        {Array.from({ length: count }).map((_, i) => {
          const ang = i * step;
          const x1 = cx + pitchR * Math.cos(ang);
          const y1 = cy + pitchR * Math.sin(ang);
          const x2 = cx + outerR * Math.cos(ang);
          const y2 = cy + outerR * Math.sin(ang);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={token.colorPrimary} strokeWidth={1.2} />
          );
        })}
        {/* Dimension lines */}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={token.colorTextSecondary} />
          </marker>
        </defs>
        {/* Pitch diameter */}
        <line x1={cx - pitchR - 20} y1={cy} x2={cx + pitchR + 20} y2={cy} stroke={token.colorTextSecondary} strokeWidth={1} markerStart="url(#arrow)" markerEnd="url(#arrow)" />
        <text x={cx} y={cy - 10} fill={token.colorTextSecondary} fontSize={14} textAnchor="middle">Ø{pitchDiameter.toFixed(1)} mm</text>
        {/* Outer diameter */}
        <line x1={cx - outerR - 20} y1={cy + 30} x2={cx + outerR + 20} y2={cy + 30} stroke={token.colorTextSecondary} strokeWidth={1} markerStart="url(#arrow)" markerEnd="url(#arrow)" />
        <text x={cx} y={cy + 45} fill={token.colorTextSecondary} fontSize={14} textAnchor="middle">Ø{outerDiameter.toFixed(1)} mm</text>
        {/* Title */}
        <text x={20} y={25} fill={token.colorText} fontSize={16} fontWeight="bold">
          Шкив {beltType}, {teeth} зубьев
        </text>
      </svg>
    );
  };

  // Single tooth profile
  const renderToothProfile = () => {
    if (!results) return null;

    const profile = beltProfiles[beltType];
    const maxH_px = 100; // tooth height in px
    const scale = maxH_px / profile.toothHeight;

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
        style={{ background: token.colorFillAlter, border: `1px solid ${token.colorBorder}`, borderRadius: 4 }}
      >
        <defs>
          <marker id="arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={token.colorTextSecondary} />
          </marker>
        </defs>
        {/* Baseline */}
        <line x1={0} y1={y0} x2={TOOTH_SVG_W} y2={y0} stroke={token.colorTextDisabled} strokeDasharray="4,4" />
        {/* Tooth trapezoid */}
        <polygon
          points={`${leftB},${y0} ${rightB},${y0} ${rightT},${topY} ${leftT},${topY}`}
          fill={token.colorPrimaryBg}
          stroke={token.colorPrimaryBorder}
          strokeWidth={1.5}
        />
        {/* Dimensions */}
        {/* Base width */}
        <line x1={leftB} y1={y0 + 20} x2={rightB} y2={y0 + 20} stroke={token.colorTextSecondary} strokeWidth={1} markerStart="url(#arrow2)" markerEnd="url(#arrow2)" />
        <text x={cx} y={y0 + 5} fill={token.colorTextSecondary} fontSize={14} textAnchor="middle">{profile.baseWidth.toFixed(2)} mm</text>
        {/* Height */}
        <line x1={rightB + 20} y1={y0} x2={rightT + 20} y2={topY} stroke={token.colorTextSecondary} strokeWidth={1} markerStart="url(#arrow2)" markerEnd="url(#arrow2)" />
        <text x={rightB + 25} y={(y0 + topY) / 2} fill={token.colorTextSecondary} fontSize={14} textAnchor="start">{profile.toothHeight.toFixed(2)} mm</text>
        {/* Top width */}
        <line x1={leftT} y1={topY - 20} x2={rightT} y2={topY - 20} stroke={token.colorTextSecondary} strokeWidth={1} markerStart="url(#arrow2)" markerEnd="url(#arrow2)" />
        <text x={cx} y={topY - 25} fill={token.colorTextSecondary} fontSize={14} textAnchor="middle">{profile.topWidth.toFixed(2)} mm</text>
        {/* Title */}
        <text x={20} y={25} fill={token.colorText} fontSize={16} fontWeight="bold">Профиль зуба {beltType}</text>
      </svg>
    );
  };

  return (
    <Card title="Расчёт зубчатых шкивов" style={{ maxWidth: 1000, margin: "0 auto", background: token.colorBgContainer }}>
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Тип ремня</Text>
          <Select value={beltType} onChange={(v) => setBeltType(v)} style={{ width: "100%" }}>
            {Object.entries(beltProfiles).map(([type, prof]) => (
              <Option key={type} value={type}>{`${type} (шаг ${prof.pitch} мм)`}</Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Text strong>Число зубьев</Text>
          <InputNumber min={8} max={200} value={teeth} onChange={(v) => setTeeth(v || 20)} style={{ width: "100%" }} />
        </Col>
      </Row>
      <Divider />
      <Button type="primary" block onClick={handleCalculate}>Рассчитать</Button>

      {results && (
        <>          
          <Divider />
          <Row gutter={16} justify="space-around">
            <Col>{renderPulleySchematic()}</Col>
            <Col>{renderToothProfile()}</Col>
          </Row>
          <Divider />
          <Title level={4}>Параметры</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>Делительный диаметр:</Text> {results.pitchDiameter.toFixed(2)} мм<br />
              <Text strong>Внешний диаметр:</Text> {results.outerDiameter.toFixed(2)} мм<br />
              <Text strong>Шаг:</Text> {beltProfiles[beltType].pitch} мм
            </Col>
            <Col span={12}>
              <Text strong>Высота зуба:</Text> {beltProfiles[beltType].toothHeight.toFixed(2)} мм<br />
              <Text strong>Ширина вершины:</Text> {beltProfiles[beltType].topWidth.toFixed(2)} мм<br />
              <Text strong>Ширина основания:</Text> {beltProfiles[beltType].baseWidth.toFixed(2)} мм
            </Col>
          </Row>
          <Divider />
          <Title level={4}>Рекомендации</Title>
          <pre style={{ background: token.colorFillAlter, padding: 12, borderRadius: 4 }}>{results.recommendation}</pre>
        </>
      )}
    </Card>
  );
};

export default PulleyCalculator;
