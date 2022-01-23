import { Component } from 'react';
import Button from '@mui/material/Button';


class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = props.onClick
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
        Registra (senza cinepresa)
      </Button></div>
    );
  }
}

export default SubmitButton;
