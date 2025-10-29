import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar todas las vistas
import Dashboard from "./pages/VistaAdministradorTsx/Dashboard";
import Categorias from "./pages/VistaAdministradorTsx/Categorias";
import Ordenes from "./pages/VistaAdministradorTsx/Ordenes";
import Productos from "./pages/VistaAdministradorTsx/Productos";
import Reportes from "./pages/VistaAdministradorTsx/Reportes";
import Perfil from "./pages/VistaAdministradorTsx/Perfil";
import Usuario from "./pages/VistaAdministradorTsx/Usuario";
import UsuarioNuevo from "./pages/VistaAdministradorTsx/UsuarioNuevo";
// main.tsx o index.tsx donde defines las rutas
import EditarUsuario from "./pages/VistaAdministradorTsx/EditarUsuario"; 


// Renderizado principal
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ordenes" element={<Ordenes />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/usuarios" element={<Usuario />} />
        <Route path="/usuarios-nuevo" element={<UsuarioNuevo />} />
        <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
