import { Component } from 'react';
import Button from '@mui/material/Button';
import { PieChart, Pie, Cell, Tooltip,Line} from 'recharts';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Tweet from './Tweet';



class Sent extends Component {
  constructor(props) {
    super(props);
    //ricorda che esiste questa variabile con integrazioni comode
    //con this.setState({...})
    this.state = {
      check:false,
      activeIndex: 0,
      showIndex: ''
    }
    this.tweets = props.tweets;
    this.toggleState = this.toggleState.bind(this);
    this.perc = [];
    this.COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  }

  toggleState(){
    this.setState({check:!this.state.check})
  }


  get_sent_freq(text) {
    var neutral = 0;
    var positive = 0;
    var negative = 0;
    var data = [];
    for(var i in text) {
      if(text[i].sentiment == 'neutral') neutral ++;
      else if(text[i].sentiment == 'positive') positive ++;
      else {negative ++}
    }
    data.push({
    name:   "positive",
    number: positive
  },{
    name:   "neutral",
    number: neutral
  },{
    name:   "negative",
    number: negative
    });
    return data;
  }

  toggleIndex(text){
    this.setState({showIndex:text})
  }

  onPieClick = (index, data) => {
    console.log('onPieClick '+index.name);
    this.toggleIndex(index.name.toString());
    console.log(this.state.showIndex)

}


  componentDidMount() {

  }


  render() {
    this.perc = this.get_sent_freq(this.tweets);

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, mode}) => {
    let radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    let x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    let y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    return (
     <g style={{ pointerEvents: 'none' }}>
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} fontSize="12" dominantBaseline="central">
                {(percent * 100).toFixed(2)}%
            </text>
        </g>
    )};
    return(
      <div className="Sentiment">
      <Button variant="contained" onClick={this.toggleState}>Show Sentiment</Button>
      { this.state.check?
        <Grid container spacing={2}>
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        >
          <PieChart width={700} height={700}>
            <Pie data={this.perc}  activeIndex={this.state.activeIndex} dataKey="number"  outerRadius={150} fill="green" onMouseEnter={this.onPieEnter} label={renderCustomizedLabel} onClick={this.onPieClick}>
            {this.perc.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <List>
            {this.tweets.map((tweet, index) => {
              return (
                <div>
                  {this.state.showIndex == tweet.sentiment ?
                  <ListItem key={index}>
                    <Tweet content={tweet}>
                    </Tweet>
                    
                  </ListItem>
                  :
                   ''
                }
                  <Divider/>
                </div>
              );
            })}
          </List>
        </Grid>
        </Grid>



      :
        ''
      }


    </div>

     );
    }


}

export default Sent;
