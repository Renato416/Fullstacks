import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import ListaProducto from "../../pages/Tienda/ListaProductos";
import { productos } from "../../assets/data/data";

describe("ListaProducto component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
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
          <ListaProducto />
        </MemoryRouter>
      );
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar todos los productos inicialmente", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <ListaProducto />
        </MemoryRouter>
      );
    });

    const productCards = container.querySelectorAll(".producto");
    expect(productCards.length).toBe(productos.length);
  });

  it("debe filtrar productos por búsqueda", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <ListaProducto />
        </MemoryRouter>
      );
    });

    const input = container.querySelector<HTMLInputElement>("#searchInput")!;
    act(() => {
      input.value = "pro"; // palabra parcial
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });

    const filtered = productos.filter((p) =>
      p.nombre.toLowerCase().includes("pro")
    );

    const productCards = container.querySelectorAll(".producto");
    expect(productCards.length).toBe(filtered.length);
  });

  it("debe agregar producto al carrito y actualizar localStorage", () => {
    let eventFired = false;
    window.addEventListener("carrito-actualizado", () => {
      eventFired = true;
    });

    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <ListaProducto />
        </MemoryRouter>
      );
    });

    const firstButton = container.querySelector<HTMLButtonElement>(
      ".producto button"
    )!;
    
    act(() => {
      firstButton.click();
    });

    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    expect(carrito.length).toBe(1);
    expect(carrito[0].id).toBe(productos[0].id);
    expect(carrito[0].cantidad).toBe(1);
    expect(eventFired).toBeTrue();
  });
});
