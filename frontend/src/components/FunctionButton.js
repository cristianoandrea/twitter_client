import { Component } from 'react';
import Button from '@mui/material/Button';


class FunctionButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = props.method;
    this.text = props.text;
    
  }

  render() {
    return (
      <div><Button
        variant="outlined"
        onClick={this.onClick}
        sx={{
          marginTop: 2
        }}
      >
        {this.text}
      </Button></div>
    );
  }
}

export default FunctionButton;
