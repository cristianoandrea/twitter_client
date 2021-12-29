import { Component } from 'react';
import Button from '@mui/material/Button';
import WordCloud from 'react-d3-cloud';

class WordCl extends Component {
  constructor(props) {
    super(props);
    //ricorda che esiste questa variabile con integrazioni comode
    //con this.setState({...})
    this.state = {
      check:false
    }
    this.tweets = props.tweets;
    this.wordcl = [];
    this.toggleState = this.toggleState.bind(this);
  }

  funztemp(text) {
    let phrase = '';
    for(var i in text) {
      phrase += text[i].full_text;
      phrase += ' ';
    }

      function count(str) {
         /*const data = [];

         str.split(" ").forEach((el, i, arr) => {
           if(data.length === 0){

             data.push({text :el, value : 1})
           }
           const found = data.some(ok => ok.text === el );
           if(!found) {
             data.push({text :el, value : 1})
           }
           else {
             let objIndex = data.findIndex((ok => ok.text === el));
             data[objIndex].value += 1
           }
         });*/

         var data = [];
         //la parola letta attualmente
         var word = '';
         //i caratteri che spezzano parole
         var breakpoints = [' ', '.', ',', '!', '?', '^', '\'', '"', '\n', '\r', '\t'];
         for (var i=0; i < str.length; i++) {
           var char = str.charAt(i);
           if (breakpoints.includes(char)) {
             if (word.length > 0) {
               var wordIndex = data.findIndex((ok => ok.text === word));
               //se la parola ancora non c'è la si inserisce come nuova
               if (wordIndex === -1)
                data.push({text: word, value: 1});
               //se è già stata inserita ne si incrementa il valore
               else {
                 data[wordIndex].value += 1;
               }
               word = '';
             }
           }
           else {
             word += char;
           }
         }

         return data;
      }

    let finaldestination = count(phrase.toLowerCase());
    return finaldestination;
  }

  toggleState(){
    this.setState({check:!this.state.check})
  }

  componentDidMount() {
  }

  render() {
    this.wordcl= this.funztemp(this.tweets);
    return(
      <div className="WordCloud">
      <Button variant="contained" onClick={this.toggleState}>Show WordCloud</Button>
      { this.state.check?
        <WordCloud data={this.wordcl}
                  fontSize={(word) => Math.log2(word.value) * 15}
                  width={600}
                  height={300}
                  font="Roboto"
                  //fontStyle="italic"
                  //fontWeight="bold"
                />
      :
        ''
      }

    </div>

     );
    }


}

export default WordCl;
