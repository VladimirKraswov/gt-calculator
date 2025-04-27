import React from "react";
import { Row, Col, Select, InputNumber, Typography } from "antd";
import { beltProfiles, t5StandardSpecs } from "../utils/constants"; // подключаем стандартные размеры
import type { BeltType } from "../types";

const { Text } = Typography;
const { Option } = Select;

interface Props {
  beltType: BeltType;
  setBeltType: (type: BeltType) => void;
  teeth: number;
  setTeeth: (teeth: number) => void;
}

const PulleyForm: React.FC<Props> = ({ beltType, setBeltType, teeth, setTeeth }) => {
  // Стандарты для выбранного типа ремня
  const availableStandards = Object.values(t5StandardSpecs)
    .filter(spec => spec && spec.teeth && beltType === "T5") // Пока что только для T5 поддержка стандартов
    .map(spec => spec.teeth)
    .sort((a, b) => a - b);

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Text strong>Тип ремня</Text>
        <Select
          value={beltType}
          onChange={(v) => setBeltType(v)}
          style={{ width: "100%" }}
        >
          {Object.entries(beltProfiles).map(([type, prof]) => (
            <Option key={type} value={type}>
              {`${type} (шаг ${prof.pitch} мм)`}
            </Option>
          ))}
        </Select>
      </Col>

      <Col span={12}>
        <Text strong>Число зубьев</Text>
        {availableStandards.length > 0 ? (
          <Select
            value={teeth}
            onChange={(v) => setTeeth(v)}
            style={{ width: "100%" }}
            options={availableStandards.map(teethCount => ({
              label: `${teethCount} зубьев`,
              value: teethCount
            }))}
          />
        ) : (
          <InputNumber
            min={8}
            max={200}
            value={teeth}
            onChange={(v) => setTeeth(v || 20)}
            style={{ width: "100%" }}
          />
        )}
      </Col>
    </Row>
  );
};

export default PulleyForm;
