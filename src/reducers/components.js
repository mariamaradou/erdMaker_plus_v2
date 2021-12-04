import {
  stageWidth,
  stageHeight,
  entityWidth,
  entityHeight,
  relationshipWidth,
  relationshipHeight,
  attributeRadiusX,
  attributeRadiusY,
  extensionRadius,
  labelMinWidth,
  labelMinHeight,
  labelMaxWidth,
  labelMaxHeight,
  dragBoundOffset,
} from "../global/constants";
import _ from "lodash";
import { getChildren } from "../global/utils";

const initialState = {
  entities: [],
  relationships: [],
  attributes: [],
  extensions: [],
  labels: [],
  notation: "Custom Crow's foot",
  cardinalityDirection: "Look Across",
  participationDirection: "Look Across",
  hideAttribute:false,
  lastAction: [],
  // hideRelationships: false,
  // cardDir:false,
  // partDir: false,
  count: 0, // Total number of components created in a single diagram (includes deleted).
  // Never decreases and new ids depend on it
};

 const componentsReducer = (state = initialState, action) => {
  var newState = {};
  Object.assign(newState, state);
  var childrenList = [];

  switch (action.type) {
    case "SET_NOTATION": //o xristis epilegei notation
   
      return {
        
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
            
        notation: action.payload.notation,
      };

    case "SET_CARDINALITY_DIRECTION":
      return {
        ...state,
        
        cardinalityDirection: action.payload.valueDir,
      };
    case "SET_PARTICIPATION_DIRECTION":
      return {
        ...state,
       
        participationDirection: action.payload.valuePart,
      };
    case "HIDE_ATTRIBUTES":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
         hideAttribute: action.payload.hide,
      }
    case "ADD_ENTITY":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        entities: [
          ...state.entities,
          {
            id: state.count + 1,
            name: "<New>",
           // nameUML: action.payload.nameUML, //for UML Notation
            parentId: action.payload.parentId, //for UML Notation
            x: action.payload.x,
            y: action.payload.y,
            type: "regular",
            attributesNum: 0,
            connectionCount: 0, // Number of connections
          },
        ],
        count: state.count + 1,
      };
    case "UPDATE_POSITION_ENTITY":
      return {
        ...state,
        
        entities: state.entities.map((entity) =>
          entity.id === action.payload.id
            ? { ...entity, x: action.payload.x, y: action.payload.y }
            : entity
        ),
      };
    //diko mou gia history
    case "UPDATE_INITIAL_POSITION_ENTITY":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        entities: state.entities.map((entity) =>
          entity.id === action.payload.id
            ? { ...entity, x: action.payload.x, y: action.payload.y }
            : entity
        ),
      };
    //
    case "SET_NAME_ENTITY":
   
     
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        entities: state.entities.map((entity) =>
          entity.id === action.payload.id
            ? { ...entity, name: action.payload.name }
            : entity
        ),
        //UML relationship parent
        relationships: state.relationships.map((relationship) =>
          relationship.id === action.payload.parentId
            ? { ...relationship, name: action.payload.name }
            : relationship
        ),
      };
    case "SET_TYPE_ENTITY":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        entities: state.entities.map((entity) =>
          entity.id === action.payload.id
            ? { ...entity, type: action.payload.type }
            : entity
        ),
      };
    case "DELETE_ENTITY":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        entities: state.entities.filter(
          (entity) => entity.id !== action.payload.id
        ),
        relationships: state.relationships.map((relationship) =>
          relationship.id === action.payload.parentId
            ? {
                ...relationship,
                attributesNum:
                  relationship.attributesNum - action.payload.attributesNum,
              }
            : relationship
        ),
        attributes: state.attributes.filter(
          (attribute) => attribute.parentId !== action.payload.id
        ),
        extensions: state.extensions.filter(
          (extension) => extension.parentId !== action.payload.id
        ),
      };

    case "DELETE_ENTITY_CHILD":
      //  var entityAttributes=state.entities.find((entity)=> entity.parentId===action.payload.id).atttributesNum
      return {
        ...state,
        entities: state.entities.filter(
          (entity) => entity.parentId !== action.payload.id
        ),

        attributes: state.attributes.filter(
          (attribute) =>
            attribute.parentId !==
            state.entities.find(
              (entity) => entity.parentId === action.payload.id
            ).id
        ),
        //  relationships: state.relationships.map((relationship) =>relationship.id === action.payload.id?{...relationship,attributesNum:relationship.attributesNum-entityAttributes}:relationship ),
      };

    case "ADD_EXTENSION":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        extensions: [
          ...state.extensions,
          {
            id: state.count + 1,
            korthX: action.payload.korthX,
            korthY: action.payload.korthY,
            parentId: action.payload.id,
            text: "",
            x: action.payload.x,
            y: action.payload.y,
            type: "undefined",
            participation: "partial",
            cardinality: "disjoint",
            xconnections: [],
            minParent: "",
            maxParent: "",
            //connectionCount: 0, // Number of connections
          },
        ],
        count: state.count + 1,
        entities: state.entities.map((entity) =>
          entity.id === action.payload.id
            ? { ...entity, connectionCount: entity.connectionCount + 1 }
            : entity
        ),
      };
    case "UPDATE_POSITION_EXTENSION":
      return {
        ...state,
       
        extensions: state.extensions.map((extension) =>
          extension.id === action.payload.id
            ? { ...extension, x: action.payload.x, y: action.payload.y }
            : extension
        ),
      };

    case "UPDATE_INITIAL_POSITION_EXTENSION":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        extensions: state.extensions.map((extension) =>
          extension.id === action.payload.id
            ? { ...extension, x: action.payload.x, y: action.payload.y }
            : extension
        ),
      };
    case "MODIFY_EXTENSION":
      if (newState.lastAction.length>=20){ newState.lastAction=[] }
      newState.lastAction.push({id: action.type})
         
      for (let i in newState.extensions) {
        if (newState.extensions[i].id === action.payload.id) {
          newState.extensions[i] = {
            ...newState.extensions[i],
            [action.payload.prop]: action.payload.value,
          };
          break;
        }
      }
      return newState;
    case "DELETE_EXTENSION":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        extensions: state.extensions.filter(
          (extension) => extension.id !== action.payload.id
        ),
        entities: state.entities.map((entity) =>
          entity.id === action.payload.parentId
            ? { ...entity, connectionCount: entity.connectionCount - 1 }
            : entity
        ),
      };
    case "ADD_XCONNECTION":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        extensions: state.extensions.map((extension) =>
          extension.id === action.payload.id
            ? {
                ...extension,
                xconnections: [
                  ...extension.xconnections,
                  {
                    id: state.count + 1,
                    connectId: 0,
                    minUml: "",
                    maxUml: "",
                  },
                ],
              }
            : extension
        ),
        count: state.count + 1,
      };
    case "CHANGE_XCONNECTION":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        extensions: state.extensions.map((extension) =>
          extension.id === action.payload.id
            ? {
                ...extension,
                xconnections: extension.xconnections.map((xconnection) =>
                  xconnection.id === action.payload.xconnectionIndex
                    ? { ...xconnection, connectId: action.payload.connectId }
                    : xconnection
                ),
              }
            : extension
        ),
      };
    case "MODIFY_XCONNECTION_UML":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        extensions: state.extensions.map((extension) =>
          extension.id === action.payload.id
            ? {
                ...extension,
                xconnections: extension.xconnections.map((xconnection) =>
                  xconnection.id === action.payload.xconnectionIndex
                    ? {
                        ...xconnection,
                        [action.payload.prop]: action.payload.value,
                      }
                    : xconnection
                ),
              }
            : extension
        ),
      };
    /* case "DELETE_XCONNECTION":
      return {
        ...state,
        extensions: state.extensions.map((extension) =>
          extension.id === action.payload.extensionId
            ? {
                ...extension,
                xconnections: extension.xconnections.filter(
                  (xconnection) => xconnection.id !== action.payload.xconnectionId
                ),
              }
            : extension
        ),
      };*/
    case "DELETE_XCONNECTION": {
      
      let newState = _.cloneDeep(state);
     
      if (newState.lastAction.length>=20){ newState.lastAction=[] }
      newState.lastAction.push({id: action.type})
      let test = () => true;
      if (action.payload.xconnectionId)
        test = (xconnection) => xconnection.id !== action.payload.xconnectionId;
      else if (action.payload.entityId)
        test = (xconnection) =>
          xconnection.connectId !== action.payload.entityId;

      for (let extension of newState.extensions)
        extension.xconnections = extension.xconnections.filter(test);

      if (JSON.stringify(state) === JSON.stringify(newState)) return state;
      else return newState;
    }
    case "ADD_RELATIONSHIP":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        relationships: [
          ...state.relationships,
          {
            id: state.count + 1,
            name: "<New>",
            x: action.payload.x,
            y: action.payload.y,
            attributesNum: 0,
            type: {
              weak: false,
            },
            min: null, //mallon prepei na ta svisw
            max: null,
            exactMin: null,
            exactMax: null,
            connections: [],
          },
        ],
        count: state.count + 1,
      };
    case "UPDATE_POSITION_RELATIONSHIP":
      return {
        ...state,
       
        relationships: state.relationships.map((relationship) =>
          relationship.id === action.payload.id
            ? { ...relationship, x: action.payload.x, y: action.payload.y }
            : relationship
        ),
      };

    case "UPDATE_INITIAL_POSITION_RELATIONSHIP":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        relationships: state.relationships.map((relationship) =>
          relationship.id === action.payload.id
            ? { ...relationship, x: action.payload.x, y: action.payload.y }
            : relationship
        ),
      };
    case "SET_NAME_RELATIONSHIP":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        relationships: state.relationships.map((relationship) =>
          relationship.id === action.payload.id
            ? { ...relationship, name: action.payload.name }
            : relationship
        ),
        //UML Entity
        entities: state.entities.map((entity) =>
          entity.parentId === action.payload.id
            ? { ...entity, name: action.payload.name }
            : entity
        ),
      };

    case "SET_TYPE_RELATIONSHIP":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        relationships: state.relationships.map((relationship) =>
          relationship.id === action.payload.id
            ? {
                ...relationship,
                type: {
                  ...relationship.type,
                  [action.payload.type]: action.payload.checked,
                },
              }
            : relationship
        ),
      };

    case "DELETE_RELATIONSHIP":
      if(state.entities.find((entity)=>entity.parentId===action.payload.id)){
        var hasAttribute=true
       }
       else {hasAttribute=false}
      if (newState.lastAction.length>=20){ newState.lastAction=[] }
      newState.lastAction.push({id: action.type, attribute:hasAttribute})
      // Reduce connectionCount of involved entities
      function adjustEntities(connection) {
        for (let j in newState.entities) {
          if (newState.entities[j].id === connection.connectId)
            newState.entities[j].connectionCount--;
        }
      }
      for (let i in newState.relationships) {
        if (newState.relationships[i].id === action.payload.id)
          newState.relationships[i].connections.forEach(adjustEntities);
      }
      newState.relationships = newState.relationships.filter(
        (relationship) => relationship.id !== action.payload.id
      );
      return newState;
    case "ADD_CONNECTION":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        relationships: state.relationships.map((relationship) =>
          relationship.id === action.payload.id
            ? {
                ...relationship,
                connections: [
                  ...relationship.connections,
                  {
                    id: state.count + 1,
                    parentId: action.payload.id,
                    connectId: 0,
                    min: "",
                    max: "",
                    exactMin: "",
                    exactMax: "",
                    maxHere: "",
                    minAcross: "",
                    role: "",
                  },
                ],
              }
            : relationship
        ),
        count: state.count + 1,
      };
    case "CHANGE_CONNECTION": // Change connected entity
      var prevConnectId = 0;
      if (newState.lastAction.length>=20){ newState.lastAction=[] }
      newState.lastAction.push({id: action.type})
      for (let i in newState.relationships) {
        if (newState.relationships[i].id === action.payload.parentId)
          for (let j in newState.relationships[i].connections) {
            if (
              newState.relationships[i].connections[j].id === action.payload.id
            ) {
              prevConnectId =
                newState.relationships[i].connections[j].connectId;
              newState.relationships[i].connections[j] = {
                ...newState.relationships[i].connections[j],
                connectId: action.payload.connectId,
              };
            }
          }
      }
      for (let i in newState.entities) {
        if (newState.entities[i].id === prevConnectId)
          newState.entities[i] = {
            ...newState.entities[i],
            connectionCount: newState.entities[i].connectionCount - 1,
          };
        if (newState.entities[i].id === action.payload.connectId)
          newState.entities[i] = {
            ...newState.entities[i],
            connectionCount: newState.entities[i].connectionCount + 1,
          };
      }

      return newState;
    /*  return {
       ...state,
       relationships:state.relationships.map((relationship)=> relationship.id=== action.payload.parentId?
       relationship.connections.map((connection)=> connection.id===action.payload.id?{
      prevConnectId:connection.connectId,
    ...connection,connectId: action.payload.connectId}:connection
       )
       : relationship),
      
       entities: state.entities.map((entity)=> entity.id===prevConnectId?
       {...entity, connectionCount: entity.connectionCount-1}:
       entity.id===action.payload.connectId?{
         ...entity,connectionCount:entity.connectionCount+1
       }: entity
       )
      
     }*/

    case "MODIFY_CONNECTION":
      /* return {
        ...state,
        relationships: state.relationships.find((relationship) =>
          relationship.id === action.payload.parentId).connections.map(  (connection)   => connection.id=== action.payload.id    ?
           { ...connection,  [action.payload.prop]: action.payload.value } : connection
        ),
      };*/
      if (newState.lastAction.length>=20){ newState.lastAction=[] }
      newState.lastAction.push({id: action.type})
      for (let i in newState.relationships) {
        if (newState.relationships[i].id === action.payload.parentId)
          for (let j in newState.relationships[i].connections) {
            if (
              newState.relationships[i].connections[j].id === action.payload.id
            ) {
              newState.relationships[i].connections[j] = {
                ...newState.relationships[i].connections[j],
                [action.payload.prop]: action.payload.value,
              };
              break;
            }
          }
      }
      return newState;
    case "DELETE_CONNECTION":
      if (newState.lastAction.length>=20){ newState.lastAction=[] }
      newState.lastAction.push({id: action.type})
      if (action.payload.id) {
        for (let i in newState.entities) {
          if (newState.entities[i].id === action.payload.connectId)
            newState.entities[i] = {
              ...newState.entities[i],
              connectionCount: newState.entities[i].connectionCount - 1,
            };
        }
        for (let i in newState.relationships) {
          if (newState.relationships[i].id === action.payload.parentId)
            newState.relationships[i].connections = newState.relationships[
              i
            ].connections.filter(
              (connection) => connection.id !== action.payload.id
            );
        }

        return newState;
      } else {
        for (let i in newState.relationships) {
          newState.relationships[i].connections = newState.relationships[
            i
          ].connections.filter(
            (connection) => connection.connectId !== action.payload.connectId
          );
        }

        return newState;
      }

    case "ADD_ATTRIBUTE":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        attributes: [
          ...state.attributes,
          {
            id: state.count + 1,
            attrNum: state.entities.find((x) => x.id === action.payload.id)
              ? state.entities.find((x) => x.id === action.payload.id)
                  .attributesNum
              : state.relationships.find((x) => x.id === action.payload.id)
              ? state.relationships.find((x) => x.id === action.payload.id)
                  .attributesNum + 1
              : state.attributes.find((x) => x.id === action.payload.id)
                  .attrNum + 1, // code about composite attribute
            parentId: action.payload.id,
            name: "<New>",
            initX: state.entities.find((x) => x.id === action.payload.id)
              ? state.entities.find((x) => x.id === action.payload.id).x //composite
              : state.attributes.find(
                  (x) => x.id === action.payload.parentAttrId
                )
              ? state.attributes.find(
                  (x) => x.id === action.payload.parentAttrId
                ).initX
              : state.relationships.find((x) => x.id === action.payload.id)
              ? state.relationships.find((x) => x.id === action.payload.id).x
              : null,

            initY: state.entities.find((x) => x.id === action.payload.id)
              ? state.entities.find((x) => x.id === action.payload.id)
                  .attributesNum === 0
                ? state.entities.find((x) => x.id === action.payload.id).y +
                  (state.entities.find((x) => x.id === action.payload.id)
                    .attributesNum +
                    1) *
                    50
                : state.entities.find((x) => x.id === action.payload.id).y +
                  (state.entities.find((x) => x.id === action.payload.id)
                    .attributesNum +
                    1.2) *
                    40
              : state.attributes.find(
                  (x) => x.id === action.payload.parentAttrId
                )
              ? state.attributes.find(
                  (x) => x.id === action.payload.parentAttrId
                ).initY +
                0.98 * 40
              : state.relationships.find((x) => x.id === action.payload.id)
              ? state.relationships.find((x) => x.id === action.payload.id)
                  .attributesNum === 0
                ? state.relationships.find((x) => x.id === action.payload.id)
                    .y +
                  (state.relationships.find((x) => x.id === action.payload.id)
                    .attributesNum +
                    1) *
                    50
                : state.relationships.find((x) => x.id === action.payload.id)
                    .y +
                  (state.relationships.find((x) => x.id === action.payload.id)
                    .attributesNum +
                    1.2) *
                    40
              : null, //relationship case
            parentEntity: action.payload.grandparentAttrId
              ? action.payload.grandparentAttrId
              : action.payload.id,

            x: action.payload.x,
            y: action.payload.y,
            type: {
              unique: false,
              multivalued: false,
              optional: false,
              composite: false,
              derived: false,
              foreign: false,
            },
          },
        ],
        entities: state.entities.map((entity) =>
          entity.id === action.payload.id ||
          entity.id === action.payload.grandparentAttrId
            ? { ...entity, attributesNum: entity.attributesNum + 1 }
            : entity
        ),
        relationships: state.relationships.map((relationship) =>
          relationship.id === action.payload.id ||
          relationship.id === action.payload.grandparentAttrId ||
          relationship.id === action.payload.grandgrandparent
            ? { ...relationship, attributesNum: relationship.attributesNum + 1 }
            : relationship
        ),
        count: state.count + 1,
      };

    //gia composite attribute!!!

    case "UPDATE_ATTRIBUTE_COMPOSITE":
      return {
        ...state,

        attributes: state.attributes.map((attribute) =>
          attribute.attrNum > action.payload.attrNum &&
          (attribute.parentId === action.payload.id ||
            attribute.parentId ===
              state.attributes.find((x) => x.id === action.payload.id).parentId)
            ? { ...attribute, attrNum: attribute.attrNum + 1 }
            : attribute
        ),
      };
    case "UPDATE_POSITION_ATTRIBUTE":
      return {
        ...state,
       
        attributes: state.attributes.map((attribute) =>
          attribute.id === action.payload.id
            ? { ...attribute, x: action.payload.x, y: action.payload.y }
            : attribute
        ),
      };

    case "UPDATE_INITIAL_POSITION_ATTRIBUTE":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        attributes: state.attributes.map((attribute) =>
          attribute.id === action.payload.id
            ? { ...attribute, x: action.payload.x, y: action.payload.y }
            : attribute
        ),
      };
    case "UPDATE_POSITION_PROPERTY":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        properties: state.attributes.map((property) =>
          property.id === action.payload.id
            ? { ...property, x: action.payload.x, y: action.payload.y }
            : property
        ),
      };

    case "SET_NAME_ATTRIBUTE":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        attributes: state.attributes.map((attribute) =>
          attribute.id === action.payload.id
            ? { ...attribute, name: action.payload.name }
            : attribute
        ),
      };

    case "SET_TYPE_ATTRIBUTE":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        attributes: state.attributes.map((attribute) =>
          attribute.id === action.payload.id
            ? {
                ...attribute,
                type: {
                  ...attribute.type,
                  [action.payload.type]: action.payload.checked,
                },
              }
            : attribute
        ),
      };

    case "DELETE_ATTRIBUTE":
      getChildren(childrenList, state.attributes, action.payload.id);

      var grandparentid = state.attributes.find(
        (x) => x.id === action.payload.id
      ).parentEntity;
      if (
        typeof state.attributes.find(
          (x) => x.id === action.payload.parentId
        ) !== "undefined"
      ) {
        var grandgrandparentid = state.attributes.find(
          (x) => x.id === action.payload.parentId
        ).parentEntity;
      }

      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        attributes: state.attributes
          .filter((attribute) => attribute.id !== action.payload.id)
          .map((attribute) =>
            attribute.attrNum > action.payload.attrNum &&
            (attribute.parentId === action.payload.parentId ||
              attribute.parentEntity === grandparentid ||
              attribute.parentEntity === grandgrandparentid)
              ? {
                  ...attribute,
                  attrNum: attribute.attrNum - childrenList.length - 1,
                }
              : attribute
          ),

        entities: state.entities.map((entity) =>
          entity.id === action.payload.parentId || entity.id === grandparentid
            ? {
                ...entity,
                attributesNum: entity.attributesNum - childrenList.length - 1,
              }
            : entity
        ),

        relationships: state.relationships.map((relationship) =>
          relationship.id === action.payload.parentId ||
          relationship.id === grandparentid ||
          relationship.id === grandgrandparentid
            ? {
                ...relationship,
                attributesNum:
                  relationship.attributesNum - childrenList.length - 1,
              }
            : relationship
        ),
      };
    case "DELETE_CHILDREN":
      getChildren(childrenList, state.attributes, action.payload.id); // Retrieve children of component with provided id

      return {
        ...state,
       
        attributes: state.attributes.filter(
          (attribute) => !childrenList.includes(attribute.id)
        ),
      };

    case "UPDATE_ATTRIBUTE_CROWS":
      if (state.entities.find((x) => x.id === action.payload.grandParent)) {
        getChildren(childrenList, state.attributes, action.payload.grandParent);
      } else {
        getChildren(childrenList, state.attributes, action.payload.id);
      }

      return {
        ...state,
        attributes: state.attributes.map((attribute) =>
          childrenList.includes(attribute.id)
            ? {
                ...attribute,

                x: attribute.x + action.payload.dx,
                y: attribute.y + action.payload.dy,
                initX: state.entities.find((x) => x.id === action.payload.id)
                  ? state.entities.find((x) => x.id === action.payload.id).x
                  : state.entities.find(
                      (x) => x.id === action.payload.grandParent
                    )
                  ? state.entities.find(
                      (x) => x.id === action.payload.grandParent
                    ).x
                  : state.relationships.find((x) => x.id === action.payload.id)
                  ? state.relationships.find((x) => x.id === action.payload.id)
                      .x
                  : null,
                initY: state.entities.find((x) => x.id === action.payload.id)
                  ? attribute.attrNum === 0
                    ? state.entities.find((x) => x.id === action.payload.id).y +
                      (attribute.attrNum + 1) * 50
                    : state.entities.find((x) => x.id === action.payload.id).y +
                      (attribute.attrNum + 1.2) * 40
                  : attribute.attrNum === 0
                  ? state.entities.find(
                      (x) =>
                        x.id ===
                        state.attributes.find((x) => x.id === action.payload.id)
                          .parentId
                    ).y +
                    (attribute.attrNum + 1) * 50
                  : state.entities.find(
                      (x) =>
                        x.id ===
                        state.attributes.find((x) => x.id === action.payload.id)
                          .parentId
                    ).y +
                    (attribute.attrNum + 1.2) * 40,
              }
            : attribute
        ),
      };

    case "UPDATE_POSITION_CHILDREN": // Moves children along with parent component
      getChildren(childrenList, state.attributes, action.payload.id); // Retrieve children of component with provided id

      // getChildren(childrenList, state.extensions, action.payload.id);
      return {
        ...state,
        attributes: state.attributes.map((attribute) =>
          childrenList.includes(attribute.id)
            ? {
                ...attribute,
                x: attribute.x + action.payload.dx,
                y: attribute.y + action.payload.dy,
                initX: state.entities.find((x) => x.id === action.payload.id)
                  ? state.entities.find((x) => x.id === action.payload.id).x
                  : state.attributes.find(
                      (x) => x.parentId === action.payload.id
                    )
                  ? state.attributes.find(
                      (x) => x.parentId === action.payload.id
                    ).initX
                  : null, //relationship case
                initY: state.entities.find((x) => x.id === action.payload.id)
                  ? attribute.attrNum === 0
                    ? state.entities.find((x) => x.id === action.payload.id).y +
                      (attribute.attrNum + 1) * 50
                    : state.entities.find((x) => x.id === action.payload.id).y +
                      (attribute.attrNum + 1.2) * 40
                  : state.entities.find((x) => x.id === action.payload.parentId)
                  ? attribute.attrNum === 0
                    ? state.entities.find(
                        (x) => x.id === action.payload.parentId
                      ).y +
                      (attribute.attrNum + 1) * 50
                    : state.entities.find(
                        (x) => x.id === action.payload.parentId
                      ).y +
                      (attribute.attrNum + 1.2) * 40
                  : null, //relationship case
              }
            : attribute
        ),
      };
    case "UPDATE_POSITION_EXTENSION_CHILDREN": // Moves children along with parent component
      getChildren(childrenList, state.extensions, action.payload.id);
      return {
        ...state,

        extensions: state.extensions.map((extension) =>
          childrenList.includes(extension.id)
            ? {
                ...extension,
                x: extension.x + action.payload.dx,
                y: extension.y + action.payload.dy,
                korthX: state.entities.find((x) => x.id === action.payload.id)
                  .x,
                korthY:
                  state.entities.find((x) => x.id === action.payload.id).y +
                  40 +
                  state.entities.find((x) => x.id === action.payload.id)
                    .attributesNum *
                    39,
              }
            : extension
        ),
      };
    case "ADD_LABEL":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        labels: [
          ...state.labels,
          {
            id: state.count + 1,
            text: "<New>",
            x: action.payload.x,
            y: action.payload.y,
            width: 150,
            height: labelMinHeight,
          },
        ],
        count: state.count + 1,
      };
    case "UPDATE_POSITION_LABEL":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        labels: state.labels.map((label) =>
          label.id === action.payload.id
            ? { ...label, x: action.payload.x, y: action.payload.y }
            : label
        ),
      };

    case "UPDATE_INITIAL_POSITION_LABEL":
      return {
        ...state,
        labels: state.labels.map((label) =>
          label.id === action.payload.id
            ? { ...label, x: action.payload.x, y: action.payload.y }
            : label
        ),
      };
    case "SET_TEXT_LABEL":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        labels: state.labels.map((label) =>
          label.id === action.payload.id
            ? { ...label, text: action.payload.text }
            : label
        ),
      };
    case "RESIZE_LABEL":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        labels: state.labels.map((label) =>
          label.id === action.payload.id
            ? {
                ...label,
                width:
                  action.payload.width < labelMinWidth
                    ? labelMinWidth
                    : action.payload.width > labelMaxWidth
                    ? labelMaxWidth
                    : action.payload.width,
                height:
                  action.payload.height < labelMinHeight
                    ? labelMinHeight
                    : action.payload.height > labelMaxHeight
                    ? labelMaxHeight
                    : action.payload.height,
              }
            : label
        ),
      };
    case "DELETE_LABEL":
      return {
        ...state,
        lastAction: state.lastAction.length>=20? [ {
          id: action.type}] :[
          ...state.lastAction,
          {
            id: action.type}],
        labels: state.labels.filter((label) => label.id !== action.payload.id),
      };
    case "REPOSITION_COMPONENTS": // Used to return all components within stage bound if dragged off
      for (let i in newState.entities) {
        if (
          newState.entities[i].x >
          stageWidth - entityWidth / 2 - dragBoundOffset
        )
          newState.entities[i].x =
            stageWidth - entityWidth / 2 - dragBoundOffset;
        else if (newState.entities[i].x < entityWidth / 2 + dragBoundOffset)
          newState.entities[i].x = entityWidth / 2 + dragBoundOffset;
        if (
          newState.entities[i].y >
          stageHeight - entityHeight / 2 - dragBoundOffset
        )
          newState.entities[i].y =
            stageHeight - entityHeight / 2 - dragBoundOffset;
        else if (newState.entities[i].y < entityHeight / 2 + dragBoundOffset)
          newState.entities[i].y = entityHeight / 2 + dragBoundOffset;
      }

      for (let i in newState.relationships) {
        if (
          newState.relationships[i].x >
          stageWidth - relationshipWidth - dragBoundOffset
        )
          newState.relationships[i].x =
            stageWidth - relationshipWidth - dragBoundOffset;
        else if (
          newState.relationships[i].x <
          relationshipWidth + dragBoundOffset
        )
          newState.relationships[i].x = relationshipWidth + dragBoundOffset;
        if (
          newState.relationships[i].y >
          stageHeight - relationshipHeight - dragBoundOffset
        )
          newState.relationships[i].y =
            stageHeight - relationshipHeight - dragBoundOffset;
        else if (
          newState.relationships[i].y <
          relationshipHeight + dragBoundOffset
        )
          newState.relationships[i].y = relationshipHeight + dragBoundOffset;
      }
      for (let i in newState.attributes) {
        if (
          newState.attributes[i].x >
          stageWidth - attributeRadiusX - dragBoundOffset
        )
          newState.attributes[i].x =
            stageWidth - attributeRadiusX - dragBoundOffset;
        else if (newState.attributes[i].x <= attributeRadiusX + dragBoundOffset)
          newState.attributes[i].x = attributeRadiusX + dragBoundOffset;
        if (
          newState.attributes[i].y >
          stageHeight - attributeRadiusY - dragBoundOffset
        )
          newState.attributes[i].y =
            stageHeight - attributeRadiusY - dragBoundOffset;
        else if (newState.attributes[i].y <= attributeRadiusY + dragBoundOffset)
          newState.attributes[i].y = attributeRadiusY + dragBoundOffset;
      }
      for (let i in newState.extensions) {
        if (
          newState.extensions[i].x >
          stageWidth - extensionRadius - dragBoundOffset
        )
          newState.extensions[i].x =
            stageWidth - extensionRadius - dragBoundOffset;
        else if (newState.extensions[i].x <= extensionRadius + dragBoundOffset)
          newState.extensions[i].x = extensionRadius + dragBoundOffset;
        if (
          newState.extensions[i].y >
          stageHeight - extensionRadius - dragBoundOffset
        )
          newState.extensions[i].y =
            stageHeight - extensionRadius - dragBoundOffset;
        else if (newState.extensions[i].y <= extensionRadius + dragBoundOffset)
          newState.extensions[i].y = extensionRadius + dragBoundOffset;
      }
      for (let i in newState.labels) {
        if (
          newState.labels[i].x >
          stageWidth - newState.labels[i].width / 2 - dragBoundOffset
        )
          newState.labels[i].x =
            stageWidth - newState.labels[i].width / 2 - dragBoundOffset;
        else if (
          newState.labels[i].x <
          newState.labels[i].width / 2 + dragBoundOffset
        )
          newState.labels[i].x = newState.labels[i].width / 2 + dragBoundOffset;
        if (
          newState.labels[i].y >
          stageHeight - newState.labels[i].height / 2 - dragBoundOffset
        )
          newState.labels[i].y =
            stageHeight - newState.labels[i].height / 2 - dragBoundOffset;
        else if (
          newState.labels[i].y <
          newState.labels[i].height / 2 + dragBoundOffset
        )
          newState.labels[i].y =
            newState.labels[i].height / 2 + dragBoundOffset;
      }

      return newState;
    case "SET_COMPONENTS":
      
      return action.payload;
    case "RESET_COMPONENTS": //afinw mono to notation, cardinality kai participation idia me ayta prin to reset
      var clone = Object.assign({}, initialState);

      clone.notation = state.notation;
      clone.cardinalityDirection=state.cardinalityDirection;
      clone.participationDirection= state.participationDirection;
      return clone;
    // return initialState
    default:
      return state;
  }
};



export default componentsReducer;
