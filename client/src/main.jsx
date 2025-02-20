//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import store from './redux/store.js';
createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <Provider store={store}>

    <App />
  </Provider>
  //</StrictMode>,
)
