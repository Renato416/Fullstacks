import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import ProductCard from "../../components/Tienda/ProductoCard";

describe("ProductCard component", () => {
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
      root.render(<ProductCard img="test.png" title="Producto 1" price="$1000" />);
    });
    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar la imagen con el atributo alt correcto", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(<ProductCard img="test.png" title="Producto 1" price="$1000" />);
    });

    const img = container.querySelector("img") as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain("test.png");
    expect(img.alt).toBe("Producto 1");
  });

  it("debe mostrar el título y el precio correctamente", () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(<ProductCard img="test.png" title="Producto 1" price="$1000" />);
    });

    const title = container.querySelector(".producto-titulo")?.textContent;
    const price = container.querySelector(".producto-valor")?.textContent;

    expect(title).toBe("Producto 1");
    expect(price).toBe("$1000");
  });
});
