import React from "react";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import Footer from "../../components/Tienda/Footer";

describe("Footer component", () => {
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
          <Footer />
        </MemoryRouter>
      );
    });
    expect(container.innerHTML).toBeTruthy();
  });

  it("debe contener información de contacto", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
    });

    const text = container.textContent || "";
    expect(text).toContain("SERVICIO AL CLIENTE");
    expect(text).toContain("+56 9 3456 7890");
    expect(text).toContain("soporte@levelupgamer.cl");
    expect(text).toContain("Lunes a Viernes de 9:00 a 19:00 hrs");
  });

  it("debe contener enlaces a redes sociales", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      );
    });

    const links = Array.from(container.querySelectorAll("a")).map(a => a.textContent);
    expect(links).toContain("Facebook");
    expect(links).toContain("Instagram");
    expect(links).toContain("Twitter (X)");
  });
});
