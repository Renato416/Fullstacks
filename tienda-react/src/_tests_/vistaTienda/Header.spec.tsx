import React from "react";
import { createRoot } from "react-dom/client";
import Header from "../../components/Tienda/Header";

describe("Header Component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("se renderiza con logo y carrito", () => {
    const root = createRoot(container);
    root.render(<Header />);
    
    const img = container.querySelector("img");
    const carrito = container.querySelector(".carrito-text");
    expect(img).not.toBeNull();
    expect(carrito?.textContent).toContain("Productos");
  });
});
