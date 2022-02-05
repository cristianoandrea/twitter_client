import { render, screen } from '@testing-library/react';
import InputForm from '../sections/TwitterSection';
import ContestCard from '../sections/ContestSection';  //vedere se ho importato bene
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/dom'
//import WordCl from "./wordcloud"

/*
test('on initial render, the wordcloud button is disabled', ()=>{
  render(<WordCl/>)
  expect(screen.findByRole('button',{name:/Show WordCloud/i})).toBeDesabled();
  screen.debug();

})
*/

test('handles click content button correctly', () => {  //test user event, vede cosa succede quando l'user usa il componente
//test per controllo sul bottone filtro ricerca per contenuto
  render(<InputForm />)
  userEvent.click(screen.getByText('Contenuto'))
  expect(screen.getByLabelText('Contenuto')).toBeChecked()
})

test('handles click user button correctly', () => {  //test user event, vede cosa succede quando l'user usa il componente
//test per controllo filtro ricerca per nome utente
  render(<InputForm />)
  userEvent.click(screen.getByText('Utente'))
  expect(screen.getByLabelText('Utente')).toBeChecked()
})


test('handles click new story button correctly', () => {  //test user event, vede cosa succede quando l'user usa il componente
//test sul componente della sezione contest
  render(<ContestCard />)
  userEvent.click(screen.getById('submit-tale-button'))
  expect(screen.getById('submit-tale-button')).toBeChecked()
})
//test sul componente della sezione contest
fireEvent(  
  getByText(container, ' Aggiungi un racconto'),
  new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }),
)

test('handles click place button correctly', () => {  //test user event, vede cosa succede quando l'user usa il componente
//test per controllo filtro ricerca per luogo
  render(<FormControl />)
  userEvent.click(screen.getByText('Luogo'))
  expect(screen.getByLabelText('Luogo')).toBeChecked()
})

/*test('handles click hashtag button correctly', () => {  //test user event, vede cosa succede quando l'user usa il componente
//test per controllo filtro ricerca per hashtag
  render(<FormControl />)
  userEvent.click(screen.getByText('Hashtag'))
  expect(screen.getByLabelText('Hashtag')).toBeChecked()
})*/

/*test('has correct input value', () => {  //test che verifica se l'input è corretto
  render(<App />)
  expect(screen.getByRole('form')).toHaveFormValues({
    queryString: window.location.href.substr(index),
  })
})
*/
