import { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';



class TriviaInstatiator extends Component {


  render() {
    return(
      <form action="http://localhost:5000/question" method="POST">
        <TextField
         sx={{marginTop: 5}}
          label="Domanda"
          name="quiz"
          multiline
          variant="outlined"
          sx={{
            width: '90%'
          }}
        />

        {[0,1,2,3].map((idx) => {
          return (
            <TextField
              label={idx == 0 ? "Risposta giusta" : "Risposta sbagliata"}
              name={idx == 0 ? "right" : "wrongs"}
              variant="standard"
              sx={{
                width: '90%'
              }}
            />
          );
        })}

        <Button
          variant="outlined"
          type="submit"
          sx={{
            marginTop: 2
          }}
        >
          Aggiungi domanda
        </Button>
      </form>
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

  render() {
    return(
      <div>
        <Button
          variant="outlined"
          onClick={this.insertQuestion.bind(this)}
          sx={{
            margin: 2
          }}
        >
          Aggiungi domanda
        </Button>

        <Button
          variant="outlined"
          onClick={this.insertQuestion.bind(this)}
        >
          Altro che poi ci pensiamo
        </Button>

        {this.state.body}
      </div>
    );
  }
}


export default TriviaSection;
