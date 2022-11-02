import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AllUsers } from "./components/AllUsers/AllUsers";
import { Repos } from "./components/Repos/Repos";
import { Issue } from "./components/Issue/Issue";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
