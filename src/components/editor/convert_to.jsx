
import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {
  repositionComponents,
  resetMeta,
  setNotation,
  resetComponents,
  setComponents,
  setMeta,
  deselect,
} from "../../actions/actions";


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
  const anchorRef = React.useRef(null);

  const options = [
    "Chen Notation",
    "Min-Max/ISO Notation",
    "Crow's foot Notation",
    "Bachman Notation",
    "Barker Notation",
    "Batini, Ceri & Navathe Notation",
    "Teorey Notation"
    /*"IDEF1X",
    "UML Notation"*/
  ];
 
  const [selectedIndex, setSelectedIndex] = React.useState(options.indexOf(props.components.notation));

  
  
  const handleToggle = () => {
    
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    //if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //  return;
    //}
    setOpen(false);
  };

  

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
                          
                          props.setNotation({
                              notation: option
                          });
                          
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
  setComponents,
  repositionComponents,
  setMeta,
  setNotation,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConvertTo);
