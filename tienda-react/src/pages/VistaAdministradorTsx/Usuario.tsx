import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/usuario.css";
import AdminLayout from "../../components/administrador/AdminLayout";
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
    <AdminLayout title="Vista Administrador - Usuarios" activePage="usuarios">
      {/* CORRECCIÓN: Este div asegura que los elementos se apilen verticalmente */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        
        {/* Contenedor del botón alineado a la derecha */}
        <div className="button-wrapper">
          <button
            className="btn-add-user"
            onClick={() => navigate("/usuarios-nuevo")}
          >
            Agregar Usuario
          </button>
        </div>

        {loading && <p className="text-center mt-3">Cargando lista de usuarios...</p>}
        {error && <p className="text-center text-danger mt-3">{error}</p>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="user-table">
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
                        className="btn-edit-user"
                        onClick={() => navigate(`/usuarios/editar/${usuario.id}`)}
                      >
                        Editar
                      </button>
                      <button className="btn-history-user">
                        Historial
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}