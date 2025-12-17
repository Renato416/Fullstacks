import React from "react";
import "../../assets/CSS/VistaAdministradorTsxCSS/admin-layout.css";
import AdminSidebar from "./AdminSidebar"; // Importamos el componente unificado

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
  activePage: string;
}

export default function AdminLayout({ title, children, activePage }: AdminLayoutProps) {
  return (
    <div className="admin-app">
      {/* Usamos el componente Sidebar limpio */}
      <AdminSidebar activePage={activePage} />

      <main className="main">
        <header className="topbar">
          <h1>{title}</h1>
        </header>
        
        {/* QUITAMOS la clase 'container' para que ocupe todo el ancho disponible */}
        <section className="content mt-4">
            {children}
        </section>
      </main>
    </div>
  );
}