import React from "react";
import { Row, Col, Typography, Divider } from "antd";
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
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Делительный диаметр:</Text> {results.pitchDiameter.toFixed(2)} мм<br />
          <Text strong>Внешний диаметр:</Text> {results.outerDiameter.toFixed(2)} мм<br />
          <Text strong>Шаг:</Text> {profile.pitch} мм
        </Col>
        <Col span={12}>
          <Text strong>Высота зуба:</Text> {profile.toothHeight.toFixed(2)} мм<br />
          <Text strong>Ширина вершины:</Text> {profile.topWidth.toFixed(2)} мм<br />
          <Text strong>Ширина основания:</Text> {profile.baseWidth.toFixed(2)} мм
        </Col>
      </Row>
      <Divider />
      <Title level={4}>Рекомендации</Title>
      <pre style={{ background: token.colorFillAlter, padding: 12, borderRadius: 4 }}>
        {results.recommendation}
      </pre>
    </>
  );
};

export default Results;
