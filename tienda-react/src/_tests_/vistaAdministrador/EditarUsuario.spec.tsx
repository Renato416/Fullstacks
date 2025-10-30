import React from "react";
import ReactDOM from "react-dom/client";
import EditarUsuario from "../../pages/VistaAdministradorTsx/EditarUsuario";
import { MemoryRouter } from "react-router-dom";

describe("EditarUsuario component (render básico)", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    localStorage.clear();
  });

  it("debe renderizar sin errores", () => {
    const root = ReactDOM.createRoot(container);
    root.render(
      <MemoryRouter>
        <EditarUsuario />
      </MemoryRouter>
    );
    expect(container.innerHTML).toBeTruthy();
  });
});
