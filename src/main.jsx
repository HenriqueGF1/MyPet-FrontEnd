import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import Routes from "./routes/routes";

import { AuthProvider } from "../src/context/apiContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </AuthProvider>
);
