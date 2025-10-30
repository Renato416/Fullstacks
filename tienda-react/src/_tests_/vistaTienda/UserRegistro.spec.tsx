import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react";
import UserRegister from "../../pages/Tienda/UserRegistro";
import * as data from "../../assets/data/data"; // ✅ Import en lugar de require

describe("UserRegister component", () => {
  let container: HTMLDivElement;
  let registrarUsuarioSpy: jasmine.Spy;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.clear();

    registrarUsuarioSpy = spyOn(data, "registrarUsuario").and.returnValue(true);
    spyOn(window, "alert");
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null!;
    localStorage.clear();
  });

  it("debe renderizar sin errores", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(<UserRegister />);
      await Promise.resolve();
    });
    expect(container.innerHTML).toBeTruthy();
  });

  it("debe actualizar el contador de carrito", async () => {
    localStorage.setItem("carrito", JSON.stringify([{ id: "1", cantidad: 2 }]));

    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(<UserRegister />);
      await Promise.resolve();
    });

    const contador = container.querySelector(".carrito-text")?.textContent;
    expect(contador).toBe("Productos (2)");
  });

  it("debe mostrar alerta si faltan campos", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(<UserRegister />);
      await Promise.resolve();
    });

    const form = container.querySelector("form")!;
    await act(async () => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(window.alert).toHaveBeenCalledWith("Por favor, completa todos los campos.");
  });

  it("debe llamar a registrarUsuario con datos correctos y mostrar alerta de éxito", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(<UserRegister />);
      await Promise.resolve();
    });

    // Completar formulario
    (container.querySelector("#nombre") as HTMLInputElement).value = "Test User";
    (container.querySelector("#correo") as HTMLInputElement).value = "test@example.com";
    (container.querySelector("#telefono") as HTMLInputElement).value = "123456789";
    (container.querySelector("#direccion") as HTMLInputElement).value = "Calle Falsa 123";
    (container.querySelector("#contrasena") as HTMLInputElement).value = "123456";

    const form = container.querySelector("form")!;
    await act(async () => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(registrarUsuarioSpy).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Usuario registrado correctamente ✅");
  });

  it("debe mostrar alerta si registrarUsuario devuelve false (correo duplicado)", async () => {
    registrarUsuarioSpy.and.returnValue(false);

    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(<UserRegister />);
      await Promise.resolve();
    });

    // Completar formulario
    (container.querySelector("#nombre") as HTMLInputElement).value = "Test User";
    (container.querySelector("#correo") as HTMLInputElement).value = "test@example.com";
    (container.querySelector("#telefono") as HTMLInputElement).value = "123456789";
    (container.querySelector("#direccion") as HTMLInputElement).value = "Calle Falsa 123";
    (container.querySelector("#contrasena") as HTMLInputElement).value = "123456";

    const form = container.querySelector("form")!;
    await act(async () => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(registrarUsuarioSpy).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("El correo ingresado ya está registrado.");
  });
});
