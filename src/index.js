import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Header.css";
import "./App.css";
import "./Main.css";
import "./Scores.css";
import "./Landing.css";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);