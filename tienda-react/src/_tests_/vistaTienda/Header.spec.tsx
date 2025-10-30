import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Header from '../../components/Tienda/Header';

describe('Header component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    localStorage.clear();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('debe renderizar sin errores', () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
    });

    expect(container.innerHTML).toBeTruthy();
  });

  it('debe renderizar los enlaces de navegación', () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
    });

    const links = Array.from(container.querySelectorAll('nav a')).map(a =>
      a.getAttribute('href')
    );

    expect(links).toContain('/');
    expect(links).toContain('/listaproductos');
    expect(links).toContain('/nosotros');
    expect(links).toContain('/blog');
    expect(links).toContain('/contacto');
  });

  it('debe alternar la clase "active" al hacer clic en el botón del menú', () => {
    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
    });

    const button = container.querySelector('.nav-toggle') as HTMLButtonElement;
    const nav = container.querySelector('nav') as HTMLElement;

    // Inicialmente no tiene clase "active"
    expect(nav.classList.contains('active')).toBe(false);

    act(() => button.click());
    expect(nav.classList.contains('active')).toBe(true);

    act(() => button.click());
    expect(nav.classList.contains('active')).toBe(false);
  });

  it('debe mostrar el total de productos desde localStorage', () => {
    // Simulamos productos en localStorage
    localStorage.setItem(
      'carrito',
      JSON.stringify([
        { id: 1, cantidad: 3 },
        { id: 2, cantidad: 2 }
      ])
    );

    act(() => {
      const root = ReactDOM.createRoot(container);
      root.render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
    });

    const carritoText = container.querySelector('.carrito-text')?.textContent || '';
    expect(carritoText).toContain('5');
  });
});
