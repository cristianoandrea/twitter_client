import { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import $ from 'jquery';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import TweetList from '../components/TweetList';



class TriviaInstatiator extends Component {
  constructor(props) {
    super(props);
    this.textFields = {
      quiz: '',
      right: '',
      wrongs: ['','','']
    }
    this.state = {
      dialogOpen: false,
      triviaId: '',
      triviaText: ''
    }
  }


  textFieldChange(e) {
    var id = e.target.id;
    if (id === 'right')
      this.textFields.right = e.target.value;
    else if(id.substr(0, id.length-1) === 'wrongs')
      this.textFields.wrongs[id.substr(id.length-1)] = e.target.value;
    else if(id === 'quiz')
      this.textFields.quiz = e.target.value;
  }

  submitTrivia() {
    console.log(this.textFields);
    $.post('http://localhost:5000/question', this.textFields, (response) => {
      console.log(response.suggested_text);
      this.setState({
        dialogOpen: true,
        triviaId: response.id,
        triviaText: response.suggested_text
      });
    })
  }

  closeDialog() {
    this.setState({dialogOpen: false});
  }

  render() {
    var ids = ['quiz', 'right', 'wrongs0', 'wrongs1', 'wrongs2'];
    var labels = ['Domanda', 'Risposta giusta', 'Risposta sbagliata', 'Risposta sbagliata', 'Risposta sbagliata'];
    return(
      <Box sx={{marginTop: 5}}>

        {ids.map((id, index) => {
          return (
            <TextField
              id={id}
              key={index}
              label={labels[index]}
              multiline={index === 0 ? true : false}
              variant={index === 0 ? 'outlined' : 'standard'}
              onChange={this.textFieldChange.bind(this)}
              sx={{
                width: '90%'
              }}
            />
          );
        })}

        {/*sto div serve per mettere il bottone sotto, altrimenti su schermi xl fa degli
          shenanigans*/}
        <div><Button
          variant="outlined"
          type="submit"
          onClick={this.submitTrivia.bind(this)}
          sx={{
            marginTop: 2
          }}
        >
          Aggiungi domanda
        </Button></div>


        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closeDialog.bind(this)}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            Trivia registrato con successo!
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              Abbiamo registrato il tuo trivia con l'id "{this.state.triviaId}", ora devi solo postare
              il tweet e aspettare le risposte. Noi ti suggeriamo il seguente testo
              (ricorda che qualsiasi cosa scrivi devi includere gli hashtag #IngSof2021qst
              #{this.state.triviaId} e che l'ordinamento delle risposte che useremo è quello che vedi):
            </Typography>
            <Typography gutterBottom
            style={{whiteSpace: 'pre-line'}}>
              {'\n'+this.state.triviaText}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog.bind(this)}>Chiudi</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}


class AnswersCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: -1
    }
    this.id = '';
  }

  textFieldChange(e) {
    this.id = e.target.value;
  }

  fetchAmount() {
    $.get(`http://localhost:5000/answers?triviaId=${this.id}`, (howMany) => {
      console.log(howMany);
      this.setState({answers: howMany});
    });
  }

  render() {
    return(
    <Box sx={{marginTop: 5}}>
        <div><TextField
          label="Codice domanda"
          variant="outlined"
          onChange={this.textFieldChange.bind(this)}
        /></div>

        <Button
          variant="outlined"
          onClick={this.fetchAmount.bind(this)}
          sx={{
            marginTop: 2
          }}
        >
          Conta
        </Button>

        <div>
          {this.state.answers === -1 ? '' : `Ci sono ${this.state.answers} risposte`}
        </div>
      </Box>
    );
  }
}


class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersLoaded: false,
      score: -1
    };
    this.answers = [];
    this.username = '';
  }

  updateUsername(e) {
    this.username = e.target.value;
  }

  fetchInfos() {
    //serve per riaggiornare la lista delle domande nel caso la pagina le avesse
    //già mostrate
    this.setState({answersLoaded: false});
    $.get(`http://localhost:5000/myAnswers?username=${this.username}`, (answers) => {
      this.answers = answers;
      console.log(answers);
      this.setState({answersLoaded: true});
      $.get(`http://localhost:5000/score?username=${this.username}`, (score) => {
        this.setState({score: score});
      });
    });
  }

  render() {
    return (
      <Box sx={{marginTop: 5}}>
        <div><TextField
          label="Username"
          variant="outlined"
          onChange={this.updateUsername.bind(this)}
        /></div>

        <Button
          variant="outlined"
          onClick={this.fetchInfos.bind(this)}
          sx={{
            marginTop: 2
          }}
        >
          Mostra
        </Button>

        <div>
          {this.state.score !== -1 ? `Il tuo punteggio è ${this.state.score}` : ''}

          {this.state.answersLoaded ? <TweetList tweets={this.answers} /> : ''}
        </div>
      </Box>
    );
  }
}


class TriviaSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: <div />
    }
  }

  componentDidMount() {

  }

  insertQuestion() {
    var newBody = <TriviaInstatiator />;
    this.setState({body: newBody});
  }

  countAnswers() {
    var newBody = <AnswersCounter />;
    this.setState({body: newBody});
  }

  showUserInfo() {
    this.setState({body: <UserInfo />});
  }

  render() {
    var methods = [
      this.insertQuestion.bind(this),
      this.countAnswers.bind(this),
      this.showUserInfo.bind(this)
    ];
    var texts = [
      'Aggiungi domanda',
      'Conta le risposte',
      'Informazioni utente'
    ]
    return(
      <div>
        {/*<Button
          variant="outlined"
          onClick={this.insertQuestion.bind(this)}
          sx={{
            marginTop: 2
          }}
        >
          Aggiungi domanda
        </Button>

        <Button
          variant="outlined"
          onClick={this.countAnswers.bind(this)}
          sx={{
            marginTop: 2
          }}
        >
          Conta le risposte
        </Button>

        <Button
          variant="outlined"
          onClick={this.showUserInfo.bind(this)}
          sx={{
            marginTop: 2
          }}
        >
          Informazioni utente
        </Button>*/}

        {texts.map((text, idx) => {
          return (
            <Button
              variant="outlined"
              onClick={methods[idx]}
              sx={idx == 1 ?
                {marginTop: 2, marginLeft: 2, marginRight: 2}
              :
                {marginTop: 2}
              }
            >
              {text}
            </Button>
          );
        })}

        {this.state.body}
      </div>
    );
  }
}


export default TriviaSection;
