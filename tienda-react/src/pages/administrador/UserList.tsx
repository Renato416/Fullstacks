import React, { useState, useEffect } from "react";
import "../../assets/css/administrador/listado_usuario.css"; // Ajusta la ruta según tu estructura

interface User {
  date: string;
  id: string;
  name: string;
  status: string;
  amount: string;
}

const ListadoUsuarios: React.FC = () => {
  const [users] = useState<User[]>([
    {
      date: "2024-06-01",
      id: "U001",
      name: "Arne Corporation",
      status: "Shipped",
      amount: "$2500.00",
    },
    {
      date: "2024-06-02",
      id: "U002",
      name: "Bravo Solutions",
      status: "Pending",
      amount: "$1200.00",
    },
    {
      date: "2024-06-03",
      id: "U003",
      name: "Derricks Workshop",
      status: "Canceled",
      amount: "$900.00",
    },
    {
      date: "2024-06-04",
      id: "U004",
      name: "Delta Markt",
      status: "Processing",
      amount: "$1500.00",
    },
    {
      date: "2024-06-05",
      id: "U005",
      name: "Echo Enterprises",
      status: "Shipped",
      amount: "$3200.00",
    },
    {
      date: "2024-06-06",
      id: "U006",
      name: "Fastel Media",
      status: "Pending",
      amount: "$2100.00",
    },
    {
      date: "2024-06-07",
      id: "U007",
      name: "Get Goods Inc.",
      status: "Processing",
      amount: "$1900.00",
    },
    {
      date: "2024-06-08",
      id: "U008",
      name: "Indi IT Solutions",
      status: "Canceled",
      amount: "$850.00",
    },
    {
      date: "2024-06-09",
      id: "U009",
      name: "Juliett Services",
      status: "Shipped",
      amount: "$2600.00",
    },
    {
      date: "2024-06-10",
      id: "U010",
      name: "Kilo Real Group",
      status: "Processing",
      amount: "$1750.00",
    },
    {
      date: "2024-06-11",
      id: "U011",
      name: "Lima Landscaping",
      status: "Shipped",
      amount: "$490.00",
    },
    {
      date: "2024-06-12",
      id: "U012",
      name: "November Nightlife",
      status: "Canceled",
      amount: "$1210.00",
    },
  ]);

  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);

  useEffect(() => {
    const updateCurrentUsers = () => {
      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      setCurrentUsers(users.slice(start, end));
    };
    updateCurrentUsers();
  }, [currentPage, users]);

  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <div className="user-list-container">
      <aside className="sidebar">
        <h2>Company</h2>
        <ul>
          <li>
            <a href="Home_ad.html">Dashboard</a>
          </li>
          <li>
            <a href="#" className="active">
              Usuarios
            </a>
          </li>
          <li>
            <a href="#">Inventario</a>
          </li>
          <li>
            <a href="#">Reportes</a>
          </li>
          <li>
            <a href="#">Empleados</a>
          </li>
          <li>
            <a href="#">Clientes</a>
          </li>
        </ul>
      </aside>

      <main className="main">
        <div className="header">
          <h1>Usuarios</h1>
          <button className="btn-nuevo">NUEVO USUARIO</button>
        </div>

        <table id="usersTable">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>ID Usuario</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.date}</td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.status}</td>
                <td>{user.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            «
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            »
          </button>
        </div>
      </main>
    </div>
  );
};

export default ListadoUsuarios;
