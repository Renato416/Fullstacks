import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import "../../assets/CSS/administrador/listado_usuario.css";

interface User {
  date: string;
  id: string;
  name: string;
  rol: string;
  telefono: string;
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const exampleUsers: User[] = [
      { date: "2024-06-01", id: "U001", name: "Arne Corporation", rol: "Administrador", telefono: "$2500.00" },
      { date: "2024-06-02", id: "U002", name: "Bravo Solutions", rol: "Usuario estándar", telefono: "$1200.00" },
      { date: "2024-06-03", id: "U003", name: "Derricks Workshop", rol: "Invitado", telefono: "$900.00" }
    ];

    const allUsers: User[] = [
      ...exampleUsers,
      ...storedUsers.map((u: any, index: number) => ({
        date: u.fecha,
        id: "U" + String(exampleUsers.length + index + 1).padStart(3, "0"),
        name: u.nombre,
        rol: u.rol,
        telefono: u.telefono || "---"
      }))
    ];
    setUsers(allUsers);
  }, []);

  const pageCount = Math.ceil(users.length / rowsPerPage);
  const displayedUsers = users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="product-list-container">
      <aside className="sidebar">
        <div className="logo">
          <img src="/VistaTienda/IMG/icon-level-up.png" alt="Logo" />
          <span>Level-Up</span>
        </div>
        <nav className="menu">
          <Link to="/">📊 Dashboard</Link>
          <Link to="/inventario">📦 Inventario</Link>
          <Link to="#">📑 Reportes</Link>
          <Link to="/usuarios" className="active">👨‍💼 Empleados</Link>
          <Link to="#">👥 Clientes</Link>
        </nav>
        <div className="bottom-menu">
          <Link to="#">⚙️ Configuración</Link>
          <Link to="#">🙍 Perfil</Link>
          <Link to="#">❓ Help</Link>
        </div>
        <div className="profile">
          <span>👤</span> Profile
        </div>
      </aside>

      <main className="main-content">
        <div className="main-header">
          <h1>Usuarios</h1>
          <Link to="/registrar-usuario">
            <button className="btn-nuevo">NUEVO USUARIO</button>
          </Link>
        </div>

        <div className="content-box">
          <table id="usersTable">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>ID Usuario</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.date}</td>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.rol}</td>
                  <td>{u.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>«</button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active" : ""}>{i + 1}</button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))} disabled={currentPage === pageCount}>»</button>
          </div>
        </div>
      </main>
    </div>
  );
};
