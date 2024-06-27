// import { logRoles } from '@testing-library/react';
import { render, screen } from '../../test-utils';
import { Skills } from './Skills';

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavaScript'];

  test('renders correctly', () => {
    render(<Skills skills={skills} />);
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  test('renders a list of skills', () => {
    render(<Skills skills={skills} />);
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(skills.length);
  });

  test('renders login button', () => {
    render(<Skills skills={skills} />);
    const loginButtonElement = screen.getByRole('button', {
      name: 'Login'
    });
    expect(loginButtonElement).toBeInTheDocument();
  });

  test('Start learning button is not rendered', () => {
    render(<Skills skills={skills} />);
    const startLearningButtonElement = screen.queryByRole('button', {
      name: 'Start learning'
    });
    expect(startLearningButtonElement).not.toBeInTheDocument();
  });

  test('Start learning is eventually displayed', async () => {
    render(<Skills skills={skills} />);
    // const view = render(<Skills skills={skills} />);
    // logRoles(view.container);
    // screen.debug();
    const startLearningButtonElement = await screen.findByRole(
      'button',
      {
        name: 'Start learning'
      },
      { timeout: 2000 }
    );
    // screen.debug();
    expect(startLearningButtonElement).toBeInTheDocument();
  });
});
