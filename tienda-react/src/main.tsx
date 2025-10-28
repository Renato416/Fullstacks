import React from "react";
import ReactDOM from "react-dom/client";
import { HomeAdmin } from "./pages/administrador/HomeAdmin";
import "./assets/CSS/administrador/home_admin.css";
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HomeAdmin />
  </React.StrictMode>
);
