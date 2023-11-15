import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import Routes from "./routes/routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "../src/context/apiContext";
import Teste from "./pages/Teste";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    {/* <React.StrictMode> */}
      <>
      <ToastContainer icon={'🐾'} theme="dark"/>
      <Routes />
      
      </>
      {/* <Teste/> */}
    {/* </React.StrictMode> */}
  </AuthProvider>
);
