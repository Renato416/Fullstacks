// src/_tests_/Nosotros.spec.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import Nosotros from "../../pages/Tienda/Nosotros";

describe("Nosotros component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.clear();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null!;
    localStorage.clear();
  });

  it("debe renderizar sin errores", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Nosotros />
        </MemoryRouter>
      );
      await Promise.resolve(); // asegura que useEffect se ejecute
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar el título 'Sobre Nosotros'", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Nosotros />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const titulo = container.querySelector(".nosotros-info h2")?.textContent;
    expect(titulo).toContain("Sobre Nosotros");
  });

  it("debe actualizar el contador de carrito si hay productos en localStorage", async () => {
    localStorage.setItem("carrito", JSON.stringify([{ id: "1", cantidad: 2 }, { id: "2", cantidad: 3 }]));

    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Nosotros />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const contador = container.querySelector(".carrito-text")?.textContent;
    expect(contador).toBe("Productos (5)");
  });

  it("debe mostrar la imagen de Nosotros", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Nosotros />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const img = container.querySelector<HTMLImageElement>(".img-nosotros");
    expect(img).toBeTruthy();
    expect(img?.src).toContain("nosotros-banner.png");
  });
});
