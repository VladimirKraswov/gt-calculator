import React from "react";
import { Row, Col, Select, InputNumber, Typography, Radio, Card, Space } from "antd";
import { beltProfiles, standardPulleySpecs } from "../utils/constants";
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
  const [useStandard, setUseStandard] = React.useState(true);

  const availableStandards = Object.entries(standardPulleySpecs)
    .filter(([key]) => key.startsWith(beltType))
    .map(([_, spec]) => spec.teeth)
    .filter((teeth, index, self) => self.indexOf(teeth) === index)
    .sort((a, b) => a - b);

  const hasStandards = availableStandards.length > 0;

  React.useEffect(() => {
    setUseStandard(hasStandards);
  }, [beltType, hasStandards]);

  return (
    <Card 
      title="Параметры шкива" 
      bordered={false}
      headStyle={{ border: 'none', paddingBottom: 0 }}
      bodyStyle={{ paddingTop: 12 }}
    >
      <Row gutter={[24, 16]}>
        <Col span={24} md={12}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>Тип ремня</Text>
            <Select
              value={beltType}
              onChange={setBeltType}
              style={{ width: "100%" }}
              size="large"
              dropdownStyle={{ borderRadius: 8 }}
            >
              {Object.entries(beltProfiles).map(([type, prof]) => (
                <Option key={type} value={type}>
                  <Text strong>{type}</Text>
                  <Text type="secondary" style={{ marginLeft: 8 }}>шаг {prof.pitch} мм</Text>
                </Option>
              ))}
            </Select>
          </Space>
        </Col>

        <Col span={24} md={12}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>Число зубьев</Text>
            
            {hasStandards && (
              <Radio.Group
                value={useStandard ? "standard" : "manual"}
                onChange={(e) => setUseStandard(e.target.value === "standard")}
                optionType="button"
                buttonStyle="solid"
                size="middle"
                style={{ width: '100%', display: 'flex' }}
              >
                <Radio.Button value="standard" style={{ flex: 1, textAlign: 'center' }}>Стандартные</Radio.Button>
                <Radio.Button value="manual" style={{ flex: 1, textAlign: 'center' }}>Вручную</Radio.Button>
              </Radio.Group>
            )}

            <div style={{ marginTop: hasStandards ? 8 : 0 }}>
              {useStandard && hasStandards ? (
                <Select
                  value={teeth}
                  onChange={setTeeth}
                  style={{ width: "100%" }}
                  size="large"
                  dropdownStyle={{ borderRadius: 8 }}
                  options={availableStandards.map(teethCount => ({
                    label: (
                      <span>
                        <Text strong>{teethCount}</Text>
                        <Text type="secondary"> зубьев</Text>
                      </span>
                    ),
                    value: teethCount,
                  }))}
                />
              ) : (
                <InputNumber
                  min={8}
                  max={200}
                  value={teeth}
                  onChange={(v) => setTeeth(v || 20)}
                  style={{ width: "100%" }}
                  size="large"
                  addonAfter="зубьев"
                />
              )}
            </div>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default PulleyForm;