import React, { useState, useEffect } from "react";
import { ConfigProvider, theme, App as AntdApp, Switch, Typography, Layout } from "antd";
import ruRU from "antd/locale/ru_RU";
import PulleyCalculator from "./components";
import "./App.css";
import { version } from '../package.json';

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('themePreference');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('themePreference', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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
          Layout: {
            headerBg: isDarkMode ? '#1d1d1d' : '#001529',
            bodyBg: isDarkMode ? '#141414' : '#f5f5f5',
          },
        },
      }}
    >
      <AntdApp>
        <Layout className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
          <Header style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '0 24px'
          }}>
            <Title level={3} style={{ color: 'white', margin: 0 }}>
              Калькулятор шкивов
            </Title>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text style={{ color: 'white', marginRight: 16 }}>Тема:</Text>
              <Switch
                checkedChildren="Тёмная"
                unCheckedChildren="Светлая"
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
              />
            </div>
          </Header>
          
          <Content style={{ 
            padding: '24px', 
            minHeight: 'calc(100vh - 128px)',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
          }}>
            <PulleyCalculator />
          </Content>
          
          <Footer style={{ 
            textAlign: 'center',
            backgroundColor: isDarkMode ? '#1d1d1d' : '#f0f2f5',
            borderTop: `1px solid ${isDarkMode ? '#303030' : '#d9d9d9'}`
          }}>
            <Text type="secondary">
              Версия: {version} | © {new Date().getFullYear()} Красов В. А.
            </Text>
          </Footer>
        </Layout>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;