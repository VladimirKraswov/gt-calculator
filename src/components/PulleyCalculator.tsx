import React from "react";
import { useTheme } from "antd-style";
import { Select, InputNumber, Button, Card, Typography, Divider, Row, Col } from "antd";
import { beltProfiles, calculatePulleyRadius, getToothRecommendation } from "../utils/calculations";
import type { BeltType } from "../types";

const { Title, Text } = Typography;
const { Option } = Select;

// Константы для SVG
const PULLEY_SVG_WIDTH = 400;
const PULLEY_SVG_HEIGHT = 300;
const TOOTH_SVG_WIDTH = 400;
const TOOTH_SVG_HEIGHT = 300;
const MAX_VISIBLE_RADIUS = 120;
const TOOTH_COLOR = "red";

// Фиксированные размеры для чертежа зуба (в пикселях)
const TOOTH_BASE_Y = 200; // Позиция основания зуба по Y

const PulleyCalculator: React.FC = () => {
  const token = useTheme();
  const [beltType, setBeltType] = React.useState<BeltType>("GT2");
  const [teeth, setTeeth] = React.useState<number>(20);
  const [results, setResults] = React.useState<any>(null);

  const handleCalculate = () => {
    const calculated = calculatePulleyRadius(beltType, teeth);
    setResults({
      ...calculated,
      recommendation: getToothRecommendation(beltType, teeth),
    });
  };

  // Чертеж всего шкива
  const renderPulleySchematic = () => {
    if (!results) return null;
    
    const centerX = PULLEY_SVG_WIDTH / 2;
    const centerY = PULLEY_SVG_HEIGHT / 2;
    
    // Масштабируем для визуализации
    const scaleFactor = MAX_VISIBLE_RADIUS / results.outerRadius;
    const pitchR = results.pitchRadius * scaleFactor;
    const outerR = results.outerRadius * scaleFactor;

    // Ограничиваем количество зубьев для отрисовки
    const teethCount = Math.min(teeth, 72);
    const angleStep = (2 * Math.PI) / teethCount;
    
    // Отрисовка зубьев
    const toothElements = [];
    for (let i = 0; i < teethCount; i++) {
      const angle = i * angleStep;
      const x1 = centerX + pitchR * Math.cos(angle);
      const y1 = centerY + pitchR * Math.sin(angle);
      const x2 = centerX + outerR * Math.cos(angle);
      const y2 = centerY + outerR * Math.sin(angle);
      
      toothElements.push(
        <path
          key={`tooth-${i}`}
          d={`M ${x1} ${y1} L ${x2} ${y2}`}
          stroke={TOOTH_COLOR}
          strokeWidth="1.5"
        />
      );
    }

    // Размерные линии
    const dimLines = [
      {
        x1: centerX - pitchR - 30, y1: centerY,
        x2: centerX + pitchR + 30, y2: centerY,
        text: `Ø${results.pitchDiameter.toFixed(1)}mm`,
        textPos: { x: centerX, y: centerY - 20 }
      },
      {
        x1: centerX - outerR - 15, y1: centerY + 40,
        x2: centerX + outerR + 15, y2: centerY + 40,
        text: `Ø${results.outerDiameter.toFixed(1)}mm`,
        textPos: { x: centerX, y: centerY + 55 }
      }
    ];

    return (
      <svg 
        width={PULLEY_SVG_WIDTH} 
        height={PULLEY_SVG_HEIGHT} 
        viewBox={`0 0 ${PULLEY_SVG_WIDTH} ${PULLEY_SVG_HEIGHT}`}
        style={{ 
          border: `1px solid ${token.colorBorder}`, 
          borderRadius: 4,
          backgroundColor: token.colorFillAlter
        }}
      >
        <circle cx={centerX} cy={centerY} r={pitchR} fill="none" stroke="#1890ff" strokeWidth="1.5" />
        <circle cx={centerX} cy={centerY} r={outerR} fill="none" stroke="#1890ff" strokeWidth="1" strokeDasharray="4,4" />
        <circle cx={centerX} cy={centerY} r={pitchR*0.3} fill="none" stroke="#1890ff" strokeWidth="1" />
        {toothElements}
        {dimLines.map((line, i) => (
          <g key={`dim-${i}`}>
            <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#666" strokeWidth="1" />
            <path d={`M ${line.x1} ${line.y1-5} L ${line.x1} ${line.y1+5} M ${line.x2} ${line.y2-5} L ${line.x2} ${line.y2+5}`} stroke="#666" strokeWidth="1" />
            <text x={line.textPos.x} y={line.textPos.y} fill="#666" textAnchor="middle" fontSize="12">{line.text}</text>
          </g>
        ))}
        <text x={20} y={25} fill={token.colorText} fontSize="14">{`Шкив ${beltType}, ${teeth} зубьев`}</text>
      </svg>
    );
  };

  // Чертеж профиля зуба с фиксированными размерами
  const renderToothProfile = () => {
    if (!results) return null;
    
    const profile = beltProfiles[beltType];
    const centerX = TOOTH_SVG_WIDTH / 2;
    
    // Фиксированные размеры в пикселях (масштабируем пропорционально)
    const maxToothHeight = 80; // Максимальная высота зуба в пикселях
    const scale = maxToothHeight / profile.toothHeight;
    const toothH = profile.toothHeight * scale;
    const toothTop = profile.topWidth * scale;
    const toothBase = profile.baseWidth * scale;
    const angle = profile.angle || 40;

    // Точки профиля зуба (фиксированная позиция по Y)
    const points = [
      { x: centerX - toothBase/2, y: TOOTH_BASE_Y }, // Основание слева
      { x: centerX - toothTop/2, y: TOOTH_BASE_Y - toothH }, // Вершина слева
      { x: centerX + toothTop/2, y: TOOTH_BASE_Y - toothH }, // Вершина справа
      { x: centerX + toothBase/2, y: TOOTH_BASE_Y }  // Основание справа
    ];

    const toothPath = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y} Z`;

    // Размерные линии для зуба
    const toothDims = [
      // Высота зуба
      {
        x1: centerX + toothBase/2 + 20, y1: TOOTH_BASE_Y,
        x2: centerX + toothBase/2 + 20, y2: TOOTH_BASE_Y - toothH,
        text: `${profile.toothHeight.toFixed(2)}mm`
      },
      // Ширина вершины
      {
        x1: centerX - toothTop/2, y1: TOOTH_BASE_Y - toothH - 20,
        x2: centerX + toothTop/2, y2: TOOTH_BASE_Y - toothH - 20,
        text: `${profile.topWidth.toFixed(2)}mm`
      },
      // Ширина основания
      {
        x1: centerX - toothBase/2, y1: TOOTH_BASE_Y + 20,
        x2: centerX + toothBase/2, y2: TOOTH_BASE_Y + 20,
        text: `${profile.baseWidth.toFixed(2)}mm`
      },
      // Угол наклона
      {
        arc: {
          cx: centerX - toothBase/2,
          cy: TOOTH_BASE_Y,
          radius: 30,
          startAngle: 0,
          endAngle: -angle * Math.PI / 180
        },
        text: `${angle}°`
      }
    ];

    return (
      <svg 
        width={TOOTH_SVG_WIDTH} 
        height={TOOTH_SVG_HEIGHT} 
        viewBox={`0 0 ${TOOTH_SVG_WIDTH} ${TOOTH_SVG_HEIGHT}`}
        style={{ 
          border: `1px solid ${token.colorBorder}`, 
          borderRadius: 4,
          backgroundColor: token.colorFillAlter
        }}
      >
        {/* Опорная линия */}
        <line 
          x1={centerX - 150} y1={TOOTH_BASE_Y} 
          x2={centerX + 150} y2={TOOTH_BASE_Y} 
          stroke="#888" 
          strokeDasharray="5,5"
        />
        
        {/* Профиль зуба */}
        <path 
          d={toothPath} 
          fill="#e6f7ff" 
          stroke="#1890ff" 
          strokeWidth="2"
        />
        
        {/* Размерные линии */}
        {toothDims.map((dim, i) => {
          if (dim.arc) {
            const startX = dim.arc.cx + dim.arc.radius * Math.cos(dim.arc.startAngle);
            const startY = dim.arc.cy + dim.arc.radius * Math.sin(dim.arc.startAngle);
            const endX = dim.arc.cx + dim.arc.radius * Math.cos(dim.arc.endAngle);
            const endY = dim.arc.cy + dim.arc.radius * Math.sin(dim.arc.endAngle);
            
            return (
              <g key={`arc-${i}`}>
                <path d={`M ${dim.arc.cx},${dim.arc.cy} L ${startX},${startY}`} stroke="#666" strokeWidth="1"/>
                <path d={`M ${startX},${startY} A ${dim.arc.radius},${dim.arc.radius} 0 0 1 ${endX},${endY}`} stroke="#666" strokeWidth="1" fill="none"/>
                <path d={`M ${dim.arc.cx},${dim.arc.cy} L ${endX},${endY}`} stroke="#666" strokeWidth="1"/>
                <text 
                  x={dim.arc.cx + dim.arc.radius * 0.7 * Math.cos(dim.arc.endAngle/2)} 
                  y={dim.arc.cy + dim.arc.radius * 0.7 * Math.sin(dim.arc.endAngle/2)} 
                  fill="#666" fontSize="12"
                >
                  {dim.text}
                </text>
              </g>
            );
          } else {
            return (
              <g key={`dim-${i}`}>
                <line x1={dim.x1} y1={dim.y1} x2={dim.x2} y2={dim.y2} stroke="#666" strokeWidth="1"/>
                <path d={`M ${dim.x1} ${dim.y1-5} L ${dim.x1} ${dim.y1+5} M ${dim.x2} ${dim.y2-5} L ${dim.x2} ${dim.y2+5}`} stroke="#666" strokeWidth="1"/>
                <text x={(dim.x1 + dim.x2)/2} y={dim.y1 - (dim.y1 === dim.y2 ? 10 : 0)} fill="#666" fontSize="12" textAnchor="middle">
                  {dim.text}
                </text>
              </g>
            );
          }
        })}
        
        <text x={20} y={25} fill={token.colorText} fontSize="14">
          Профиль зуба {beltType}
        </text>
      </svg>
    );
  };

  return (
    <Card
      title="Расчёт зубчатых шкивов"
      style={{
        maxWidth: 1000,
        width: "100%",
        margin: "0 auto",
        backgroundColor: token.colorBgContainer,
        borderColor: token.colorBorder,
      }}
    >
      {/* Форма ввода */}
      <Row gutter={16}>
        <Col span={24}>
          <Text strong>Тип ремня</Text>
          <Select
            value={beltType}
            onChange={(value: BeltType) => setBeltType(value)}
            style={{ width: "100%" }}
          >
            {Object.keys(beltProfiles).map((type: string) => (
              <Option key={type} value={type}>
                {type} (шаг {beltProfiles[type as BeltType].pitch} мм)
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Divider />

      <Text strong>Количество зубьев</Text>
      <InputNumber
        min={8}
        max={200}
        value={teeth}
        onChange={(value: number | null) => setTeeth(value || 20)}
        style={{ width: "100%", marginBottom: 16 }}
      />

      <Button type="primary" onClick={handleCalculate} style={{ width: "100%" }}>
        Рассчитать
      </Button>

      {results && (
        <>
          <Divider />
          <Row gutter={24}>
            <Col span={12}>
              <Title level={4} style={{textAlign: 'center'}}>Общий вид шкива</Title>
              {renderPulleySchematic()}
            </Col>
            <Col span={12}>
              <Title level={4} style={{textAlign: 'center'}}>Профиль зуба</Title>
              {renderToothProfile()}
            </Col>
          </Row>
          
          <Divider />
          <Title level={4}>Параметры</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>Делительный диаметр:</Text> {results.pitchDiameter.toFixed(2)} мм<br />
              <Text strong>Внешний диаметр:</Text> {results.outerDiameter.toFixed(2)} мм<br />
              <Text strong>Шаг зуба:</Text> {beltProfiles[beltType].pitch} мм
            </Col>
            <Col span={12}>
              <Text strong>Высота зуба:</Text> {beltProfiles[beltType].toothHeight.toFixed(2)} мм<br />
              <Text strong>Ширина вершины:</Text> {beltProfiles[beltType].topWidth.toFixed(2)} мм<br />
              <Text strong>Ширина основания:</Text> {beltProfiles[beltType].baseWidth.toFixed(2)} мм
            </Col>
          </Row>
          
          <Divider />
          <Text strong>Рекомендации:</Text>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            margin: '8px 0',
            padding: '10px',
            backgroundColor: token.colorFillAlter,
            borderRadius: 4
          }}>
            {results.recommendation}
          </pre>
        </>
      )}
    </Card>
  );
};

export default PulleyCalculator;