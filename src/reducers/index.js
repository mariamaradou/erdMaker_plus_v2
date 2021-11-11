import { selectionReducer, stageReducer, generalReducer } from "./common";
import { combineReducers } from "redux";
import userReducer from "./user";
import metaReducer from "./metadata";
import componentsReducer from "./components";
import undoable from "redux-undo";
import {
  UPDATE_INITIAL_POSITION_ENTITY,
  // UPDATE_INITIAL_POSITION_CHILDREN,
  UPDATE_INITIAL_POSITION_EXTENSION,
  DELETE_ENTITY_CHILD,
  UPDATE_INITIAL_POSITION_RELATIONSHIP,
  UPDATE_INITIAL_POSITION_ATTRIBUTE,
  UPDATE_INITIAL_POSITION_LABEL,
  UPDATE_ATTRIBUTE_COMPOSITE,
  ADD_ENTITY,
  SET_NAME_ENTITY,
  SET_TYPE_ENTITY,
  DELETE_ENTITY,
  ADD_EXTENSION,
  MODIFY_EXTENSION,
  DELETE_EXTENSION,
  ADD_XCONNECTION,
  CHANGE_XCONNECTION,
  DELETE_XCONNECTION,
  ADD_RELATIONSHIP,
  SET_NAME_RELATIONSHIP,
  SET_TYPE_RELATIONSHIP,
  DELETE_RELATIONSHIP,
  ADD_CONNECTION,
  CHANGE_CONNECTION,
  MODIFY_CONNECTION,
  DELETE_CONNECTION,
  ADD_ATTRIBUTE,
  SET_NAME_ATTRIBUTE,
  SET_TYPE_ATTRIBUTE,
  DELETE_ATTRIBUTE,
  DELETE_CHILDREN,
  ADD_LABEL,
  SET_TEXT_LABEL,
  RESIZE_LABEL,
  DELETE_LABEL,
  REPOSITION_COMPONENTS,
  SET_COMPONENTS,
  RESET_COMPONENTS,
  SET_NOTATION,
  UPDATE_ATTRIBUTE_CROWS,
  HIDE_ATTRIBUTES,
} from "../actions/actions";

const finalReducer = combineReducers({
  selector: selectionReducer,
  stager: stageReducer,
  general: generalReducer,
  meta: metaReducer,
  user: userReducer,
  components: undoable(componentsReducer, {
    limit: 20,
    filter: function filterActions(action) {
      return (
        action.type === UPDATE_INITIAL_POSITION_ENTITY ||
        action.type === HIDE_ATTRIBUTES ||
        action.type === UPDATE_ATTRIBUTE_COMPOSITE ||
        action.type === ADD_ENTITY ||
        action.type === SET_NAME_ENTITY ||
        action.type === SET_NOTATION ||
        action.type === SET_TYPE_ENTITY ||
        action.type === DELETE_ENTITY ||
        action.type=== DELETE_ENTITY_CHILD || 
        action.type=== DELETE_CONNECTION ||
        action.type === ADD_EXTENSION ||
        action.type === MODIFY_EXTENSION ||
        action.type === UPDATE_ATTRIBUTE_CROWS ||
        action.type === UPDATE_INITIAL_POSITION_EXTENSION ||
        action.type === UPDATE_INITIAL_POSITION_RELATIONSHIP ||
        action.type === UPDATE_INITIAL_POSITION_ATTRIBUTE ||
        action.type === UPDATE_INITIAL_POSITION_LABEL ||
        action.type === DELETE_EXTENSION ||
        action.type === ADD_XCONNECTION ||
        action.type === CHANGE_XCONNECTION ||
        action.type === DELETE_XCONNECTION ||
        action.type === ADD_RELATIONSHIP ||
        action.type === SET_NAME_RELATIONSHIP ||
        action.type === SET_TYPE_RELATIONSHIP ||
        action.type === DELETE_RELATIONSHIP ||
        action.type === ADD_CONNECTION ||
        action.type === CHANGE_CONNECTION ||
        action.type === MODIFY_CONNECTION ||
        action.type === ADD_ATTRIBUTE ||
        action.type === SET_NAME_ATTRIBUTE ||
        action.type === SET_TYPE_ATTRIBUTE ||
        action.type === DELETE_ATTRIBUTE ||
        action.type === DELETE_CHILDREN ||
        action.type === ADD_LABEL ||
        action.type === SET_TEXT_LABEL ||
        action.type === RESIZE_LABEL ||
        action.type === DELETE_LABEL ||
        action.type === REPOSITION_COMPONENTS ||
        action.type === SET_COMPONENTS ||
        action.type === RESET_COMPONENTS
      ); // gia ayta ta actions tha yparxei istoriko
    },
  }),
});

export default finalReducer;
