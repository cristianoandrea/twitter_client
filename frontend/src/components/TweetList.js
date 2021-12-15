import { Component } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { FixedSizeList } from 'react-window';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

import Tweet from './Tweet';

class TweetList extends Component {
  constructor(props) {
    super(props);
    this.tweets = props.tweets;
  }

  render() {
    return (
        <List>
          {this.tweets.map((tweet, index) => {
            return (
              <div>
                <ListItem key={index}>
                  <Tweet content={tweet}></Tweet>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
    );
  }
}

export default TweetList;
