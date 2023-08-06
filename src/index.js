import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Providers from "./components/global/Providers";
import "./styles/font.css";
import GlobalStyle from "./styles/global.styles";
import "./styles/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Providers>
    <GlobalStyle />
    <App />
  </Providers>
);
