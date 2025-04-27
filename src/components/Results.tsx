import React from "react";
import { Row, Col, Typography, Divider, Tag, Tooltip } from "antd";
import { useTheme } from "antd-style";
import { beltProfiles } from "../utils/constants";
import { InfoCircleOutlined } from "@ant-design/icons"; // Иконка вопросика
import type { BeltType } from "../types";

const { Title, Text } = Typography;

interface Props {
  beltType: BeltType;
  results: any;
}

const QuestionTooltip: React.FC<{ title: string }> = ({ title }) => (
  <Tooltip title={title}>
    <InfoCircleOutlined style={{ marginLeft: 6, color: "#888" }} />
  </Tooltip>
);

const Results: React.FC<Props> = ({ beltType, results }) => {
  const token = useTheme();
  const profile = beltProfiles[beltType];

  return (
    <>
      <Title level={4}>Параметры</Title>

      <Tooltip title={results.isStandard ? "Размер соответствует промышленному стандарту" : "Размеры рассчитаны автоматически по профилю"}>
        <Tag color={results.isStandard ? "green" : "blue"} style={{ marginBottom: 12, cursor: "pointer" }}>
          {results.isStandard ? "Стандартный шкив" : "Расчётные размеры"}
        </Tag>
      </Tooltip>

      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Делительный диаметр (P.D.): </Text>
           {results.pitchDiameter.toFixed(3)} мм <QuestionTooltip title="Диаметр по центрам зубьев" /><br />

          <Text strong>Внешний диаметр (O.D.): </Text>
           {results.outerDiameter.toFixed(3)} мм <QuestionTooltip title="Максимальный внешний диаметр шкива" /><br />

          <Text strong>Корневой диаметр (Root D.): </Text>
          {results.rootDiameter.toFixed(3)} мм <QuestionTooltip title="Диаметр до дна канавок между зубьями" /> <br />

          <Text strong>Шаг ремня: </Text>
          {profile.pitch.toFixed(2)} мм <QuestionTooltip title="Шаг между зубьями по окружности" /> 
        </Col>

        <Col span={12}>
          <Text strong>Высота зуба: </Text>
          {profile.toothHeight.toFixed(2)} мм <QuestionTooltip title="Высота зуба от основания до вершины" /> <br />

          <Text strong>Глубина канавки: </Text>
          {profile.toothDepth?.toFixed(2)} мм <QuestionTooltip title="Глубина канавки между зубьями" /> <br />

          <Text strong>Ширина вершины зуба: </Text>
          {profile.topWidth.toFixed(2)} мм <QuestionTooltip title="Ширина зуба в самом узком месте (на вершине)" /> <br />

          <Text strong>Ширина основания зуба: </Text>
           {profile.baseWidth.toFixed(2)} мм <QuestionTooltip title="Ширина зуба у основания" />
        </Col>
      </Row>

      <Divider />

      <Title level={4}>Рекомендации</Title>
      <pre style={{
        background: token.colorFillAlter,
        padding: 12,
        borderRadius: 4,
        whiteSpace: "pre-wrap",
        fontFamily: "inherit",
      }}>
        {results.recommendation}
      </pre>
    </>
  );
};

export default Results;
