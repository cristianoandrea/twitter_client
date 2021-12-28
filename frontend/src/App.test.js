import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';
/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
test('has correct input value', () => {  //test che verifica se l'input è corretto
  render(<App />)
  expect(screen.getByRole('form')).toHaveFormValues({
    //firstName: 'John',
    //lastName: 'Doe',
  })
})

test('handles click correctly', () => {  //test user event, vede cosa succede quando l'user usa il componente
  render(<FormControl />)

  userEvent.click(screen.getByText('Contenuto'))
  expect(screen.getByLabelText('Contenuto')).toBeChecked()
})
