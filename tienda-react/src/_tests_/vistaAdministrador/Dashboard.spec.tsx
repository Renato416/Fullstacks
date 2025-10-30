import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';
import Dashboard from '../../pages/VistaAdministradorTsx/Dashboard';

describe('Dashboard component (tests simplificados)', () => {
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
          <Dashboard />
        </MemoryRouter>
      );
    });

    expect(container.innerHTML).toBeTruthy();
  });
});
