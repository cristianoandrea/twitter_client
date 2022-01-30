import { Component } from 'react';
import TextField from '@mui/material/TextField';
import $ from 'jquery';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import FunctionButton from '../components/FunctionButton';
import SubmitButton from '../components/SubmitButton';
import ResponseDialog from '../components/ResponseDialog';



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


class ContestCard extends Component {
  constructor(props) {
    super(props);
    this.contest = props.contest;
    this.state = {
      dialogOpen: false
    }
    this.post = {
      tale: '',
      contest: this.contest.id
    }
  }

  textFieldChange(e) {
    var id = e.target.id;
    this.post[id] = e.target.value;
  }

  postSubmit() {
    console.log("post submit")
    $.post('http://localhost:5000/contests/tales', this.post, (response) => {
      console.log(response);
      if (response) {
        this.object = response;
        this.setState({
          dialogOpen: true,
          tale: response
        });
      }
    });
  }

  closeDialog() {
    this.setState({
      dialogOpen: false
    });
  }

  render() {
    return(
      <Card
        sx={{
          minWidth: 275,
          maxWidth:400,
          margin: 3
        }}
      >
        <CardHeader
          title={`${this.contest.name} (${this.contest.id})`}
        />
        <CardContent>
          <Typography>
            {`Organizzatore: ${this.contest.organizer}`}
          </Typography>
          <Typography>
            {`Racconti inseriti: ${this.contest.tales.length}`}
          </Typography>
        </CardContent>
        <CardActions>
          <TextField
            id="tale"
            label="Nuovo racconto"
            variant={'outlined'}
            onChange={this.textFieldChange.bind(this)}
            sx={{
              margin: 1
            }}
          />
          <Button
            id="submit-tale-button"
            size="small"
            onClick={this.postSubmit.bind(this)}
          >
            Aggiungi un racconto
          </Button>
        </CardActions>

        <ResponseDialog
          title={"Racconto inserito con successo!"}
          content={`Il racconto con id ${this.post.tale} è stato aggiunto al contest con id
            ${this.contest.id}. Ora vediamo quanti lo voteranno`}
          open={this.state.dialogOpen}
          close={this.closeDialog.bind(this)}
        />
      </Card>
    );
  }
}


class ContestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contests: []
    }
  }

  componentDidMount() {
    $.get('http://localhost:5000/contests', (response) => {
      if (response) {
        this.setState({
          contests: response
        });
        console.log(response);
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.contests.map((contest, idx) => {
          return (
            <ContestCard
              key={idx}
              contest={contest}
            />
          );
        })}
      </div>
    );
  }
}


class TaleInstantiator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      tale: {}
    }
    this.tale = {
      creator: '',
      text: ''
    };
  }


  closeDialog() {
    this.setState({
      dialogOpen: false
    })
  }


  registerTale() {
    $.post('http://localhost:5000/tales', this.tale, (response) => {
      console.log(response);
      if (response) {
        this.object = response;
        this.setState({
          dialogOpen: true,
          tale: response
        });
      }
    });
  }


  textFieldChange(e) {
    var id = e.target.id;
    this.tale[id] = e.target.value;
  }


  render() {
    //console.log(this.state.dialogOpen);
    var fields = {
      creator: 'Scrittore',
      text: 'Racconto'
    }

    return (
      <div>
        {Object.keys(fields).map((field, idx) => {
          return (
            <div key={idx}><TextField
              id={field}
              label={fields[field]}
              variant={'outlined'}
              onChange={this.textFieldChange.bind(this)}
              multiline
              rows={field==='text' ? 4 : 1}
              sx={{
                width: (field === 'text' ? "90%" : undefined),

                margin: 1
              }}
            /></div>
          );
        })}

        <SubmitButton
          onClick={this.registerTale.bind(this)}
        />

        <ResponseDialog
          title={"Racconto registrato con successo!"}
          content={`Abbiamo registrato il tuo racconto con l'id "${this.state.tale.id}", ora puoi cercare
          dei contest attivi e inserire il tuo racconto. Ti auguro di vincerne tanti!`}
          open={this.state.dialogOpen}
          close={this.closeDialog.bind(this)}
        />
      </div>
    );
  }
}


class ContestInstatiator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      contest: {}
    };
    this.contest = {
      organizer: '',
      name: ''
    };
    this.object = {};
  }

  closeDialog() {
    this.setState({dialogOpen: false});
  }

  textFieldChange(e) {
    var id = e.target.id;
    this.contest[id] = e.target.value;
  }

  registerContest() {
    $.post('http://localhost:5000/contests', this.contest, (response) => {
      console.log(response);
      if (response) {
        this.object = response;
        this.setState({
          dialogOpen: true,
          contest: response
        });
      }
    });
  }

  render() {
    //var ids = ['organizer', 'name'];
    //var tastis = ['Nome contest', 'Organizer'];
    var tastis = {
      organizer: 'Organizzatore',
      name: 'Nome contest'
    }

    return (
      <div>
        {Object.keys(tastis).map((tasti, idx) => {
          return (
            <TextField
              id={tasti}
              key={idx}
              label={tastis[tasti]}
              variant={'outlined'}
              onChange={this.textFieldChange.bind(this)}
              sx={{
                //width: "90%",
                margin: 1
              }}
            />
          );
        })}

        <SubmitButton
          onClick={this.registerContest.bind(this)}
        />

        <ResponseDialog
          title={"Concorso registrato con successo!"}
          content={`Abbiamo registrato il tuo concorso con l'id "${this.state.contest.id}", ora non ti resta
          che aspettare che qualche scrittore speranzioso lo trovi e decida di aggiungersi
          quindi cerca di pubblicizzarlo un po'!`}
          open={this.state.dialogOpen}
          close={this.closeDialog.bind(this)}
        />
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
