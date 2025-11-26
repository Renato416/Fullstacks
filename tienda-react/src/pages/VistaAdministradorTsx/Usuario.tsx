import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/usuario.css";
import AdminSidebar from "../../components/administrador/AdminSidebar";
// 1. Importamos el servicio real para conectar con el Backend
import { UsuarioService } from "../../services/UsuarioService.ts";

export default function Usuarios() {
  const navigate = useNavigate();

  // 2. Estados para manejar la lista real, la carga y errores
  const [listaUsuarios, setListaUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 3. useEffect: Carga los usuarios cuando se entra a la página
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      // Llamada al endpoint GET /api/v2/auth/listar
      const data = await UsuarioService.getAll();
      setListaUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setError("No se pudo conectar con el servidor para obtener los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Función auxiliar para calcular la edad desde la fecha de nacimiento (YYYY-MM-DD)
  const calcularEdad = (fechaNacimiento: string) => {
    if (!fechaNacimiento) return "N/A";
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    // Ajustar si aún no ha cumplido años este mes
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
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

          {/* 5. Mensajes de Estado */}
          {loading && <p className="text-center mt-3">Cargando lista de usuarios...</p>}
          {error && <p className="text-center text-danger mt-3">{error}</p>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre Usuario</th> {/* Actualizado */}
                    <th>Email</th>
                    <th>Edad</th>
                    <th>RUT</th> {/* Cambiado de Teléfono a RUT (según tu Backend) */}
                    <th>Dirección</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listaUsuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      {/* Mapeo de campos del Backend (UsuarioDTO) */}
                      <td>{usuario.nombreUsuario}</td>
                      <td>{usuario.correoElectronico}</td>
                      <td>{calcularEdad(usuario.fechaNacimiento)}</td>
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
                          Ver Historial
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