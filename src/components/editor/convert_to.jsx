import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
  // changeParent,
} from "../../actions/actions";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  const [openDialogRelAt, setOpenDialogRelAt] = React.useState(false);
  const anchorRef = React.useRef(null);

  const options =
    process.env.REACT_APP_ERD_NOTATION_CHEN === "false"
      ? [
          "Custom Crow's foot",
          "Elmasri & Navathe",
          "Min-Max Notation",
          "Information Engineering",
          "Bachman Notation",
          "Barker Notation",
          "Batini, Ceri & Navathe",
          "Teorey Notation",
          "Korth, Silberschatz & Sudarshan",
          "UML Notation",
        ]
      : [
          "Custom Crow's foot",
          "Elmasri & Navathe",
          "Min-Max Notation",
        ];

  const [selectedIndex, setSelectedIndex] = React.useState(
    options.indexOf(props.components.notation)
  );

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickOpenDialogRelAt = () => {
    setOpenDialogRelAt(true);
  };

  const handleCloseDialogRelAt = () => {
    setOpenDialogRelAt(false);
  };

  const changeDirection = (option) => {
    switch (option) {
      case "Elmasri & Navathe":
      case "Barker Notation":
      case "Korth, Silberschatz & Sudarshan":
      case "Bachman Notation":
        props.setParticipationDirection({
          valuePart: "Look Here",
        });
        props.setCardinalityDirection({
          valueDir: "Look Across",
        });
        break;
      case "Min-Max Notation":
      case "Batini, Ceri & Navathe":
        props.setParticipationDirection({
          valuePart: "Look Here",
        });
        props.setCardinalityDirection({
          valueDir: "Look Here",
        });
        break;

      case "Teorey Notation":
      case "Information Engineering":
      case "UML Notation":
      case "Custom Crow's foot":
        props.setParticipationDirection({
          valuePart: "Look Across",
        });
        props.setCardinalityDirection({
          valueDir: "Look Across",
        });
        break;

      default:
        props.setParticipationDirection({
          valuePart: "Look Here",
        });
        props.setCardinalityDirection({
          valueDir: "Look Across",
        });
        break;
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const moveAttributetoManySide = (option) => {
    if (
      props.components.relationships.find(
        (relationship) => relationship.attributesNum > 0
      )
    )
      handleClickOpenDialogRelAt();
    else {
      props.setNotation({
        notation: option,
      });
      changeDirection(option);
    }
  };

  const changeNotation = (option) => {
    props.components.extensions.map((extension) =>
      (extension.type === "aggregation" || extension.type === "composition") &&
      option !== "Teorey Notation" &&
      option !== "UML Notation"
        ? props.modifyExtension({
            id: extension.id,
            prop: "type",
            value: "union",
          })
        : 
        
        props.modifyExtension({
            id: extension.id,
            prop: "type",
            value: extension.type,
          })
    );

    props.components.extensions.map((extension) =>
      extension.type === "union" &&
      (option === "Teorey Notation" || option === "UML Notation")
        ? props.modifyExtension({
            id: extension.id,
            prop: "type",
            value: "aggregation",
          })
        : props.modifyExtension({
            id: extension.id,
            prop: "type",
            value: extension.type,
          })
    );
    
    props.components.extensions.map((extension) =>
      extension.type === "union" &&
      (option === "Korth, Silberschatz & Sudarshan" || option === "Batini, Ceri & Navathe" || option === "Information Engineering" )
        ? props.modifyExtension({
          id: extension.id,
          prop: "type",
          value: "specialize",
        })
        : props.modifyExtension({
            id: extension.id,
            prop: "type",
            value: extension.type,
          })
    );

    // elegxos gia to an pairnei n ary relationship to kathe notation
    if (props.components.relationships.length !== 0) {
      if (
        typeof props.components.relationships.find(
          (relationship) => relationship.connections.length > 2
        ) !== "undefined" &&
        (option === "Information Engineering" ||
          option === "Bachman Notation" ||
          option === "Barker Notation")
      ) {
        handleClickOpenDialog();
      } else if (
        option === "Information Engineering" ||
        option === "Bachman Notation" ||
        option === "Barker Notation"
      ) {
        moveAttributetoManySide(option);
      } else {
        props.setNotation({
          notation: option,
        });
        changeDirection(option);
      }
    } else {
      props.setNotation({
        notation: option,
      });
      changeDirection(option);
    }
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
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {
              "  The notation you have selected doesn't support n-ary relationships. "
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              A relationship in your ERD has up to 2 connections. See more in 
              <span> <a href="/help" rel="noreferrer" /*target="_blank"*/>Help</a></span>
              .
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogRelAt}
          onClose={handleCloseDialogRelAt}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {
              "  The notation you have selected doesn't support  attributes on relationships "
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              There is an attribute on a relationship. See more in   <span> <a href="/help" rel="noreferrer" /*target="_blank"*/>Help</a></span>.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogRelAt} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <button
          className="tools-button-blue"
          ref={anchorRef}
          id="notation"
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
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
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
                      <MenuItem
                        key={option}
                        onClick={(event) => {
                          changeNotation(option);

                          handleMenuItemClick(event, index);
                        }}
                        selected={index === selectedIndex}
                      >
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
  // changeParent,
  setComponents,
  setParticipationDirection,
  setCardinalityDirection,
  repositionComponents,
  setMeta,
  setNotation,
  deselect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConvertTo);
