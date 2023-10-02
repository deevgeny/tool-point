import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import ErrorDialog from '../ErrorDialog';
import { ErrorProvider } from '../../../context/ErrorContext';
import useError from '../../../hooks/useError';
import { errorStatusMessage } from '../../../utils/constants';


function MockError({ error = {} }) {
  const { setError } = useError();

  useEffect(() => {
    setError(error);
  }, [])

  return;
}


function MockErrorDialog({ error = {} }) {
  return (
    <ErrorProvider>
      <MockError error={error} />
      <ErrorDialog />
    </ErrorProvider>
  );
}


describe('ErrorDialog Tests', () => {
  test('Error dialog shoud be invisible with no error in context', () => {
    render(
      <MockErrorDialog />
    );
    const element = screen.queryAllByText(/ошибка/i);
    expect(element.length).toBe(0);
  });

  test('Error dialog shoud be visible with error in context', () => {
    render(
      <MockErrorDialog error={{ status: 400 }} />
    );
    const element = screen.getByText(/ошибка/i);
    expect(element).toBeInTheDocument();
  });

  test('Error dialog title should display error status', () => {
    render(
      <MockErrorDialog error={{ status: 400 }} />
    );
    const element = screen.getByText(/ошибка 400/i);
    expect(element).toBeInTheDocument();
  });
  
  test('Error dialog should display error status message', () => {
    render(
      <MockErrorDialog error={{ status: 400 }} />
    );
    const element = screen.getByText(errorStatusMessage[400]);
    expect(element).toBeInTheDocument();
  });

  test('Error dialog should not be hidden', () => {
    render(
      <MockErrorDialog error={{ status: 400 }} />
    );
    const element = screen.getByText(errorStatusMessage[400]);
    expect(element.hidden).toBe(false);
  });
})
