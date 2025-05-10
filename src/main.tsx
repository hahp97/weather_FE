import { checkApiKey } from "@/config/env";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Check if API key is configured
checkApiKey();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
