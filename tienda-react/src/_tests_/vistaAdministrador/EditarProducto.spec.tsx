import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import EditarProducto from '../../pages/VistaAdministradorTsx/EditarProducto';

describe('EditarProducto component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('debe renderizar sin errores', () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <EditarProducto />
        </MemoryRouter>
      );
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it('debe contener el formulario de edición', () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <EditarProducto />
        </MemoryRouter>
      );
    });

    const form = container.querySelector('form');
    expect(form).toBeTruthy();
  });
});
