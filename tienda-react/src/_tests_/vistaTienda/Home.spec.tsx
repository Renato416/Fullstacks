import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/Tienda/Home";
import { productos } from "../../assets/data/data";

describe("Home component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("debe renderizar sin errores", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar el título principal '¡LAS MEJORES OFERTAS!'", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    const titulo = container.querySelector(".titulo-ofertas h2")?.textContent;
    expect(titulo).toBe("¡LAS MEJORES OFERTAS!");
  });

  it("debe renderizar todas las ProductCard con información correcta", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    const cards = container.querySelectorAll(".producto");
    expect(cards.length).toBe(productos.length);

    productos.forEach((p) => {
      const card = Array.from(cards).find(
        (c) =>
          c.querySelector(".producto-titulo")?.textContent === p.nombre &&
          c.querySelector(".producto-valor")?.textContent ===
            `$${p.precio.toLocaleString()}`
      );
      expect(card).toBeTruthy();
      const img = card?.querySelector("img") as HTMLImageElement;
      expect(img).toBeTruthy();
      expect(img.src).toContain(p.imagen);
      expect(img.alt).toBe(p.nombre);
    });
  });
});
