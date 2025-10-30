import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import ProductoNuevo from '../../pages/VistaAdministradorTsx/ProductoNuevo';

describe('ProductoNuevo component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('debe renderizar el formulario sin errores', () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <ProductoNuevo />
        </MemoryRouter>
      );
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it('debe contener el texto "Agregar Nuevo Producto"', () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <ProductoNuevo />
        </MemoryRouter>
      );
    });

    expect(container.textContent).toContain('Agregar Nuevo Producto');
  });
});
