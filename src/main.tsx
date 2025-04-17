import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import App from './App.tsx';
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ConfigProvider } from 'antd';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  // <ThemeProvider theme={theme}>
  //   <CssBaseline />

  // </ThemeProvider>
  // <Provider store={store}>
  //     <App />
  //   </Provider>
  <Provider store={store}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </Provider>
  // </StrictMode>,
)
