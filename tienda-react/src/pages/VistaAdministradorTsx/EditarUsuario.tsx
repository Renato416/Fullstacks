import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/usuario.css";
import Logo from "../../assets/IMG/icon-level-up.png";

// 1. Importamos el servicio real
import { UsuarioService } from "../../services/UsuarioService";

export default function EditarUsuario() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 

  // Estados del formulario (Adaptados al Backend)
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(""); // Backend usa fecha
  const [rut, setRut] = useState(""); // Backend usa RUN/RUT
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState(""); // Opcional para cambio de clave

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 2. Cargar datos del usuario desde la BD al iniciar
  useEffect(() => {
    if (id) {
      cargarUsuario(id);
    }
  }, [id]);

  const cargarUsuario = async (userId: string) => {
    try {
      setLoading(true);
      const data = await UsuarioService.getById(userId);
      
      // Llenamos el formulario con los datos reales
      // (Mapeamos los nombres del DTO Java a los estados de React)
      setNombre(data.nombreUsuario);
      setEmail(data.correoElectronico);
      setFechaNacimiento(data.fechaNacimiento);
      setRut(data.run);
      setDireccion(data.direccion);
      
    } catch (err) {
      console.error("Error obteniendo usuario:", err);
      alert("No se pudo cargar el usuario. Puede que no exista.");
      navigate("/usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!nombre || !email || !fechaNacimiento || !rut || !direccion) {
      setError("Todos los campos (menos contraseña) son obligatorios.");
      return;
    }

    try {
      // 3. Preparamos el objeto para enviar al Backend (RegistroUsuarioDTO)
      const usuarioActualizado = {
        nombreUsuario: nombre,
        correoElectronico: email,
        fechaNacimiento: fechaNacimiento,
        run: rut,
        direccion: direccion,
        contraseña: password // Si va vacío, el backend lo ignora
      };

      if (id) {
        await UsuarioService.update(id, usuarioActualizado);
        alert("Usuario actualizado correctamente en la Base de Datos ✅");
        navigate("/usuarios");
      }
    } catch (err) {
      console.error("Error al actualizar:", err);
      setError("Hubo un error al guardar los cambios.");
    }
  };

  if (loading) {
    return (
        <div className="admin-app d-flex justify-content-center align-items-center">
            <p>Cargando datos del usuario...</p>
        </div>
    );
  }

  return (
    <div className="admin-app">
      <aside className="sidebar">
        <div className="brand">
          <Link to="/dashboard">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
          <div className="brand-text">
            <div className="title">Level-Up Gamer</div>
          </div>
        </div>

        <nav className="nav">
          <Link className="nav-item" to="/dashboard">Dashboard</Link>
          <Link className="nav-item" to="/ordenes">Órdenes</Link>
          <Link className="nav-item" to="/productos">Productos</Link>
          <Link className="nav-item" to="/categorias">Categorías</Link>
          <Link className="nav-item active" to="/usuarios">Usuarios</Link>
          <Link className="nav-item" to="/reportes">Reportes</Link>
        </nav>

        <div className="sidebar-foot">
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("usuario");
              navigate("/");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Editar Usuario</h1>
        </header>

        <section className="content container mt-4">
          <form className="form-usuario row g-3" onSubmit={handleSubmit}>
            {error && <p className="error text-danger col-12">{error}</p>}

            {/* NOMBRE */}
            <div className="col-md-6">
              <label className="form-label">Nombre Usuario:</label>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
                className="form-control" 
              />
            </div>

            {/* EMAIL */}
            <div className="col-md-6">
              <label className="form-label">Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="form-control" 
              />
            </div>

            {/* FECHA NACIMIENTO (Antes Edad) */}
            <div className="col-md-4">
              <label className="form-label">Fecha Nacimiento:</label>
              <input 
                type="date" 
                value={fechaNacimiento} 
                onChange={(e) => setFechaNacimiento(e.target.value)} 
                required 
                className="form-control" 
              />
            </div>

            {/* RUT (Antes Teléfono) */}
            <div className="col-md-4">
              <label className="form-label">RUT:</label>
              <input 
                type="text" 
                value={rut} 
                onChange={(e) => setRut(e.target.value)} 
                required 
                className="form-control" 
              />
            </div>

            {/* DIRECCIÓN */}
            <div className="col-md-4">
              <label className="form-label">Dirección:</label>
              <input 
                type="text" 
                value={direccion} 
                onChange={(e) => setDireccion(e.target.value)} 
                required 
                className="form-control" 
              />
            </div>

            {/* CONTRASEÑA (Nuevo) */}
            <div className="col-12">
              <label className="form-label text-muted">
                Nueva Contraseña (Opcional - Dejar en blanco para no cambiar):
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="form-control"
                placeholder="******"
              />
            </div>

            <div className="col-12 d-flex gap-2 mt-3">
              <button type="submit" className="btn btn-primary">Actualizar Usuario</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/usuarios")}>Cancelar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}