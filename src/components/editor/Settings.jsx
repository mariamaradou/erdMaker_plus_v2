import React, { useEffect, useRef } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {
  repositionComponents,
  displayRelationship,
  resetMeta,
  setParticipationDirection,
  setCardinalityDirection,
  resetComponents,
  setComponents,
  setMeta,
  deselect,
} from "../../actions/actions";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const SettingsButton = (props) => {
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

  function setDisplay(e) {
    props.displayRelationship({
      hide: e.target.checked,
    });
  }
  function setCardinality(e) {
    props.setCardinalityDirection({
      valueDir: e.target.checked,
    });
  }
  function setParticipation(e) {
    props.setParticipationDirection({
      valuePart: e.target.checked,
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
          <SettingsIcon style={{ fontSize: 17 }}></SettingsIcon>
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
                      {/*  <Checkbox
                      defaultChecked
                      disableRipple
                      size="small"
                      inputProps={{ 'aria-label': 'checkbox with small size' }}
                    /> Show Relationship*/}
                      <label>
                        <input
                          type="checkbox"
                          name="showRel"
                          value="showRel"
                          checked={props.components.hideRelationships}
                          onChange={setDisplay}
                        />
                        Hide Relationships
                      </label>
                    </MenuItem>

                    <MenuItem>
                      <label>
                        <input
                          type="checkbox"
                          name="showRel"
                          value="showCard"
                            checked={props.components.cardDir}
                          onChange={setCardinality}
                        />
                        Cardinality: { props.components.cardinalityDirection}
                      </label>
                    </MenuItem>
                    <MenuItem>
                      <label>
                        <input
                          type="checkbox"
                          name="showPart"
                          value="showPart"
                          checked={props.components.partDir}
                          onChange={setParticipation}
                        />
                        Participation:  { props.components.participationDirection}
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
  displayRelationship,
  setMeta,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsButton);
