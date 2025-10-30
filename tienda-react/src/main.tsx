// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Vistas Administrador
import Dashboard from "./pages/VistaAdministradorTsx/Dashboard";
import Categorias from "./pages/VistaAdministradorTsx/Categorias";
import Ordenes from "./pages/VistaAdministradorTsx/Ordenes";
import Productos from "./pages/VistaAdministradorTsx/Productos";
import Reportes from "./pages/VistaAdministradorTsx/Reportes";
import Perfil from "./pages/VistaAdministradorTsx/Perfil";
import Usuario from "./pages/VistaAdministradorTsx/Usuario";
import UsuarioNuevo from "./pages/VistaAdministradorTsx/UsuarioNuevo";
import ProductoNuevo from "./pages/VistaAdministradorTsx/ProductoNuevo";
import EditarUsuario from "./pages/VistaAdministradorTsx/EditarUsuario";

// Vistas Tienda
import Home from "./pages/Tienda/Home";
import Blog from "./pages/Tienda/Blog";
import Carrito from "./pages/Tienda/Carrito";
import Checkout from "./pages/Tienda/Checkout";
import Contacto from "./pages/Tienda/Contacto";
import ListaProducto from "./pages/Tienda/ListaProductos";
import LoginUser from "./pages/Tienda/LoginUser";
import Nosotros from "./pages/Tienda/Nosotros";
import Noticia1 from "./pages/Tienda/Noticia1";
import Noticia2 from "./pages/Tienda/Noticia2";
import UserRegister from "./pages/Tienda/UserRegistro";

// Renderizado principal
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta por defecto */}
        <Route path="/" element={<Home />} />

        {/* --- VISTAS ADMINISTRADOR --- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ordenes" element={<Ordenes />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/usuarios" element={<Usuario />} />
        <Route path="/usuarios-nuevo" element={<UsuarioNuevo />} />
        <Route path="/producto-nuevo" element={<ProductoNuevo />} />
        <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />

        {/* --- VISTAS TIENDA --- */}
        <Route path="/tienda" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/carrito_compras" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/listaproductos" element={<ListaProducto />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/noticia1" element={<Noticia1 />} />
        <Route path="/noticia2" element={<Noticia2 />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
