import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import Checkout from "../../pages/Tienda/Checkout";

describe("Checkout component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.clear(); // Limpiar localStorage antes de cada test
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("debe renderizar sin errores", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Checkout />
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
          <Checkout />
        </MemoryRouter>
      );
    });

    const mensaje = container.querySelector(".checkout-products p")?.textContent;
    expect(mensaje).toContain("Tu carrito está vacío 🛒");
  });

  it("debe mostrar productos si hay items en localStorage", () => {
    localStorage.setItem(
      "carrito",
      JSON.stringify([{ id: "1", cantidad: 2 }])
    );
    localStorage.setItem("descuento", "true");

    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      );
    });

    const productos = container.querySelectorAll(".checkout-product");
    expect(productos.length).toBe(1);

    const nombreProducto = productos[0].querySelector("span")?.textContent;
    expect(nombreProducto).toContain("x 2");

    const total = container.querySelector(".checkout-products strong")?.textContent;
    expect(total).toBeTruthy();
  });

  it("debe mostrar mensaje de compra fallida si faltan datos", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      );
    });

    const btnFinalize = container.querySelector("#finalize") as HTMLButtonElement;
    act(() => btnFinalize.click());

    const result = container.querySelector(".checkout-result p")?.textContent;
    expect(result).toContain("Compra fallida");
  });

  it("debe procesar la compra correctamente si hay datos válidos", () => {
    // Simular carrito y descuento
    localStorage.setItem(
      "carrito",
      JSON.stringify([{ id: "1", cantidad: 1 }])
    );
    localStorage.setItem("descuento", "true");

    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      );
    });

    // Llenar formulario
    const addressInput = container.querySelector('input[type="text"]') as HTMLInputElement;
    act(() => { addressInput.value = "Calle Falsa 123"; addressInput.dispatchEvent(new Event("input")); });

    const paymentSelect = container.querySelector('select') as HTMLSelectElement;
    act(() => { paymentSelect.value = "paypal"; paymentSelect.dispatchEvent(new Event("change")); });

    const btnFinalize = container.querySelector("#finalize") as HTMLButtonElement;
    act(() => btnFinalize.click());

    const result = container.querySelector(".checkout-result p")?.textContent;
    expect(result).toContain("¡Compra realizada con éxito!");
  });
});
