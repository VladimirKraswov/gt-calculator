import React, { useEffect } from "react";
import { Card, Divider, Row, Col, Spin } from "antd";
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
  const [loading, setLoading] = React.useState<boolean>(false);

  // Функция расчета
  const calculateResults = () => {
    setLoading(true);
    try {
      const calc = calculatePulley(beltType, teeth);
      const rec = getToothRecommendation(beltType, teeth);
      setResults({ ...calc, recommendation: rec });
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Автоматический перерасчет при изменении параметров
  useEffect(() => {
    calculateResults();
  }, [beltType, teeth]);

  return (
    <Card 
      title="Расчёт зубчатых шкивов" 
      style={{ maxWidth: 1000, margin: "0 auto", background: token.colorBgContainer }}
    >
      <PulleyForm 
        beltType={beltType} 
        setBeltType={setBeltType} 
        teeth={teeth} 
        setTeeth={setTeeth} 
      />
      
      <Divider />
      
      <Spin spinning={loading}>
        {results && (
          <>
            <Row gutter={16} justify="space-around">
              <Col>
                <PulleySchematic beltType={beltType} teeth={teeth} results={results} />
              </Col>
              <Col>
                <ToothProfile beltType={beltType} />
              </Col>
            </Row>
            <Divider />
            <Results beltType={beltType} results={results} />
          </>
        )}
      </Spin>
    </Card>
  );
};

export default PulleyCalculator;