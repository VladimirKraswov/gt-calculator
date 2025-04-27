import React from "react";
import { Card, Button, Divider, Row, Col } from "antd";
import { useTheme } from "antd-style";
import PulleyForm from "./PulleyForm";
import PulleySchematic from "./PulleySchematic";
import ToothProfile from "./ToothProfile";
import Results from "./Results";
import { calculatePulley, getToothRecommendation } from "../utils/calculations";
import type { BeltType } from "../types";

const PulleyCalculator: React.FC = () => {
  const token = useTheme();
  const [beltType, setBeltType] = React.useState<BeltType>("GT2");
  const [teeth, setTeeth] = React.useState<number>(20);
  const [results, setResults] = React.useState<any>(null);

  const handleCalculate = () => {
    const calc = calculatePulley(beltType, teeth);
    const rec = getToothRecommendation(beltType, teeth);
    setResults({ ...calc, recommendation: rec });
  };

  return (
    <Card title="Расчёт зубчатых шкивов" style={{ maxWidth: 1000, margin: "0 auto", background: token.colorBgContainer }}>
      <PulleyForm beltType={beltType} setBeltType={setBeltType} teeth={teeth} setTeeth={setTeeth} />
      <Divider />
      <Button type="primary" block onClick={handleCalculate}>Рассчитать</Button>

      {results && (
        <>
          <Divider />
          <Row gutter={16} justify="space-around">
            <Col><PulleySchematic beltType={beltType} teeth={teeth} results={results} /></Col>
            <Col><ToothProfile beltType={beltType} /></Col>
          </Row>
          <Divider />
          <Results beltType={beltType} results={results} />
        </>
      )}
    </Card>
  );
};

export default PulleyCalculator;
