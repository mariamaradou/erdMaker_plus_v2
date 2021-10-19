import React  from "react";
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
 // displayRelationship,
  resetMeta,
  setParticipationDirection,
  setCardinalityDirection,
  hideAttributes,
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

  const handleClose = (event) => {
    //if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //  return;
    //}
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  
  function hideAttribute(e){
    props.hideAttributes({
     
      hide: e.target.checked,
    });
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
              <ClickAwayListener onClickAway={handleClose}>
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
                    <MenuItem>
                    <label>
                    < input type='checkbox' name='hideAttribute' value='hide'   
                    checked={props.components.hideAttribute}
                    onChange={(e)=>hideAttribute(e)}/>
                    Hide Attributes
                    </label>
                    </MenuItem>
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
  setParticipationDirection,
  setCardinalityDirection,
  hideAttributes,
  setMeta,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintsButton);
