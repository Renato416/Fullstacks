import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Usuarios from "../../pages/VistaAdministradorTsx/Usuario";

// Mock de datos
const mockUsuarios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@example.com",
    edad: 28,
    telefono: "999999999",
    direccion: "Calle 1",
  },
];

// Sobrescribir manualmente el módulo importado (sin Jest, sin Rewire)
(globalThis as any).usuarios = mockUsuarios;

// Evitar errores de tipado TS para props dinámicos
type AnyComponent = React.FC<any>;
const UsuariosComponent = Usuarios as AnyComponent;

describe("Componente <Usuarios /> (React 18 + Karma + Jasmine)", () => {
  let container: HTMLDivElement | null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  it("debería renderizar el título correctamente", (done) => {
    const root = ReactDOM.createRoot(container!);
    root.render(
      <MemoryRouter>
        <UsuariosComponent />
      </MemoryRouter>
    );

    setTimeout(() => {
      const title = container!.querySelector("h1");
      expect(title).not.toBeNull();
      expect(title!.textContent).toContain("Vista Administrador - Usuarios");
      done();
    }, 10);
  });

  it("debería mostrar al menos un usuario en la tabla", (done) => {
    const root = ReactDOM.createRoot(container!);
    root.render(
      <MemoryRouter>
        <UsuariosComponent />
      </MemoryRouter>
    );

    setTimeout(() => {
      const filas = container!.querySelectorAll("tbody tr");
      expect(filas.length).toBeGreaterThan(0);
      expect(filas[0].textContent).toContain("Juan Pérez");
      done();
    }, 10);
  });

  it("debería tener un botón para agregar usuario", (done) => {
    const root = ReactDOM.createRoot(container!);
    root.render(
      <MemoryRouter>
        <UsuariosComponent />
      </MemoryRouter>
    );

    setTimeout(() => {
      const botonAgregar = container!.querySelector("button.btn-primary");
      expect(botonAgregar).not.toBeNull();
      expect(botonAgregar!.textContent).toContain("Agregar Usuario");
      done();
    }, 10);
  });
});
