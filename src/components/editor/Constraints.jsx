import React  from "react";

import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {
  repositionComponents,
 // displayRelationship,
  resetMeta,
  setParticipationDirection,
  setCardinalityDirection,
  resetComponents,
  setComponents,
  setMeta,
  deselect,
} from "../../actions/actions";
//import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const ConstraintsButton = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  /*const handleClose = (event) => {
    //if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //  return;
    //}
    setOpen(false);
  };*/

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  
  function Cardinality(){
    switch (props.components.notation) {
      case "Information Engineering Notation":
        var cardinality = 'Look Across';
        break;
      case "Elmasri & Navathe Notation":
        cardinality = 'Look Across';
        break;
      case "Min-Max/ISO Notation":
        cardinality = 'Look Here';
        break;
      case "Bachman Notation":
        cardinality = 'Look Across';
        break;
      case "Barker Notation":
        cardinality = 'Look Across';
        break;
      case "Batini, Ceri & Navathe Notation":
        cardinality = 'Look Here';
        break;
      case "Teorey Notation":
        cardinality = 'Look Across';
        break;
      case "Korth, Silberschatz & Sudarshan":
        cardinality = 'Look Across'
        break;
      default:
        cardinality = 'Look Across';
        break;
    }
    return cardinality;
  }

  function Participation(){
    switch (props.components.notation) {
      case "Information Engineering Notation":
        var participation = 'Look Across';
        break;
      case "Elmasri & Navathe Notation":
        participation = 'Look Here';
        break;
      case "Min-Max/ISO Notation":
        participation = 'Look Here';
        break;
      case "Bachman Notation":
        participation = 'Look Here';
        break;
      case "Barker Notation":
        participation = 'Look Here';
        break;
      case "Batini, Ceri & Navathe Notation":
        participation = 'Look Here';
        break;
      case "Teorey Notation":
        participation = 'Look Across';
        break;
      case "Korth, Silberschatz & Sudarshan":
        participation = 'Look Here'
        break;
      default:
        participation = 'Look Here';
        break;
    }
    return participation;
  }
 

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
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={() => {
            props.deselect();
            handleToggle();
          }}
        >
        {/*  <SettingsIcon style={{ fontSize: 17 }}></SettingsIcon> */}
        Constraints
        </button>
        <Popper
          className="import-export-popper"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          //disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >

                    <MenuItem>
                      <label>
                      
                        Cardinality: { props.components.cardinalityDirection}
                       
                      </label>
                    </MenuItem>
                    <MenuItem>
                      <label>
                       
                         Participation:  { props.components.participationDirection}
                       
                      </label>
                    </MenuItem>
                  </MenuList>
                
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
  setParticipationDirection,
  setCardinalityDirection,
 // displayRelationship,
  setMeta,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintsButton);
