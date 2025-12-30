import { StrictMode } from 'react'
import './index.css';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { ThemeProvider } from './components/ui/theme-provider.jsx';
import store from './redux/store.js';
createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
)
