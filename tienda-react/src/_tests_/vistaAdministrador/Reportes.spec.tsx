import React from "react";
import ReactDOM from "react-dom/client";
import Reportes from "../../pages/VistaAdministradorTsx/Reportes";
import { MemoryRouter } from "react-router-dom";

describe("Reportes component (tests simplificados)", () => {
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
        <Reportes />
      </MemoryRouter>
    );
    expect(container.innerHTML).toContain("Vista Administrador - Reportes");
  });
});
