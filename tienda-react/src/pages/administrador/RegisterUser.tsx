import React, { useState } from "react";
import "../../assets/css/administrador/registro_usuario.css"; // Ajusta la ruta según tu estructura

const RegistroUsuario: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    usuario: "",
    contrasena: "",
    confirmar: "",
    telefono: "",
    rol: "Administrador",
    departamento: "Ventas"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.contrasena !== formData.confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("Usuario registrado con éxito ✅");
    setFormData({
      nombre: "",
      correo: "",
      usuario: "",
      contrasena: "",
      confirmar: "",
      telefono: "",
      rol: "Administrador",
      departamento: "Ventas"
    });
  };

  return (
    <div className="registro-usuario-container">
      <aside className="sidebar">
        <h2>Company</h2>
        <ul>
          <li><a href="Home_ad.html">Dashboard</a></li>
          <li><a href="#" className="active">Usuarios</a></li>
          <li><a href="#">Inventario</a></li>
          <li><a href="#">Reportes</a></li>
          <li><a href="#">Empleados</a></li>
          <li><a href="#">Clientes</a></li>
        </ul>
      </aside>

      <main className="main">
        <div className="header">
          <h1>NUEVO USUARIO</h1>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h3>Registro de usuario</h3>

            <label htmlFor="nombre">Nombre completo</label>
            <input type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleChange} />

            <label htmlFor="correo">Correo</label>
            <input type="email" id="correo" name="correo" required value={formData.correo} onChange={handleChange} />

            <label htmlFor="usuario">Usuario</label>
            <input type="text" id="usuario" name="usuario" required value={formData.usuario} onChange={handleChange} />

            <label htmlFor="contrasena">Contraseña</label>
            <input type="password" id="contrasena" name="contrasena" required value={formData.contrasena} onChange={handleChange} />

            <label htmlFor="confirmar">Confirmar contraseña</label>
            <input type="password" id="confirmar" name="confirmar" required value={formData.confirmar} onChange={handleChange} />

            <label htmlFor="telefono">Teléfono (opcional)</label>
            <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />

            <div className="select-row">
              <div>
                <label htmlFor="rol">Rol</label>
                <select id="rol" name="rol" value={formData.rol} onChange={handleChange}>
                  <option>Administrador</option>
                  <option>Usuario estándar</option>
                  <option>Invitado</option>
                </select>
              </div>

              <div>
                <label htmlFor="departamento">Departamento</label>
                <select id="departamento" name="departamento" value={formData.departamento} onChange={handleChange}>
                  <option>Ventas</option>
                  <option>Marketing</option>
                  <option>Soporte</option>
                  <option>IT</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-submit">REGISTRAR</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegistroUsuario;
