import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/usuario.css";
import AdminSidebar from "../../components/administrador/AdminSidebar";
import { UsuarioService } from "../../services/UsuarioService";

export default function Usuarios() {
  const navigate = useNavigate();

  const [listaUsuarios, setListaUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await UsuarioService.getAll();
      setListaUsuarios(data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const calcularEdad = (fecha: string) => {
    if (!fecha) return "N/A";
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return isNaN(edad) ? "N/A" : edad;
  };

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

          {loading && <p className="text-center mt-3">Cargando lista de usuarios...</p>}
          {error && <p className="text-center text-danger mt-3">{error}</p>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre Usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Edad</th>
                    <th>RUT</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listaUsuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.nombreUsuario}</td>
                      <td>{usuario.correoElectronico}</td>
                      <td>{usuario.rol}</td>
                      <td>{calcularEdad(usuario.fechaNacimiento)} años</td>
                      <td>{usuario.run || "-"}</td>
                      <td>{usuario.direccion || "-"}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => navigate(`/usuarios/editar/${usuario.id}`)}
                        >
                          Editar
                        </button>
                        <button className="btn btn-info btn-sm">
                          Historial
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}