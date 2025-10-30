import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import ListaProducto from "../../pages/Tienda/ListaProductos";
import { productos } from "../../assets/data/data";

describe("ListaProducto component", () => {
  let container: HTMLDivElement;
  let root: ReactDOM.Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.clear();
    spyOn(window, "alert");

    // Creamos el root una sola vez
    root = ReactDOM.createRoot(container);
  });

  afterEach(() => {
    if (root) root.unmount(); // desmontamos correctamente
    document.body.removeChild(container);
    container = null!;
    localStorage.clear();
  });

  // Helper para renderizar el componente
  async function renderComponent(component: React.ReactElement) {
    await act(async () => {
      root.render(component);
      // Espera a que useEffect async se ejecute
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }

  it("debe renderizar sin errores", async () => {
    await renderComponent(
      <MemoryRouter>
        <ListaProducto />
      </MemoryRouter>
    );

    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar todos los productos inicialmente", async () => {
    await renderComponent(
      <MemoryRouter>
        <ListaProducto />
      </MemoryRouter>
    );

    const productCards = container.querySelectorAll(".producto");
    expect(productCards.length).toBe(productos.length);
  });

  it("debe agregar producto al carrito y actualizar localStorage", async () => {
    let eventFired = false;
    window.addEventListener("carrito-actualizado", () => {
      eventFired = true;
    });

    await renderComponent(
      <MemoryRouter>
        <ListaProducto />
      </MemoryRouter>
    );

    const firstButton = container.querySelector<HTMLButtonElement>(
      ".producto button"
    )!;

    await act(async () => {
      firstButton.click();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    expect(carrito.length).toBe(1);
    expect(carrito[0].id).toBe(productos[0].id);
    expect(carrito[0].cantidad).toBe(1);
    expect(eventFired).toBeTrue();
  });
});
