import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import UsuarioNuevo from '../../pages/VistaAdministradorTsx/UsuarioNuevo';

describe('UsuarioNuevo component', () => {
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
          <UsuarioNuevo />
        </MemoryRouter>
      );
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it('debe mostrar mensaje de error si se envía formulario vacío', () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <UsuarioNuevo />
        </MemoryRouter>
      );
    });

    const button = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    act(() => button.click());

    expect(container.textContent).toContain('Todos los campos son obligatorios');
  });
});
