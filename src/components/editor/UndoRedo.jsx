import React from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from "react-redux";
import { ActionCreators } from "redux-undo";
import { store } from "../../index.js";
//import _ from "lodash";
var jumpedDelete;
var jumpedAdd;

let UndoRedo = ({ components, canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <button
      className="undo tools-button-blue"
      onClick={() => {
        onUndo();
        jumpedDelete = false;
        jumpedAdd = false;

        if (
          components.lastAction[components.lastAction.length - 1].id ===
            "DELETE_ATTRIBUTE" ||
          components.lastAction[components.lastAction.length - 1].id ===
            "DELETE_ENTITY"
        ) {
          jumpedDelete = true;
          jumpedAdd = false;
          store.dispatch(ActionCreators.jump(-2));
        } else if (
          components.lastAction[components.lastAction.length - 1].id ===
          "ADD_ATTRIBUTE"
        ) {
          jumpedDelete = false;
          jumpedAdd = true;
          store.dispatch(ActionCreators.jump(-1));
        }
        
      }}
      disabled={!canUndo}
    >
      Undo
    </button>
    <button
      className="redo tools-button-blue"
      onClick={() => {
        onRedo();

        if (jumpedDelete === true) {
          store.dispatch(ActionCreators.jump(2));
        } else if (jumpedAdd === true) {
          store.dispatch(ActionCreators.jump(1));
        }
      }}
      disabled={!canRedo}
    >
      Redo
    </button>
  </p>
);

const mapStateToProps = (state) => ({
  components: state.components.present,
  canUndo: state.components.past.length > 0,
  canRedo: state.components.future.length > 0,
});

const mapDispatchToProps = {
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo,
};

UndoRedo = connect(mapStateToProps, mapDispatchToProps)(UndoRedo);

export default UndoRedo;
