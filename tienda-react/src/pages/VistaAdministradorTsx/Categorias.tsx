import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/categorias.css";
import Logo from "../../assets/IMG/icon-level-up.png";
import { obtenerProductos } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data";

interface CategoriaContada {
  codigo: string;
  nombre: string;
  productos: number;
}

export default function Categorias() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<CategoriaContada[]>([]);

  useEffect(() => {
    const productos: Producto[] = obtenerProductos();

    const conteo = productos.reduce<Record<string, number>>((acc, prod) => {
      acc[prod.categoria] = (acc[prod.categoria] || 0) + 1;
      return acc;
    }, {});

    const categoriasCalculadas: CategoriaContada[] = Object.entries(conteo).map(
      ([nombre, cantidad], i) => ({
        codigo: `CAT${i + 1}`,
        nombre,
        productos: cantidad,
      })
    );

    setCategorias(categoriasCalculadas);
  }, []);

  return (
    <div className="admin-app container-fluid">
      <aside className="sidebar">
        <div className="brand">
          <Link to="/dashboard">
            <img src={Logo} alt="Logo" className="logo img-fluid" />
          </Link>
          <div className="brand-text">
            <div className="title">Level-Up Gamer</div>
          </div>
        </div>

        <nav className="nav flex-column">
          <Link className="nav-item nav-link" to="/dashboard">Dashboard</Link>
          <Link className="nav-item nav-link" to="/ordenes">Órdenes</Link>
          <Link className="nav-item nav-link" to="/productos">Productos</Link>
          <Link className="nav-item nav-link active" to="/categorias">Categorías</Link>
          <Link className="nav-item nav-link" to="/usuarios">Usuarios</Link>
          <Link className="nav-item nav-link" to="/reportes">Reportes</Link>
        </nav>

        <div className="sidebar-foot mt-auto">
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              localStorage.removeItem("usuarioActivo");
              navigate("/");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar mb-3">
          <h1>Vista Administrador - Categorías</h1>
        </header>

        <section className="content">
          <div className="table-responsive">
            <table className="table table-striped category-table">
              <thead className="thead-dark">
                <tr>
                  <th>Código</th>
                  <th>Nombre de Categoría</th>
                  <th>Número de Productos</th>
                </tr>
              </thead>
              <tbody>
                {categorias.length > 0 ? (
                  categorias.map((cat) => (
                    <tr key={cat.codigo}>
                      <td>{cat.codigo}</td>
                      <td>{cat.nombre}</td>
                      <td>{cat.productos}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No hay categorías registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
