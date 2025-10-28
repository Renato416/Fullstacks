import React from "react";
import "../../assets/CSS/administrador/reg_usuario.css";

export const RegisterUser: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const nombre = formData.get("nombre")?.toString().trim() || "";
    const correo = formData.get("correo")?.toString().trim() || "";
    const usuario = formData.get("usuario")?.toString().trim() || "";
    const contrasena = formData.get("contrasena")?.toString() || "";
    const confirmar = formData.get("confirmar")?.toString() || "";
    const telefono = formData.get("telefono")?.toString().trim() || "";
    const rol = formData.get("rol")?.toString() || "";
    const departamento = formData.get("departamento")?.toString() || "";

    if (contrasena !== confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const nuevoUsuario = {
      nombre,
      correo,
      usuario,
      contrasena,
      telefono,
      rol,
      departamento,
      fecha: new Date().toISOString().slice(0, 10)
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado con éxito ✅");
    window.location.href = "/administrador/UserList";
  };

  return (
    <div className="user-register-container">
      <aside className="sidebar">
        <div className="logo">
          <img src="/VistaTienda/IMG/icon-level-up.png" alt="Logo" />Level-Up
        </div>

        <nav className="menu">
          <a href="/administrador/HomeAdmin">📊 Dashboard</a>
          <a href="/administrador/RegisterProduct">📦 Productos</a>
          <a href="#">📑 Reportes</a>
          <a href="/administrador/RegisterUser" className="active">👨‍💼 Empleados</a>
          <a href="#">👥 Clientes</a>
        </nav>

        <div className="bottom-menu">
          <a href="#">⚙️ Configuración</a>
          <a href="#">🙍 Perfil</a>
          <a href="#">❓ Help</a>
        </div>

        <div className="profile">
          <span>👤</span> Admin
        </div>
      </aside>

      <main className="main">
        <div className="header">
          <h1>NUEVO USUARIO</h1>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h3>Registro de usuario</h3>

            <label htmlFor="nombre">Nombre completo</label>
            <input type="text" id="nombre" name="nombre" required />

            <label htmlFor="correo">Correo</label>
            <input type="email" id="correo" name="correo" required />

            <label htmlFor="usuario">Usuario</label>
            <input type="text" id="usuario" name="usuario" required />

            <label htmlFor="contrasena">Contraseña</label>
            <input type="password" id="contrasena" name="contrasena" required />

            <label htmlFor="confirmar">Confirmar contraseña</label>
            <input type="password" id="confirmar" name="confirmar" required />

            <label htmlFor="telefono">Teléfono (opcional)</label>
            <input type="tel" id="telefono" name="telefono" />

            <div className="select-row">
              <div>
                <label htmlFor="rol">Rol</label>
                <select id="rol" name="rol">
                  <option>Administrador</option>
                  <option>Usuario estándar</option>
                  <option>Invitado</option>
                </select>
              </div>

              <div>
                <label htmlFor="departamento">Departamento</label>
                <select id="departamento" name="departamento">
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
