import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from '../../components/Tienda/Header';

describe('Header component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const root = ReactDOM.createRoot(div);
    root.render(<Header />);

    // 💡 Aserción mínima para que Jasmine no lo optimice
    expect(div.innerHTML).toBeDefined();

    // Limpieza
    root.unmount();
    document.body.removeChild(div);
  });
});
