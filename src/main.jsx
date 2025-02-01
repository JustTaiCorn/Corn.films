//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import store from './redux/store.js';
import Falling from "falling";
// import { Analytics } from "@vercel/analytics/react"
createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <Provider store={store}>
    {/* <Falling
      flowerCount={70}
      flowerImage="https://emojicdn.elk.sh/🌸"
      fallSpeed={-1}
      spreadWidth={4000}
      spreadHeight={2000}
      colors={["#FFF3C7", "#FEC7B4", "#FC819E", "#F7418F", "#FF8787", "#D80032"]}
    /> */}
    <App />
  </Provider>
  //</StrictMode>,
)
