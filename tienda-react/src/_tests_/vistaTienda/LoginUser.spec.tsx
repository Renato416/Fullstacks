// src/_tests_/LoginUser.spec.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router-dom";
import * as ReactRouterDOM from "react-router-dom";
import LoginUser from "../../pages/Tienda/LoginUser";
import { buscarUsuario } from "../../assets/data/data";

describe("LoginUser component", () => {
  let container: HTMLDivElement;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.clear();
    spyOn(window, "alert");
    navigateSpy = jasmine.createSpy("navigate");
    spyOn(ReactRouterDOM, "useNavigate").and.returnValue(navigateSpy);
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
          <LoginUser />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it("debe mostrar alert si usuario no existe", async () => {
    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <LoginUser />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const form = container.querySelector("form")!;
    const emailInput = container.querySelector<HTMLInputElement>("input#correo")!;
    const passInput = container.querySelector<HTMLInputElement>("input#contrasena")!;

    emailInput.value = "noexiste@correo.com";
    emailInput.dispatchEvent(new Event("input", { bubbles: true }));

    passInput.value = "123456";
    passInput.dispatchEvent(new Event("input", { bubbles: true }));

    await act(async () => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      await Promise.resolve();
    });

    expect(window.alert).toHaveBeenCalledWith("Correo o contraseña incorrectos.");
    expect(localStorage.getItem("usuarioActivo")).toBeNull();
  });

  it("debe navegar a /dashboard si es correo duoc", async () => {
    spyOn(window, "alert"); // prevenir alert
    spyOn<any>(ReactRouterDOM, "useNavigate").and.returnValue(navigateSpy);

    // Creamos un usuario válido en data
    spyOn<any>(buscarUsuario as any, "bind").and.returnValue(() => ({
      id: "1",
      nombre: "Usuario Duoc",
      correo: "usuario@duocuc.cl",
      email: "usuario@duocuc.cl",
      telefono: "12345678",
      password: "123456",
    }));

    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <LoginUser />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const form = container.querySelector("form")!;
    const emailInput = container.querySelector<HTMLInputElement>("input#correo")!;
    const passInput = container.querySelector<HTMLInputElement>("input#contrasena")!;

    emailInput.value = "usuario@duocuc.cl";
    emailInput.dispatchEvent(new Event("input", { bubbles: true }));

    passInput.value = "123456";
    passInput.dispatchEvent(new Event("input", { bubbles: true }));

    await act(async () => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      await Promise.resolve();
    });

    expect(navigateSpy).toHaveBeenCalledWith("/dashboard");
  });

  it("debe navegar a /tienda si es correo normal", async () => {
    spyOn<any>(buscarUsuario as any, "bind").and.returnValue(() => ({
      id: "2",
      nombre: "Usuario Normal",
      correo: "usuario@gmail.com",
      email: "usuario@gmail.com",
      telefono: "12345678",
      password: "123456",
    }));

    await act(async () => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <LoginUser />
        </MemoryRouter>
      );
      await Promise.resolve();
    });

    const form = container.querySelector("form")!;
    const emailInput = container.querySelector<HTMLInputElement>("input#correo")!;
    const passInput = container.querySelector<HTMLInputElement>("input#contrasena")!;

    emailInput.value = "usuario@gmail.com";
    emailInput.dispatchEvent(new Event("input", { bubbles: true }));

    passInput.value = "123456";
    passInput.dispatchEvent(new Event("input", { bubbles: true }));

    await act(async () => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      await Promise.resolve();
    });

    expect(navigateSpy).toHaveBeenCalledWith("/tienda");
  });
});
