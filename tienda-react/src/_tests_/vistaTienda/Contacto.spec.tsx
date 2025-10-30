import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import Contacto from "../../pages/Tienda/Contacto";

describe("Contacto component", () => {
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
          <Contacto />
        </MemoryRouter>
      );
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar el título principal 'CONTÁCTANOS'", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Contacto />
        </MemoryRouter>
      );
    });

    const titulo = container.querySelector(".titulo-ofertas h2")?.textContent;
    expect(titulo).toBe("CONTÁCTANOS");
  });

  it("debe mostrar información de contacto correcta", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Contacto />
        </MemoryRouter>
      );
    });

    const info = container.querySelector(".contacto-lista")?.textContent || "";
    expect(info).toContain("+56 9 8765 4321");
    expect(info).toContain("soporte@levelupgamer.cl");
    expect(info).toContain("Av. Los Jugadores 1234");
    expect(info).toContain("Lunes a Viernes: 9:00 AM - 8:00 PM");
  });

  it("debe contener enlaces a redes sociales", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Contacto />
        </MemoryRouter>
      );
    });

    const links = container.querySelectorAll(".redes-sociales a");
    const linkTexts = Array.from(links).map(a => a.textContent);
    expect(linkTexts).toContain("Facebook: LevelUpGamerCL");
    expect(linkTexts).toContain("Instagram: @levelup_gamer");
    expect(linkTexts).toContain("Twitter (X): @LevelUpGamer");
    expect(linkTexts).toContain("TikTok: @levelupgamer.oficial");
  });
});
