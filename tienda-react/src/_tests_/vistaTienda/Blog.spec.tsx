import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import Blog from "../../pages/Tienda/Blog";

describe("Blog component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("debe renderizar sin errores", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      );
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar el título del blog", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      );
    });

    const titulo = container.querySelector(".blog-titulo")?.textContent;
    expect(titulo).toBe("📰 Noticias y Actualizaciones");
  });

  it("debe mostrar las noticias", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      );
    });

    const noticias = container.querySelectorAll(".noticia-card");
    expect(noticias.length).toBe(2);

    const primeraNoticiaTitulo = noticias[0].querySelector("h3")?.textContent;
    const segundaNoticiaTitulo = noticias[1].querySelector("h3")?.textContent;

    expect(primeraNoticiaTitulo).toBe("¡Semana de Ofertas Gamer!");
    expect(segundaNoticiaTitulo).toBe("Evento “LEVEL-UP EXPERIENCE”");
  });

  it("debe mostrar la fecha y descripción de cada noticia", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      );
    });

    const primeraNoticia = container.querySelectorAll(".noticia-card")[0];
    const descripcion1 = primeraNoticia.querySelector("p")?.textContent;
    const fecha1 = primeraNoticia.querySelector(".noticia-fecha")?.textContent;

    expect(descripcion1).toBe(
      "Descuentos especiales en periféricos, sillas y monitores. ¡Equipa tu setup al mejor precio!"
    );
    expect(fecha1).toBe("Publicado el 25/10/2025");
  });
});
