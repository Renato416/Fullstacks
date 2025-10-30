// src/_tests_/Noticia1.spec.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import Noticia1 from "../../pages/Tienda/Noticia1";

describe("Noticia1 component", () => {
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
          <Noticia1 />
        </MemoryRouter>
      );
      await Promise.resolve(); // asegura que useEffect se ejecute
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar el título de la noticia", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Noticia1 />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const titulo = container.querySelector("main h2")?.textContent;
    expect(titulo).toContain("¡Semana de Ofertas Gamer!");
  });

  it("debe mostrar la imagen de la noticia", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Noticia1 />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const img = container.querySelector<HTMLImageElement>(".detalle-img");
    expect(img).toBeTruthy();
    expect(img?.src).toContain("ofertas-gamer.webp");
  });

  it("debe mostrar el enlace de volver al blog", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Noticia1 />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const link = container.querySelector<HTMLAnchorElement>(".boton-volver");
    expect(link).toBeTruthy();
    expect(link?.textContent).toContain("⬅ Volver a Noticias");
    expect(link?.getAttribute("href")).toBe("/blog");
  });

  it("debe actualizar el contador de carrito si hay productos en localStorage", async () => {
    localStorage.setItem("carrito", JSON.stringify([{ id: "1", cantidad: 2 }, { id: "2", cantidad: 3 }]));

    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Noticia1 />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const contador = container.querySelector(".carrito-text")?.textContent;
    expect(contador).toBe("Productos (5)");
  });
});
