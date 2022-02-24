import { Component } from 'react';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import TweetList from '../components/TweetList';



//const url="http://127.0.0.1:5000/stream?by=";




class StreamSection extends Component{
    constructor(props) {
        super(props)
        this.state={
            tweetsLoaded:false,
        }

    this.tweets=[];


    }

    fetchData = ()=>{
            var index = window.location.href.indexOf('?');
            console.log("eheh..")
            //var queryString = window.location.href.substr(index);
            var queryString= "?by=roma"
            fetch("http://127.0.0.1:5000/stream"+ queryString,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
            }
            })
            .then(response => response.json())
            .then(data => {
                console.log("chissà....")
                console.log(data);
                this.tweets.append(data)
            })
            .catch(e => {
                console.log("diocane.....")
                console.log(e);
            });
        }


         componentDidMount(){

            //await this.fetchData();

            setInterval(()=>{
              this.fetchData()
            }, 5000*2);

        }

    render(){

        return(
            <div>

                <form method="GET" action="/stream">

                    <TextField name="by" label="Standard" variant="standard" />


                    <Button>Search</Button>
                    <Button>Stop</Button>

                </form>



            </div>
        );

    }

}


export default StreamSection


//<TweetList tweets={this.tweet}></TweetList>


/*
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





*/
