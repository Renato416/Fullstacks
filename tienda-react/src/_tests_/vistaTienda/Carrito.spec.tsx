import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../../pages/Tienda/Carrito";

describe("Carrito component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.clear(); // limpiar localStorage antes de cada test
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("debe renderizar sin errores", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Carrito />
        </MemoryRouter>
      );
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar mensaje de carrito vacío si no hay productos", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Carrito />
        </MemoryRouter>
      );
    });

    const mensaje = container.querySelector(".cart-container p")?.textContent;
    expect(mensaje).toContain("Tu carrito está vacío 🛒");
  });

  it("debe mostrar productos si hay items en localStorage", () => {
    // Simular items en carrito
    localStorage.setItem(
      "carrito",
      JSON.stringify([{ id: "1", cantidad: 2 }])
    );

    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Carrito />
        </MemoryRouter>
      );
    });

    const productos = container.querySelectorAll(".product");
    expect(productos.length).toBe(1);

    const nombreProducto = productos[0].querySelector("h2")?.textContent;
    expect(nombreProducto).toBeTruthy();

    const cantidadInput = productos[0].querySelector(
      'input[type="number"]'
    ) as HTMLInputElement;
    expect(cantidadInput.value).toBe("2");
  });

  it("debe actualizar la cantidad al incrementar o decrementar", () => {
    localStorage.setItem(
      "carrito",
      JSON.stringify([{ id: "1", cantidad: 2 }])
    );

    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Carrito />
        </MemoryRouter>
      );
    });

    const producto = container.querySelector(".product")!;
    const input = producto.querySelector('input[type="number"]') as HTMLInputElement;
    const btnIncrement = producto.querySelector('button:nth-of-type(2)') as HTMLButtonElement;
    const btnDecrement = producto.querySelector('button:nth-of-type(1)') as HTMLButtonElement;

    act(() => btnIncrement.click());
    expect(input.value).toBe("3");

    act(() => btnDecrement.click());
    expect(input.value).toBe("2");
  });
});
