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
  // displayRelationship,
  resetMeta,
  select,
  setParticipationDirection,
  setCardinalityDirection,
  hideAttributes,
  addEntity,
  addRelationship,
  addLabel,
  resetComponents,
  setComponents,
  setMeta,
  deselect,
} from "../../actions/actions";
//import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const AddButton = (props) => {
  var mobile = window.innerWidth <= 768 ? true : false;
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
          className="tools-button-blue addButton"
          style={{ display: mobile ? "flex" : "none" }}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={() => {
            props.deselect();
            handleToggle();
          }}
        >
          {/*  <SettingsIcon style={{ fontSize: 17 }}></SettingsIcon> */}
          Add component
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
                  <MenuItem
                    type='button'
                      onClick={(e) => {
                        props.addEntity({
                          x: window.innerWidth / 2,
                          y: window.innerHeight / 2,
                        });
                        document.getElementsByClassName("stage")[0].focus();
                        props.select({
                          type: "entity",
                          id: props.components.count + 1,
                          parentId: null,
                        });
                        handleClose();
                      }}
                    >
                      Add Entity
                    
                  </MenuItem>
                  <MenuItem
                    type="button"
                      onClick={(e) => {
                        props.addRelationship({
                          x: window.innerWidth / 2,
                          y: window.innerHeight / 2,
                        });
                        document.getElementsByClassName("stage")[0].focus();
                        props.select({
                          type: "relationship",
                          id: props.components.count + 1,
                          parentId: null,
                        });

                        handleClose();
                      }}
                    >
                      Add Relationship
                   
                  </MenuItem>
                  <MenuItem
                    type="button"
                      onClick={(e) => {
                        props.addLabel({
                          x: window.innerWidth / 2,
                          y: window.innerHeight / 2,
                        });
                        document.getElementsByClassName("stage")[0].focus();
                        props.select({
                          type: "label",
                          id: props.components.count + 1,
                          parentId: null,
                        });

                        handleClose();
                      }}
                    >
                      Add Label
                   
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
  stager: state.stager,
});

const mapDispatchToProps = {
  resetMeta,
  resetComponents,
  setComponents,
  addLabel,
  addRelationship,
  addEntity,
  select,
  repositionComponents,
  setParticipationDirection,
  setCardinalityDirection,
  hideAttributes,
  setMeta,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);
