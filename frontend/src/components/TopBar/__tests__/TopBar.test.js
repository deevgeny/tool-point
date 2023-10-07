import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { AuthProvider } from '../../../context/AuthContext';
import TopBar from '../TopBar';




function MockTopBar({openedSideBar}) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TopBar open={openedSideBar} toggleDrawer={() => {}} />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('Unit tests: TopBar component', () => {
  
  test('incorrect number of buttons with opened SideBar', () => {
    // When SideBar is opened expand-SideBar button should not be available
    render(
      <MockTopBar openedSideBar={true} />
    );
    const links = screen.queryAllByRole('button');
    //screen.debug();
    expect(links.length).toBe(2);
  });
  
  test('incorrect number of buttons with closed SideBar', () => {
    // When SideBar is closed expand-SideBar button should be available
    render(
      <MockTopBar openedSideBar={false} />
    );
    const links = screen.queryAllByRole('button');
    //screen.debug();
    expect(links.length).toBe(3);
  });

});
