import { render, screen } from '../../test-utils';
import { Application } from './Application';

describe('Application', () => {
  test('renders correctly', () => {
    render(<Application />);

    const pageHeading = screen.getByRole('heading', {
      level: 1
    });
    expect(pageHeading).toBeInTheDocument();

    const sectionHeading = screen.getByRole('heading', {
      level: 2
    });
    expect(sectionHeading).toBeInTheDocument();

    const paragraphElememt = screen.getByText(/^All fields are mandatory$/i);
    expect(paragraphElememt).toBeInTheDocument();

    const closeElement = screen.getByTitle('close');
    expect(closeElement).toBeInTheDocument();

    const imageElement = screen.getByAltText('a person with a laptop');
    expect(imageElement).toBeInTheDocument();

    const customElement = screen.getByTestId('TestId__CUSTOMELEMENT');
    expect(customElement).toBeInTheDocument();

    const nameElement = screen.getByRole('textbox', {
      name: 'Name'
    });
    expect(nameElement).toBeInTheDocument();

    const nameElement2 = screen.getByLabelText('Name', {
      selector: 'input'
    });
    expect(nameElement2).toBeInTheDocument();

    const nameElement3 = screen.getByPlaceholderText('Fullname');
    expect(nameElement3).toBeInTheDocument();

    const nameElement4 = screen.getByDisplayValue('Vishwas');
    expect(nameElement4).toBeInTheDocument();

    const bioElement = screen.getByRole('textbox', {
      name: 'Bio'
    });
    expect(bioElement).toBeInTheDocument();

    const jobLocationElement = screen.getByRole('combobox');
    expect(jobLocationElement).toBeInTheDocument();

    const termsElement = screen.getByRole('checkbox');
    expect(termsElement).toBeInTheDocument();

    const termsLabelElement = screen.getByLabelText('I agree to the terms and conditions');
    expect(termsLabelElement).toBeInTheDocument();

    const submitButtonElement = screen.getByRole('button');
    expect(submitButtonElement).toBeInTheDocument();
    expect(submitButtonElement).toBeDisabled();
  });
});
