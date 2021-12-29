import { Component } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

class Tweet extends Component {
  constructor(props) {
    super(props);
    this.tweet = props.content;
  }

  render() {
    /*<Box component="span" sx={{ p: 2}}>
      <Typography variant="h5" gutterBottom component="div">
        @{this.tweet.user.screen_name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {this.tweet.full_text}
      </Typography>
    </Box>*/
    /*}<CardMedia
      component="img"
      height="194"
      image="/static/images/cards/paella.jpg"
      alt="Paella dish"
    />*/
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar src={this.tweet.user.profile_image_url_https} />
          }
          title={this.tweet.user.screen_name}
        />

        <CardContent>
          <Typography variant="body2">
            {this.tweet.full_text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Tweet;
