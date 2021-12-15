import { Component } from 'react';



class WordCloud extends Component {
  constructor(props) {
    super(props);
    //ricorda che esiste questa variabile con integrazioni comode
    //con this.setState({...})
    this.state = {

    }
    this.tweets = props.tweets;
  }

  componentDidMount() {
    /*se hai bisogno di fare qualche operazione prima che il componente
    venga renderizzato puoi farle qui dentro*/
  }

  render() {
    return('');
  }
}

export default WordCloud;
