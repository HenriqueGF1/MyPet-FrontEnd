import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes/routes";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "../src/context/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="w-[95%] lg:w-[70%] mx-auto">
    <AuthProvider>
      <React.StrictMode>
        <>
          <ToastContainer
            icon={"🐾"}
            theme="dark"
            limit={1}
            autoClose={1500}
            position="top-right"
          />
          <Routes />
        </>
      </React.StrictMode>
    </AuthProvider>
  </div>
);
