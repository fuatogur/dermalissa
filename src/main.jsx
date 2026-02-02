import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App.jsx";

const favicon = document.getElementById("favicon");
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function updateFavicon(e) {
  favicon.href = e.matches ? "/favicon-light.svg" : "/favicon-dark.svg";
}

updateFavicon(darkQuery);
darkQuery.addEventListener("change", updateFavicon);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
