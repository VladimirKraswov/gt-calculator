import React from "react";
import { Row, Col, Typography, Divider, Tag } from "antd";
import { useTheme } from "antd-style";
import { beltProfiles } from "../utils/constants";
import type { BeltType } from "../types";

const { Title, Text } = Typography;

interface Props {
  beltType: BeltType;
  results: any;
}

const Results: React.FC<Props> = ({ beltType, results }) => {
  const token = useTheme();
  const profile = beltProfiles[beltType];

  return (
    <>
      <Title level={4}>Параметры</Title>

      {/* Статус: стандартный или расчётный */}
      {results.isStandard ? (
        <Tag color="green" style={{ marginBottom: 12 }}>
          Стандартный шкив
        </Tag>
      ) : (
        <Tag color="blue" style={{ marginBottom: 12 }}>
          Расчётные размеры
        </Tag>
      )}

      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Делительный диаметр (P.D.):</Text> {results.pitchDiameter.toFixed(3)} мм<br />
          <Text strong>Внешний диаметр (O.D.):</Text> {results.outerDiameter.toFixed(3)} мм<br />
          <Text strong>Корневой диаметр (Root D.):</Text> {results.rootDiameter.toFixed(3)} мм<br />
          <Text strong>Шаг ремня:</Text> {profile.pitch.toFixed(2)} мм
        </Col>
        <Col span={12}>
          <Text strong>Высота зуба:</Text> {profile.toothHeight.toFixed(2)} мм<br />
          <Text strong>Глубина канавки:</Text> {profile.toothDepth?.toFixed(2)} мм<br />
          <Text strong>Ширина вершины зуба:</Text> {profile.topWidth.toFixed(2)} мм<br />
          <Text strong>Ширина основания зуба:</Text> {profile.baseWidth.toFixed(2)} мм
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
