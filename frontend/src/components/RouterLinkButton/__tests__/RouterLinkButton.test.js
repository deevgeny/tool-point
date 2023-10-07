import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouterLinkButton from '../RouterLinkButton';


describe('Unit tests: RouterLinkButton component', () => {

  test('should display text passed as children', () => {
    render(
      <BrowserRouter>
        <RouterLinkButton>button text</RouterLinkButton>
      </BrowserRouter>
    );
    const linkButton = screen.queryByText(/button text/i);
    expect(linkButton).not.toBeNull();
  });

  test('should have correct href passed in props', () => {
    render(
      <BrowserRouter>
        <RouterLinkButton to='/test-page'>button text</RouterLinkButton>
      </BrowserRouter>
    );
    const linkButton = screen.queryByText(/button text/i);
    expect(linkButton.href).toBe('http://localhost/test-page');
  });
});
