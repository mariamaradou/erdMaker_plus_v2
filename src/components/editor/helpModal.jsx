import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
//import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
//import IconButton from "@material-ui/core/IconButton";
//import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { deselect, select} from "../../actions/actions";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({

 
  dialog: {
    position: "absolute",
    
    left: 220,
    top: 50,
  
    width:'20%'
  }
});


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

function HelpModal(props) {
  const [open, setOpen] = React.useState(props.meta.modal);
  const classes = useStyles();
  
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      
      <Dialog 
        classes={{
          paper: classes.dialog
        }}
        onClose={handleClose}
        
        open={  open}
      >
      
        <DialogContent dividers>
          <Typography gutterBottom>Press Help button for more info about erdMaker properties, keyboard shortcuts, ERD theory and more. </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
    components: state.components.present,
    selector: state.selector,
    meta:state.meta
  });
  
  const mapDispatchToProps = {
    
    deselect,
    select
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(HelpModal);