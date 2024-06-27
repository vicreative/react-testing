import { render, screen } from '../../test-utils';
import { Greet } from './Greet';

/**
 * Greet should render the text hello and if a name is passed into the component
 * It should render hello followed by the name
 */

describe('Greet', () => {
  test('renders correctly', () => {
    render(<Greet />);
    const textElement = screen.getByText(/hello/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders with a name', () => {
    render(<Greet name="Victory" />);
    const textElement = screen.getByText('Hello Victory');
    expect(textElement).toBeInTheDocument();
  });
});
