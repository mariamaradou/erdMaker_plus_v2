import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo';
import { store } from "../../index.js";
//import _ from "lodash";

let UndoRedo = ({ lastAct,canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    
    <button  className="undo tools-button-blue" 
    onClick={()=>{ onUndo(); /*store.dispatch(ActionCreators.jump(-2))*/}
    }
  
    
    
    disabled={!canUndo}>
      Undo
    </button>
    <button className="redo tools-button-blue" onClick={()=>{onRedo();  /*store.dispatch(ActionCreators.jump(1))*/}} disabled={!canRedo}>
      Redo
    </button>
  </p>
)

const mapStateToProps = (state) => ({

 
  canUndo: state.components.past.length > 0 ,
  canRedo:   state.components.future.length > 0 
})

const mapDispatchToProps = ({
  
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo
})

UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo)

export default UndoRedo
