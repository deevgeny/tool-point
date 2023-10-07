import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import SideBar from '../SideBar';


function MockSideBar() {
  return (
    <BrowserRouter>
      <SideBar open={true} toggleDrawer={() => {}} />
    </BrowserRouter>
  );
}


describe('Unit tests: SideBar component', () => {

  test('incorrect number of buttons', () => {
    // One toggleDrawer button and 6 buttons (link) to other pages
    render(
      <MockSideBar />
    );
    const links = screen.queryAllByRole('button');
    expect(links.length).toBe(7);
  });

  test('incorrect button text', () => {
    render(
      <MockSideBar />
    );
    const homeButton = screen.queryByText(/главная/i);
    expect(homeButton).not.toBeNull();

    const clientsButton = screen.queryByText(/клиенты/i);
    expect(clientsButton).not.toBeNull();

    const productsButton = screen.queryByText(/продукты/i);
    expect(productsButton).not.toBeNull();
    
    const warehouseButton = screen.queryByText(/склад/i);
    expect(warehouseButton).not.toBeNull();

    const statsButton = screen.queryByText(/статистика/i);
    expect(statsButton).not.toBeNull();
    
    const toolsButton = screen.queryByText(/инструменты/i);
    expect(toolsButton).not.toBeNull();
  });

  test('home should have correct path: onClick={() => navigate("/")}', async () => {
    const user = userEvent.setup();
    act(() => {
      render(
        <MockSideBar />
      );
    });
    const homeButton = await screen.findByText(/главная/i);
    const clientsButton = await screen.findByText(/клиенты/i);
    await act(async () => {
      await user.click(clientsButton);
      await user.click(homeButton);
      expect(window.location.href).toBe('http://localhost/');
    });
  });

  test('clients should have correct path: onClick={() => navigate("/clients")}', async () => {
    const user = userEvent.setup();
    act(() => {
      render(
        <MockSideBar />
      );
    });
    const clientsButton = await screen.findByText(/клиенты/i);
    await act(async () => {
      await user.click(clientsButton);
      expect(window.location.href).toBe('http://localhost/clients');
    });
  });
  
  test('products should have correct path: onClick={() => navigate("/products")}', async () => {
    const user = userEvent.setup();
    act(() => {
      render(
        <MockSideBar />
      );
    });
    const clientsButton = await screen.findByText(/продукты/i);
    await act(async () => {
      await user.click(clientsButton);
      expect(window.location.href).toBe('http://localhost/products');
    });
  });

  test('stock should have correct path: onClick={() => navigate("/stock")}', async () => {
    const user = userEvent.setup();
    act(() => {
      render(
        <MockSideBar />
      );
    });
    const clientsButton = await screen.findByText(/склад/i);
    await act(async () => {
      await user.click(clientsButton);
      expect(window.location.href).toBe('http://localhost/stock');
    });
  });

  test('stats should have correct path: onClick={() => navigate("/stats")}', async () => {
    const user = userEvent.setup();
    act(() => {
      render(
        <MockSideBar />
      );
    });
    const clientsButton = await screen.findByText(/статистика/i);
    await act(async () => {
      await user.click(clientsButton);
      expect(window.location.href).toBe('http://localhost/stats');
    });
  });
  
  test('tools should have correct path: onClick={() => navigate("/tools")}', async () => {
    const user = userEvent.setup();
    act(() => {
      render(
        <MockSideBar />
      );
    });
    const clientsButton = await screen.findByText(/инструменты/i);
    await act(async () => {
      await user.click(clientsButton);
      expect(window.location.href).toBe('http://localhost/tools');
    });
  });

});
