import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouterBackButton from '../RouterBackButton';


describe('Unit tests: RouterBackButton component', () => {
  test('should have correct text', () => {
    render(
      <BrowserRouter>
        <RouterBackButton />
      </BrowserRouter>
    );
    const element = screen.queryByText(/назад/i);
    expect(element).not.toBeNull();
  });

  test('should have correct href value', () => {
    render(
      <BrowserRouter>
        <Routes location='/page'>
          <Route path='/page' element={<RouterBackButton />} />
        </Routes>
      </BrowserRouter>
    );
    const element = screen.queryByText(/назад/i);
    expect(element.href).toBe('http://localhost/');
  });
});
