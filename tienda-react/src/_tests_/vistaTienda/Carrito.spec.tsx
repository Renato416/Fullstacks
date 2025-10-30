import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react"; // ✅ act desde 'react'
import { MemoryRouter } from "react-router-dom";
import Carrito from "../../pages/Tienda/Carrito";

describe("Carrito component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.clear();
    spyOn(window, "alert"); // mock alert
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
          <Carrito />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar mensaje de carrito vacío si no hay productos", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Carrito />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const mensaje = container.querySelector(".cart-container p")?.textContent;
    expect(mensaje).toContain("Tu carrito está vacío 🛒");
  });
});
