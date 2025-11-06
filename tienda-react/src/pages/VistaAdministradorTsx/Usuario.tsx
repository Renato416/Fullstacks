import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/usuario.css";
import AdminSidebar from "../../components/administrador/AdminSidebar";
import { usuarios } from "../../assets/data/data.ts";

export default function Usuarios() {
  const navigate = useNavigate();

  return (
    <div className="admin-app">
      <AdminSidebar activePage="usuarios" />

      <main className="main">
        <header className="topbar">
          <h1>Vista Administrador - Usuarios</h1>
        </header>

        <section className="content">
          <div className="button-container">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/usuarios-nuevo")}
            >
              Agregar Usuario
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-striped user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Edad</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.edad}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.direccion}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          navigate(`/usuarios/editar/${usuario.id}`)
                        }
                      >
                        Editar
                      </button>
                      <button className="btn btn-info btn-sm">
                        Ver Historial
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
