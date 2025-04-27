import React, { useState } from "react";
import { ConfigProvider, theme, App as AntdApp, Switch, Typography } from "antd";
import ruRU from "antd/locale/ru_RU";
import PulleyCalculator from "./components";
import "./App.css";
import { version } from '../package.json';

const { Text } = Typography;

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 4,
        },
        components: {
          Card: {
            headerBg: isDarkMode ? '#1d1d1d' : '#fafafa',
          },
        },
      }}
    >
      <AntdApp>
        <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
          <div className="theme-switch">
            <Switch
              checkedChildren="Тёмная"
              unCheckedChildren="Светлая"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <Text type="secondary" style={{ marginLeft: 10 }}>
              Версия: {version}
            </Text>
          </div>
          <PulleyCalculator />
        </div>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;