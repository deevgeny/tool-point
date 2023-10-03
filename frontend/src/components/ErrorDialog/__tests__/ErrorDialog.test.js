import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import ErrorDialog from '../ErrorDialog';
import useError from '../../../hooks/useError';
import { ErrorProvider } from '../../../context/ErrorContext';
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


describe('ErrorDialog component unit tests', () => {
  test('shoud be invisible with no error in context', () => {
    render(
      <MockErrorDialog />
    );
    const element = screen.queryByText(/ошибка/i);
    expect(element).toBeNull();
  });

  test('shoud be visible with error in context', () => {
    render(
      <MockErrorDialog error={{ status: 400 }} />
    );
    const element = screen.getByText(/ошибка/i);
    expect(element).not.toBeNull();
  });

  test('should display error status', () => {
    render(
      <MockErrorDialog error={{ status: 400 }} />
    );
    const element = screen.queryByText(/ошибка 400/i);
    expect(element).toHaveTextContent('Ошибка 400');
  });
  
  test('should display error status message', () => {
    render(
      <MockErrorDialog error={{ status: 400 }} />
    );
    const element = screen.queryByText(errorStatusMessage[400]);
    expect(element).toHaveTextContent('Некорректный запрос');
  });

  test('should not be hidden', () => {
    render(
      <MockErrorDialog error={{ status: 400 }} />
    );
    const element = screen.getByText(errorStatusMessage[400]);
    expect(element.hidden).toBe(false);
  });
  
  test('`status: message` mapping should be correct', () => {
    const mapping = {
      400: 'Некорректный запрос',
      401: 'Требуется аутентификация',
      403: 'Запрещено',
      404: 'Не найден',
      408: 'Тайм-аут запроса',
      429: 'Слишком много запросов',
      500: 'Внутренняя ошибка сервера',
      501: 'Не реализовано',
      502: 'Плохой шлюз',
      503: 'Служба недоступна',
      504: 'Тайм-аут шлюза',
      'NetworkError when attempting to fetch resource.': 'Сетевая ошибка при попытке извлечения ресурса'
    };
    expect(errorStatusMessage).toStrictEqual(mapping);
  });
});
