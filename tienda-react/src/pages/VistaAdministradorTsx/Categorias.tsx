import React, { useEffect, useState } from "react";
import "../../assets/CSS/VistaAdministradorTsxCSS/categorias.css";
import { obtenerProductos } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data";
import AdminLayout from "../../components/administrador/AdminLayout";

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
    <AdminLayout title="Vista Administrador - Categorías" activePage="categorias">
      <div className="table-responsive">
        {/* Usamos directamente nuestra clase .category-table sin bootstrap */}
        <table className="category-table">
          <thead>
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
    </AdminLayout>
  );
}