import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import Tweet from './components/Tweet'


class InputForm extends Component {
  constructor(props) {
    super(props);
    this.father = props.father;
  }

  render() {
    return (
      <Box  sx={{ p: 2, marginTop: '3'}}>
        <form >
          <Grid container spacing={2} >
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend">Metodo di ricerca</FormLabel>
                <RadioGroup
                  aria-label="metodo di ricerca"
                  defaultValue="female"
                  name="mode"
                >
                  <FormControlLabel value="content" control={<Radio />} label="Contenuto" />
                  <FormControlLabel value="user" control={<Radio />} label="Utente" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TextField name="by" label="Standard" variant="standard" />
            </Grid>

            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >

              <Typography variant="body1" gutterBottom>
                <pre>Quantità    </pre>
              </Typography>
              <Slider
                aria-label="Always visible"
                defaultValue={10}
                step={1}
                label="Quanti"
                valueLabelDisplay="on"
                name="amount"
              />

            </Grid>

            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button variant="text" type="submit">Cerca</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetsLoaded: false
    }
    this.tweets = [
      {
        full_text: "ciao bello",
        user: {
          screen_name: "Fragolone"
        }
      },
      {
        full_text: "bella pirataaaaa",
        user: {
          screen_name: "LelloMcTello"
        }
      }
    ];
    this.tweets = [ ];
  }

  componentDidMount() {
    var index = window.location.href.indexOf('?');
    if (index != -1) {
      var queryString = window.location.href.substr(index);
      fetch(`/tweets${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.tweets = data;
          this.setState({tweetsLoaded: true});
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  render() {
    return (
      <div className="App">
        {/*}<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>*/}
        <InputForm father={this}/ >
        <List component="nav" aria-label="mailbox folders">
          {this.tweets.map((tweet, index) => {
            return (
              <div>
                <ListItem button>
                  <Tweet content={tweet}></Tweet>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}


export default App;
