import './App.css';
import { Component } from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import TweetList from './components/TweetList';
import WordCloud from './components/WordCloud';


class InputForm extends Component {
  constructor(props) {
    super(props);
    //this.father = props.father;
  }

  render() {
    return (
      <Box  sx={{ p: 2, marginTop: '3'}}>
        <form method="GET" action="/">
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
                  <FormControlLabel value="content" control={<Radio />} label="Contenuto" checked/>
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

              <Typography
                variant="body1"
                gutterBottom
                sx={{marginRight: 2}}
              >
                Quantità
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


class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetsLoaded: false,
      viewMethod: '',
      viewContent: ''
    }
    //la lista dei tweet ottenuti
    this.tweets = [ ];

    //possibili metodi di visualizzazione dei risultati
    this.displayMethods = [
      "tweet", "wordCloud", "map"
    ]
    this.displayMethodsPrettyfied = {
      tweet: "Tweet",
      wordCloud: "Word Cloud",
      map: "Mappa"
    }
  }

  componentDidMount() {
    var index = window.location.href.indexOf('?');
    if (index !== -1) {
      var queryString = window.location.href.substr(index);
      fetch(`http://localhost:5000/tweets${queryString}`, {
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

  swapViewMethod(event) {
    console.log(event);
    var updateView = {};

    updateView.viewMethod = event.target.value;
    switch (event.target.value) {
      case "tweet":
        updateView.viewContent = <TweetList tweets={this.tweets} />;
        break;
      case "wordCloud":
        updateView.viewContent = <TweetList tweets={this.tweets} />;
        break;
      default:
        break;
    }
    this.setState(updateView);
  }

  render() {
    return (
      <div className="App">
        {/*componente che permette di selezionare i filtri per i tweet da mostrare*/}
        <InputForm father={this}/ >

        <Grid container>
          <Grid item xs={12} md={2}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="view-method-select-label">Visualizzazione</InputLabel>
              <Select
                labelId="view-method-select-label"
                id="view-method-select"
                label="Visualizzazione"
                value={this.state.viewMethod}
                onChange={this.swapViewMethod.bind(this)}
              >
                {this.displayMethods.map((method) => {
                  return (
                    <MenuItem value={method}>{this.displayMethodsPrettyfied[method]}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          </Grid>

          <Grid item xs={12} md={10}>
            {this.state.viewContent}
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default Controller;
