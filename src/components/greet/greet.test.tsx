import React from 'react';
import { render, screen } from '@testing-library/react';
import { Greet } from './greet';

/**
 * Greet should render the text hello and if a name is passed into the component
 * It should render hello followed by the name
 */

describe('Greet', () => {
  test('renders correctly', () => {
    render(<Greet />);
    const textElement = screen.getByText('Hello');
    expect(textElement).toBeInTheDocument();
  });

  test('renders with a name', () => {
    render(<Greet name='Victory' />);
    const textElement = screen.getByText('Hello Victory');
    expect(textElement).toBeInTheDocument();
  });
});
