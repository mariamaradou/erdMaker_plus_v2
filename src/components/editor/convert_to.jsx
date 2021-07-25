
import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import { connect } from "react-redux";
import {
  repositionComponents,
  resetMeta,
  modifyExtension,
  setParticipationDirection,
  setCardinalityDirection,
  setNotation,
  resetComponents,
  setComponents,
  setMeta,
  deselect,
} from "../../actions/actions";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const ConvertTo = (props) => {
 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const anchorRef = React.useRef(null);

  const options = [
    "Elmasri & Navathe Notation",
    "Min-Max/ISO Notation",
    "Information Engineering Notation",
    "Bachman Notation",
    "Barker Notation",
    "Batini, Ceri & Navathe Notation",
    "Teorey Notation",
    "Korth, Silberschatz & Sudarshan"
    /*"IDEF1X",
    "UML Notation"*/
  ];
 
  const [selectedIndex, setSelectedIndex] = React.useState(options.indexOf(props.components.notation));

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const changeDirection=(option)=>{
    switch (option) {
      case "Information Engineering Notation":
        props.setParticipationDirection({
          valuePart:'Look Across'
        })
        props.setCardinalityDirection({
          valueDir:'Look Across'
        })
        break;
      case "Elmasri & Navathe Notation":
        props.setParticipationDirection({
          valuePart:'Look Here'
        })
        props.setCardinalityDirection({
          valueDir:'Look Across'
        })
        break;
      case "Min-Max/ISO Notation":
        props.setParticipationDirection({
          valuePart:'Look Here'
        })
        props.setCardinalityDirection({
          valueDir:'Look Here'
        })
        break;
      case "Bachman Notation":
        props.setParticipationDirection({
          valuePart:'Look Here'
        })
        props.setCardinalityDirection({
          valueDir:'Look Across'
        })
        break;
      case "Barker Notation":
        props.setParticipationDirection({
          valuePart:'Look Here'
        })
        props.setCardinalityDirection({
          valueDir:'Look Across'
        })
        break;
      case "Batini, Ceri & Navathe Notation":
        props.setParticipationDirection({
          valuePart:'Look Here'
        })
        props.setCardinalityDirection({
          valueDir:'Look Here'
        })
        break;
      case "Teorey Notation":
        props.setParticipationDirection({
          valuePart:'Look Across'
        })
        props.setCardinalityDirection({
          valueDir:'Look Across'
        })
        break;
      case "Korth, Silberschatz & Sudarshan":
        props.setParticipationDirection({
          valuePart:'Look Here'
        })
        props.setCardinalityDirection({
          valueDir:'Look Across'
        })
        break;
      default:
        this.props.setParticipationDirection({
          valuePart:'Look Across'
        })
        this.props.setCardinalityDirection({
          valueDir:'Look Across'
        })
        break;
    }
    
  }
  
  const handleToggle = () => {
    
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    
    setOpen(false);
  };

  const changeNotation = (option)=> {
    props.components.extensions.map((extension)=>
     
    extension.type==='aggregation' && option!=='Teorey Notation'?
   
    props.modifyExtension({
      id: extension.id,
      prop: 'type',
      value: 'union',
    }):    props.modifyExtension({
      id: extension.id,
      prop: 'type',
      value: extension.type,
    })
    
    )

    props.components.extensions.map((extension)=>
     
    extension.type==='union' && option==='Teorey Notation'?
   
    props.modifyExtension({
      id: extension.id,
      prop: 'type',
      value: 'aggregation',
    }):    props.modifyExtension({
      id: extension.id,
      prop: 'type',
      value: extension.type,
    })
    )
    
  
    // elegxos gia to an pairnei n ary relationship to kathe notation
    if(props.components.relationships.length!==0){
    if( typeof props.components.relationships.find((relationship)=> relationship.connections.length<=2)!=='undefined'  ||
    (option!=="Information Engineering Notation" && option!=="Bachman Notation" && 
    option!=='Barker Notation')){
   
    props.setNotation({
      notation: option
  })
changeDirection(option) }
  else {
    console.log('this notation doesnt accept n ary relationships. ')
    handleClickOpenDialog()
    
  }
}else{ props.setNotation({
  notation: option
}) 
changeDirection(option)

  }

  
  }

  // Runs when user clicks to select file for import
  
  const handleMenuItemClick = (event, index) => {
    
    setSelectedIndex(index);
  
    setOpen(null);
   
  };

 

  // Return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
 
  
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
   
    prevOpen.current = open;

  }, [open]);

  return (
    
   
  
    <div className={classes.root}>
      <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"  The notation you have selected doesn't support n-ary relationships. "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A relationship in your ERD has up to 2 connections. Change your ERD and try again. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
           OK
          </Button>
         
        </DialogActions>
      </Dialog>
        <button
          className="tools-button-blue"
          ref={anchorRef}
          id='notation'
          name={props.components.notation}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={() => {
            
            props.deselect();
            handleToggle();
           
          }}
        >
           {/*options[selectedIndex]*/}
           {props.components.notation}
        </button>
        <Popper
          className="import-export-popper"
          open={Boolean(open)}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          //disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                <MenuList
        
                     id="menu-list-grow"
                    open={Boolean(open)}
                      onClose={handleClose}
                          >
                     {options.map((option, index) => (
                      <MenuItem key={option} onClick={
                        
                        (event) => {
                         
                          changeNotation(option)
                         
                      handleMenuItemClick(event, index)} } 
                     selected={index === selectedIndex  }>
                  
                   
                       {option}
                         </MenuItem>
                          ))}
                          </MenuList>
                  
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    </div>
  );
};

const mapStateToProps = (state) => ({
  components: state.components.present,
});

const mapDispatchToProps = {
  resetMeta,
  resetComponents,
  modifyExtension,
  setComponents,
  setParticipationDirection,
  setCardinalityDirection,
  repositionComponents,
  setMeta,
  setNotation,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConvertTo);
