import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';



function ResponseDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          {props.content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close}>Chiudi</Button>
      </DialogActions>
    </Dialog>
  );
}


export default ResponseDialog;
