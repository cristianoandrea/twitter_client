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
    queryString: window.location.href.substr(index),
  })
})

test('handles click button content correctly', () => {  //test user event, vede cosa succede quando l'user usa il componente
//test per controllo sul bottone filtro ricerca per contenuto
  render(<FormControl />)
  userEvent.click(screen.getByText('Contenuto'))
  expect(screen.getByLabelText('Contenuto')).toBeChecked()
})

test('handles click button user correctly', () => {  //test user event, vede cosa succede quando l'user usa il componente
//test per controllo filtro ricerca per nome utente
  render(<FormControl />)
  userEvent.click(screen.getByText('Utente'))
  expect(screen.getByLabelText('Utente')).toBeChecked()
})
