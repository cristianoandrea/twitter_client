import { Component } from 'react';
import TextField from '@mui/material/TextField';
import $ from 'jquery'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import TweetList from '../components/TweetList';
import Divider from '@mui/material/Divider';
import Tweet from '../components/Tweet';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';



//const url="http://127.0.0.1:5000/stream?by=";




class StreamSection extends Component{
    constructor(props) {
        super(props)
        this.state={
            tweetsLoaded: 0
        }
        this.tweets=[]

    }



        getjson(){
            var count=0
            var queryString= "?by=roma"
            $.get("http://127.0.0.1:5000/data" , (data)=>{
                count++;
                  //console.log("IN ARRIVO!!!!!!!")
                  console.log(data)
                  data.map(tweet=>{
                    this.tweets.push(tweet)
                  })
                  this.setState({tweetsLoaded: count})
                  
              }).catch(e => {
                  console.log("diocane.....")
                  console.log(e);
              });

        }


          componentDidMount(){

            console.log("pippos")
            
            $.get("http://127.0.0.1:5000/stream")
            this.getjson()

            setInterval(()=>{

              this.getjson()

            }, 5000);
            
           }


    render(){



        return(
            <div className="robaccia">
                <Divider/>
                

                <List>

                {this.tweets.map((tweet, index) => {
                  return (
                    <div>
                      
                      <ListItem key={index}>
                        <Tweet content={tweet}>
                        </Tweet>

                      </ListItem>
                    <Divider/>
                    </div>
                  );
                })}




        </List>

            </div>
        )

    }

}


export default StreamSection


//<TweetList tweets={this.tweet}></TweetList>


/*
<form method="GET" action="/stream">

    <TextField name="by" label="Standard" variant="standard" />


    <Button>Search</Button>
    <Button>Stop</Button>

</form>


var index = window.location.href.indexOf('?');
        if (index !== -1){
            var queryString = window.location.href.substr(index);
            fetch('http://localhost:5000/stream${queryString}',{
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


        {this.tweets.map((tweet, index) => {
          return (
            <div>

              <ListItem key={index}>
                <Tweet content={tweet}>
                </Tweet>

              </ListItem>
            <Divider/>
            </div>
          );
        })}


*/
