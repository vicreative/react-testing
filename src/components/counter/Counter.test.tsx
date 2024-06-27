import { render, screen } from '../../test-utils';
import user from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
  test('should render correctly', () => {
    render(<Counter />);
    const countElement = screen.getByRole('heading');
    expect(countElement).toBeInTheDocument();

    const incrementButton = screen.getByRole('button', {
      name: 'Increment'
    });
    expect(incrementButton).toBeInTheDocument();
  });

  test('renders an initial count of 0', () => {
    render(<Counter />);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('0');
  });

  test('renders a count of 1 after clicking increment button', async () => {
    user.setup();
    render(<Counter />);
    const incrementButton = screen.getByRole('button', {
      name: 'Increment'
    });
    await user.click(incrementButton);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('1');
  });

  test('renders a count of 2 after clicking increment button twice', async () => {
    user.setup();
    render(<Counter />);
    const incrementButton = screen.getByRole('button', {
      name: 'Increment'
    });
    await user.dblClick(incrementButton);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('2');
  });

  test('renders a count of 10 after clicking the set button', async () => {
    user.setup();
    render(<Counter />);
    const amountInput = screen.getByRole('spinbutton');
    await user.type(amountInput, '10');
    expect(amountInput).toHaveValue(10);
    const setButton = screen.getByRole('button', {
      name: 'Set'
    });
    await user.click(setButton);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('10');
  });

  test('elements are focused in the right order', async () => {
    user.setup();
    render(<Counter />);
    const amountInput = screen.getByRole('spinbutton');
    const setButton = screen.getByRole('button', {
      name: 'Set'
    });
    const incrementButton = screen.getByRole('button', {
      name: 'Increment'
    });
    await user.tab();
    expect(incrementButton).toHaveFocus();
    await user.tab();
    expect(amountInput).toHaveFocus();
    await user.tab();
    expect(setButton).toHaveFocus();
  });

  test('clear', async () => {
    user.setup();
    render(<textarea defaultValue="Hello World!" />);
    await user.clear(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('selectOptions', async () => {
    user.setup();
    render(
      <select multiple>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );

    const selectElement = screen.getByRole('listbox') as HTMLSelectElement;
    await user.selectOptions(selectElement, ['1', 'C']);

    const optionA = screen.getByRole('option', {
      name: 'A'
    }) as HTMLOptionElement;
    const optionB = screen.getByRole('option', {
      name: 'B'
    }) as HTMLOptionElement;
    const optionC = screen.getByRole('option', {
      name: 'C'
    }) as HTMLOptionElement;

    expect(optionA.selected).toBe(true);
    expect(optionB.selected).toBe(false);
    expect(optionC.selected).toBe(true);
  });

  test('deselectOptions', async () => {
    user.setup();

    render(
      <select multiple defaultValue={['2']}>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );

    const selectElement = screen.getByRole('listbox') as HTMLSelectElement;
    await user.deselectOptions(selectElement, '2');

    const optionB = screen.getByRole('option', {
      name: 'B'
    }) as HTMLOptionElement;

    expect(optionB.selected).toBe(false);
  });

  test('upload file', async () => {
    user.setup();

    render(
      <div>
        <label htmlFor="file-uploader">Upload file:</label>
        <input id="file-uploader" type="file" />
      </div>
    );
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload file/i) as HTMLInputElement;

    await user.upload(input, file);

    if (input.files) {
      expect(input.files[0]).toBe(file);
      expect(input.files.item(0)).toBe(file);
      expect(input.files).toHaveLength(1);
    } else {
      throw new Error('File upload failed: input.files is null');
    }
  });

  test('upload multiple files', async () => {
    user.setup();

    render(
      <div>
        <label htmlFor="file-uploader">Upload file:</label>
        <input id="file-uploader" type="file" multiple />
      </div>
    );
    const files = [
      new File(['hello'], 'hello.png', { type: 'image/png' }),
      new File(['there'], 'there.png', { type: 'image/png' })
    ];
    const input = screen.getByLabelText(/upload file/i) as HTMLInputElement;

    await user.upload(input, files);

    if (input.files) {
      expect(input.files).toHaveLength(2);
      expect(input.files[0]).toBe(files[0]);
      expect(input.files[1]).toBe(files[1]);
    }
  });
});
