import React from "react";
import * as ReactDOMClient from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
  // document.getElementById("root")
);
