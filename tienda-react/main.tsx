// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Vistas Administrador
import Dashboard from "./src/pages/VistaAdministradorTsx/Dashboard";
import Categorias from "./src/pages/VistaAdministradorTsx/Categorias";
import Ordenes from "./src/pages/VistaAdministradorTsx/Ordenes";
import Productos from "./src/pages/VistaAdministradorTsx/Productos";
import Reportes from "./src/pages/VistaAdministradorTsx/Reportes";
import Perfil from "./src/pages/VistaAdministradorTsx/Perfil";
import Usuario from "./src/pages/VistaAdministradorTsx/Usuario";
import UsuarioNuevo from "./src/pages/VistaAdministradorTsx/UsuarioNuevo";
import ProductoNuevo from "./src/pages/VistaAdministradorTsx/ProductoNuevo";
import EditarUsuario from "./src/pages/VistaAdministradorTsx/EditarUsuario";

// Vistas Tienda
import Home from "./src/pages/Tienda/Home";
import Blog from "./src/pages/Tienda/Blog";
import Carrito from "./src/pages/Tienda/Carrito";
import Checkout from "./src/pages/Tienda/Checkout";
import Contacto from "./src/pages/Tienda/Contacto";
import ListaProducto from "./src/pages/Tienda/ListaProductos";
import LoginUser from "./src/pages/Tienda/LoginUser";
import Nosotros from "./src/pages/Tienda/Nosotros";
import Noticia1 from "./src/pages/Tienda/Noticia1";
import Noticia2 from "./src/pages/Tienda/Noticia2";
import UserRegister from "./src/pages/Tienda/UserRegistro";
import EditarProducto from "./src/pages/VistaAdministradorTsx/EditarProducto";

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
        <Route path="/producto-editar/:id" element={<EditarProducto />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
