import { render, screen } from '@testing-library/react';
import FormAlert from '../FormAlert';
import { apiFields } from '../../../utils/constants';


describe('Unit tests: FormAlert component with common error', () => {
  test('should appear in page', () => {
    const message = { severity: 'error', text: 'Error message' };
    render(
      <FormAlert message={message} />
    );
    const element = screen.queryByRole('alert');
    expect(element).not.toBeNull();
  });
  
  test('should display error icon (severity="error")', () => {
    const message = { severity: 'error', text: 'Error message' };
    render(
      <FormAlert message={message} />
    );
    const element = screen.queryByTestId('ErrorOutlineIcon');
    expect(element).not.toBeNull();
  });

  test('should correctly display message.text', () => {
    const message = { severity: 'error', text: 'Error message' };
    render(
      <FormAlert message={message} />
    );
    const element = screen.queryByText(/error message/i);
    expect(element).toHaveTextContent('Error message');
  });
});

describe('Unit tests: FormAlert component with api error', () => {
  test('should appear in page', () => {
    const message = { data: {email: ['This field is required']} };
    render(
      <FormAlert message={message} />
    );
    const element = screen.queryAllByRole('alert');
    expect(element.length).toBe(1);
  });
  
  test('should display error icon (severity="error")', () => {
    const message = { data: {email: ['This field is required']} };
    render(
      <FormAlert message={message} />
    );
    const element = screen.queryByTestId('ErrorOutlineIcon');
    expect(element).not.toBeNull();
  });
  
  test('should correctly construct error message', () => {
    const message = { data: {email: ['This field is required']} };
    render(
      <FormAlert message={message} />
    );
    const element = screen.queryByText('Адрес электронной почты: This field is required');
    expect(element).not.toBeNull();
  });
  
  test('should display 2 error messages', () => {
    const message = {
      data:
      {
        email: ['This field is required'],
        password: ['This field is required']
      }
    };
    render(
      <FormAlert message={message} />
    );
    const element = screen.queryAllByRole('alert');
    expect(element.length).toBe(2);
  });
  
  test('api fields translation should be correct', () => {
    const translation = {
      first_name: 'Имя',
      middle_name: 'Отчество',
      last_name: 'Фамилия',
      email: 'Адрес электронной почты',
      phone: 'Номер телефона',
      photo: 'Фото',
      password: 'Пароль',
      new_password: 'Новый пароль',
      re_password: 'Повторить новый пароль'
    };
    expect(apiFields).toStrictEqual(translation);
  });
});
