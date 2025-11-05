import React, { useEffect, useState } from "react";
import "../../assets/CSS/VistaAdministradorTsxCSS/categorias.css";
import { obtenerProductos } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data";
import AdminSidebar from "../../components/administrador/AdminSidebar";

interface CategoriaContada {
  codigo: string;
  nombre: string;
  productos: number;
}

export default function Categorias() {
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
      <AdminSidebar />

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
