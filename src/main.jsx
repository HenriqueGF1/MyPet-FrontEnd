import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import Routes from "./routes/routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "../src/context/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="form-group">
    <AuthProvider>
      <React.StrictMode>
        <>
          <ToastContainer icon={'🐾'} theme="dark" limit={1} />
          <Routes />
        </>
      </React.StrictMode>
    </AuthProvider>
  </div>

);
