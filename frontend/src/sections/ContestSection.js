import { Component } from 'react';
import TextField from '@mui/material/TextField';
import $ from 'jquery';
import Button from '@mui/material/Button';

import FunctionButton from '../components/FunctionButton';



class ContestVisualizer extends Component {
  /*deve mostrare le informazioni di un contest specifico, quindi crearne
  una scheda e implementare il meccanismo di richiesta al server dato l'id
  di un contest*/

  render() {
    return (
      <div />
    );
  }
}


class VoteInstatiator extends Component {
  /*dev'esserci un form che permetta di registrare un tweet postato su
  twitter come voto ufficiale, in modo da tenere traccia dei massimo 10
  voti per contest. è il caso di farlo tra gli utlimi, dato che richiede
  altro lavoro anche sul server*/

  render() {
    return (
      <div />
    );
  }
}


class ContestList extends Component {
  /*questo componente deve fare una richiesta al server per ottenere la
  lista di tutti i contest e visualizzarne le informazioni, può essere
  utile definire un altro componente per creare la scheda di un singolo
  contest*/

  render() {
    return (
      <div />
    );
  }
}


class TaleInstantiator extends Component {
  /*Questo componente viene pressocché uguale a ContestInstatiator, quindi
  ci vuole qualche TextField per registrare l'utente twitter creatore per
  del racconto e uno multiline per contenuto del racconto*/

  render() {
    return (
      <div />
    );
  }
}


class ContestInstatiator extends Component {
  constructor(props) {
    super(props);
    this.contest = {
      organizer: '',
      name: ''
    };
  }


  textFieldChange(e) {
    var id = e.target.id;
    this.contest[id] = e.target.value;
  }

  registerContest() {
    $.post('http://localhost:5000/contests', this.contest, (response) => {
      console.log(response);
      //aggiungere l'inserimento del componente di risposta e siamo a posto
    });
  }

  render() {
    var ids = ['organizer', 'name'];
    var tastis = ['Nome contest', 'Organizer'];

    return (
      <div>
        {tastis.map((tasti, idx) => {
          return (
            <TextField
              id={ids[idx]}
              key={idx}
              label={tasti}
              variant={'outlined'}
              onChange={this.textFieldChange.bind(this)}
              sx={{
                width: "90%",
                marginTop: 1
              }}
            />
          );
        })}

        <div><Button
          variant="outlined"
          onClick={this.registerContest.bind(this)}
          sx={{
            marginTop: 2
          }}
        >
          Registra (senza cinepresa)
        </Button></div>
      </div>
    );
  }
}


class ContestSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: <div></div>
    };
  }

  addContest() {
    this.setState({body: <ContestInstatiator />});
  }

  addTale() {
    this.setState({body: <TaleInstantiator />});
  }

  searchContests() {
    this.setState({body: <ContestList />});
  }

  registerVote() {
    this.setState({body: <VoteInstatiator />});
  }

  checkContest() {
    this.setState({body: <ContestVisualizer />});
  }

  render() {
    var texts = [
      'Aggiungi concorso',
      'Registra un racconto',
      'Visualizza i contest',
      'Registra un voto',
      'Info di un concorso'
    ];
    var methods = [
      this.addContest.bind(this),
      this.addTale.bind(this),
      this.searchContests.bind(this),
      this.registerVote.bind(this),
      this.checkContest.bind(this)
    ];

    return (
      <div>
        {texts.map((text, idx) => {
          return (
            <FunctionButton
              key={idx}
              text={text}
              method={methods[idx]}
              isFirst={idx === 0}
            />
          );
        })}

        {this.state.body}
      </div>
    );
  }
}


export default ContestSection;
