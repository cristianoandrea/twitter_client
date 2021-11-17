import { Component } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.tweet = props.content;
  }

  render() {
    return (
      <Box component="span" sx={{ p: 2}}>
        <Typography variant="h5" gutterBottom component="div">
          @{this.tweet.user.screen_name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {this.tweet.full_text}
        </Typography>
      </Box>
    );
  }
}

export default Tweet;
