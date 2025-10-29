import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeAdmin } from "./pages/administrador/HomeAdmin";
import { ProductList } from "./pages/administrador/ProductList"; // asegúrate que el archivo exista
import "./assets/CSS/administrador/home_admin.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeAdmin />} />
        <Route path="/inventario" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
