import { render, screen } from '@testing-library/react';
import Title from '../Title';


test('Should render same text passed as children', () => {
  render(
    <Title>title</Title>
  );
  const titleElement = screen.getByText(/title/i);
  // console.log(titleElement.textContent);
  expect(titleElement).toBeInTheDocument();
});

test('Title should be h2 html element', () => {
  render(
    <Title>title</Title>
  );
  const titleElement = screen.getByText(/title/i);
  // console.log(titleElement.tagName);
  expect(titleElement.tagName).toBe('H2');
});

test('Title should be visible', () => {
  render(
    <Title>title</Title>
  );
  const titleElement = screen.getByText(/title/i);
  // console.log(titleElement.hidden);
  // expect(titleElement.hidden).toBe(false);
  expect(titleElement).toBeVisible();
});