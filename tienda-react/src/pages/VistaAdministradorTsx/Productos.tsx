import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/productos.css";
import "../../assets/CSS/VistaAdministradorTsxCSS/admin-layout.css";
import AdminSidebar from "../../components/administrador/AdminSidebar";

// 1. Usamos el servicio real
import { ProductoService } from "../../services/ProductoService";

export default function Productos() {
  const navigate = useNavigate();
  // 2. Estado para los productos del backend
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. Cargar al iniciar
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await ProductoService.getAll();

      // AJUSTE DE MAPEO: Adaptamos los nombres del Backend a lo que usa tu tabla
      const dataMapeada = data.map((p: any) => ({
        ...p,
        id: String(p.id),
        // Backend devuelve "imagenUrl", frontend usa "imagen"
        imagen: p.imagenUrl || p.imagen,
        // Backend devuelve "nombreCategoria", frontend usa "categoria"
        categoria: p.nombreCategoria || p.categoria,
      }));

      // CORRECCIÓN: Usamos setProductos correctamente (reemplazando el estado)
      setProductos(dataMapeada);
    } catch (error) {
      console.error("Error cargando productos:", error);
      alert("No se pudo cargar el catálogo.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Eliminar Producto REAL
  const handleEliminar = async (id: string) => {
    if (
      window.confirm(
        "¿Estás seguro de eliminar este producto de la Base de Datos?"
      )
    ) {
      try {
        await ProductoService.delete(id); // Llamada al backend

        // Recargamos la lista para ver el cambio
        cargarProductos();
        alert("Producto eliminado correctamente.");
      } catch (error) {
        console.error("Error eliminando:", error);
        alert("Hubo un error al eliminar el producto.");
      }
    }
  };

  return (
    <div className="admin-app">
      <AdminSidebar activePage="productos" />
      <main className="main">
        <header className="topbar">
          <h1>Vista Administrador - Productos</h1>
        </header>

        <div className="table-wrapper mb-3 d-flex justify-content-end">
          <button
            className="btn-add-user"
            onClick={() => navigate("/producto-nuevo")}
          >
            Agregar Producto
          </button>
        </div>

        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Categoría</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.categoria}</td>
                    <td>
                      <img
                        src={prod.imagen}
                        alt={prod.nombre}
                        className="mini-img"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/50?text=X";
                        }}
                      />
                    </td>
                    <td>{prod.nombre}</td>
                    <td>${prod.precio.toLocaleString()} CLP</td>
                    <td className="d-flex gap-2 flex-wrap">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/producto-editar/${prod.id}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleEliminar(prod.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
