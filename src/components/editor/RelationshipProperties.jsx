import React from "react";
import { connect } from "react-redux";
import {
  addAttribute,
  addEntity,
  setNameRelationship,
  setTypeRelationship,
  select,
  deselect,
  deleteChildren,
  deleteEntityChild,
  setNameEntity,
  modifyConnection,
  deleteRelationship,
  addConnection,
  repositionComponents,
} from "../../actions/actions";
import Connection from "./Connection";
import { getRandomInt } from "../../global/utils";
import {
  nameSize,
  spawnRadius,
  
  dragBoundOffset,
} from "../../global/constants";

class RelationshipProperties extends React.Component {
  componentDidMount() {
    this.nameInput.focus();
    document.getElementsByClassName("sidepanel")[0].style.display = "block";

    var relationshipIndex = this.props.components.relationships.findIndex(
      this.findRelationshipIndex
    );

   
    if (this.props.components.relationships[relationshipIndex].y===22){
      
       document.getElementsByClassName('sidepanel')[0].style.top= dragBoundOffset+38 + 'px'
     }
    if(document.getElementsByClassName('sidepanel')[0].offsetTop + document.getElementsByClassName('sidepanel')[0].offsetHeight>690){
     document.getElementsByClassName('sidepanel')[0].style.top= document.getElementsByClassName('sidepanel')[0].offsetTop-0.8*document.getElementsByClassName('sidepanel')[0].offsetHeight + 'px'
   
    }
   
    if(document.getElementsByClassName('sidepanel')[0].offsetTop <0){
     document.getElementsByClassName('sidepanel')[0].style.top= -document.getElementsByClassName('sidepanel')[0].offsetTop+  'px'
    }
  }
 
  componentWillUnmount() {
    document.getElementsByClassName("stage")[0].focus();
 
    document.getElementsByClassName("react-contextmenu")[0].style.display =
      "block";
  }

  getStage = () => this.stage;

  handleFocus = (e) => e.target.select();

  findRelationshipIndex = (relationship) =>
    relationship.id === this.props.selector.current.id;

  nameValueChange = (e) =>
    this.props.setNameRelationship({
      id: this.props.selector.current.id,
      name: e.target.value,
    });

  typeValueChange = (e) => {
    var relationshipIndex = this.props.components.relationships.findIndex(
      this.findRelationshipIndex
    );

    this.props.setTypeRelationship({
      id: this.props.selector.current.id,
      type: e.target.value,
      checked: e.target.checked,
    });

    if (
      this.props.components.relationships[relationshipIndex].connections
        .length === 2
    ) {
      if (
        this.props.components.relationships[relationshipIndex].connections[0]
      ) {
        if (
          this.props.components.entities.find(
            (x) =>
              x.id ===
              this.props.components.relationships[relationshipIndex]
                .connections[1].connectId
          ).type === "weak" &&
          e.target.checked
        ) {
          this.props.modifyConnection({
            id: this.props.components.relationships[relationshipIndex]
              .connections[0].id,
            parentId: this.props.selector.current.id,
            prop: "min", //min, max
            value: "one",
          });
        }
      }
      if (
        this.props.components.relationships[relationshipIndex].connections[1]
      ) {
        if (
          this.props.components.entities.find(
            (x) =>
              x.id ===
              this.props.components.relationships[relationshipIndex]
                .connections[0].connectId
          ).type === "weak" &&
          e.target.checked
        ) {
          this.props.modifyConnection({
            id: this.props.components.relationships[relationshipIndex]
              .connections[1].id,
            parentId: this.props.selector.current.id,
            prop: "min", //min, max
            value: "one",
          });
        }
      }
    }
  };

  handleAddAttribute = (relationshipIndex) => {
    // Randomly position the attribute around the relationship
    const radius = spawnRadius;
    var randomAngle = getRandomInt(0, 360);
    var xOffset = radius * Math.cos(randomAngle);
    var yOffset = radius * Math.sin(randomAngle);
    // if(this.props.components.notation==='UML Notation'){
    if (
      typeof this.props.components.entities.find(
        (entity) => entity.parentId === this.props.selector.current.id
      ) === "undefined"
    ) {
      this.props.addEntity({
        x: this.props.components.relationships[relationshipIndex].x + xOffset,
        y: this.props.components.relationships[relationshipIndex].y + yOffset,
        parentId: this.props.selector.current.id,
     //   nameUML: this.props.components.relationships[relationshipIndex].name,
      });
      this.props.setNameEntity({
        id: this.props.components.count + 1,
        name: this.props.components.relationships[relationshipIndex].name,
      });
      this.props.addAttribute({
        id: this.props.components.count + 1,
        parentEntity:this.props.components.relationships[relationshipIndex].id,
        grandparentAttrId:
          this.props.components.relationships[relationshipIndex].id,
        parentId: this.props.components.count + 1,
        x: this.props.components.relationships[relationshipIndex].x + xOffset,
        y: this.props.components.relationships[relationshipIndex].y + yOffset,
      });
    } else {
      this.props.addAttribute({
        id: this.props.components.entities.find(
          (entity) => entity.parentId === this.props.selector.current.id
        ).id,
        parentEntity:this.props.components.relationships[relationshipIndex].id,
        grandparentAttrId:
          this.props.components.relationships[relationshipIndex].id,
        parentId: this.props.components.entities.find(
          (entity) => entity.parentId === this.props.selector.current.id
        ).id,
        x: this.props.components.relationships[relationshipIndex].x + xOffset,
        y: this.props.components.relationships[relationshipIndex].y + yOffset,
      });
    }
    this.props.select({
      type: "entity",
      id: this.props.components.count + 1,
      parentId: this.props.selector.current.id,
    });
    //  }
    //  else{
    /*  this.props.addAttribute({
      id: this.props.selector.current.id,
      parentEntity:null,
      x: this.props.components.relationships[relationshipIndex].x + xOffset,
      y: this.props.components.relationships[relationshipIndex].y + yOffset,
    });
    this.props.repositionComponents();
    this.props.select({
      type: "attribute",
      id: this.props.components.count + 1,
      parentId: this.props.selector.current.id,
    });*/
    // }
  };

  render() {
    var relationshipIndex = this.props.components.relationships.findIndex(
      this.findRelationshipIndex
    );
    var addConnectionButton =
      this.props.components.relationships[relationshipIndex].connections
        .length > 1 &&
      (this.props.components.notation === "Information Engineering" ||
        this.props.components.notation === "Bachman Notation" ||
        this.props.components.notation === "Barker Notation") ? null : this
          .props.components.relationships[relationshipIndex].connections
          .length < 5 ? (
        <button
          /*className="properties-neutral-button"*/
          type="button"
          className="buttonmenu"
          style={{
            cursor: "pointer",
            border: "none",
            outline: "none",
            fontSize: 17,
            backgroundColor: "#f2f2f2",
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
          onClick={() => {
            this.props.addConnection({ id: this.props.selector.current.id });
           
          }}
        >
          Add Connection
        </button>
      ) : null;

    return (
      <div className="sidepanel-content">
        {/* <h3>Relationship</h3> */}
        <label>
          {/* Name:{" "}*/}
          <input
            /*className="big-editor-input"*/
            type="text"
            autoComplete="off"
            style={{
              outline: "none",
              border: "none",
              margin: 3,
            //  width: "280px",
              paddingLeft: "6px",
              fontSize: "17px",
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            }}
            placeholder="Set relationship name"
            name="name"
            id="name"
            ref={(input) => {
              this.nameInput = input;
            }}
            onFocus={this.handleFocus}
            maxLength={nameSize}
            value={this.props.components.relationships[relationshipIndex].name}
            onChange={this.nameValueChange}
            ////prosthesa to kleidi delete wste otan to pataw na diagrafetai to relationship
            onKeyDown={(event) => {
              if (event.key === "Delete") {
                this.props.deleteChildren({
                  id: this.props.selector.current.id,
                });
                this.props.deleteRelationship({
                  id: this.props.selector.current.id,
                });
                if (
                  this.props.components.entities.find(
                    (x) => x.parentId === this.props.selector.current.id
                  )
                ) {
                  this.props.deleteEntityChild({
                    id: this.props.selector.current.id,
                  });
                }
                this.props.deselect();
              } else if (event.key === "Escape" || event.key === "Enter") {
                this.props.deselect();
                this.getStage();
              }
            }}
            //////////////
          />
        </label>
        <hr />
        <table
          style={{
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }} /*className="type-inputs"*/
        >
          <tbody>
            <tr>
              {/*<td>Type:</td>*/}
              <td className="buttonmenu">
                <label>
                  <input
                    type="checkbox"
                   
                    name="type"
                    value="weak"
                    checked={
                      this.props.components.relationships[relationshipIndex]
                        .type.weak
                    }
                    onChange={this.typeValueChange}
                  />
                  Identifying
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />

        <div className="connections-list">
          <Connections //to endiameso kouti anamesa type kai new attribute
            selected={this.props.selector.current}
            entities={this.props.components.entities}
            relationships={this.props.components.relationships}
            findRelationshipIndex={this.findRelationshipIndex}
          />
        </div>

        {addConnectionButton}
        <hr />
        <div className="buttons-list">
          <button //koumpi Add Connection
            /*  className="properties-neutral-button"*/
            type="button"
            style={{
              display:
                this.props.components.notation ===
                  "Information Engineering" ||
                this.props.components.notation === "Bachman Notation" ||
                this.props.components.notation === "Barker Notation"
                  ? "none"
                  : "block",
              cursor: "pointer",
              border: "none",
              outline: "none",
              fontSize: 17,
              backgroundColor: "#f2f2f2",
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            }}
            className="buttonmenu"
            onClick={() => this.handleAddAttribute(relationshipIndex)}
          >
            New Attribute
          </button>

          <button
            /*  className="properties-delete-button"*/
            type="button"
            className="buttonmenu"
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              fontSize: 17,
              backgroundColor: "#f2f2f2",
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            }}
            onClick={() => {
              this.props.deleteChildren({ id: this.props.selector.current.id });
              this.props.deleteRelationship({
                id: this.props.selector.current.id,
              });
              if (
                this.props.components.entities.find(
                  (x) => x.parentId === this.props.selector.current.id
                )
              ) {
                this.props.deleteEntityChild({
                  id: this.props.selector.current.id,
                });
              }

              this.props.deselect();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

// Component for all connections
const Connections = (props) => {
  let connectionList = [];
  let relationshipIndex = props.relationships.findIndex(
    props.findRelationshipIndex
  );
  for (let i in props.relationships[relationshipIndex].connections) {
    connectionList.push(
      <React.Fragment key={i}>
        <Connection
          index={i}
          connection={props.relationships[relationshipIndex].connections[i]}
          relationshipIndex={relationshipIndex}
          relationshipId={props.selected.id}
        />
      </React.Fragment>
    );
  }
  return connectionList;
};

const mapStateToProps = (state) => ({
  components: state.components.present,

  selector: state.selector,
});

const mapDispatchToProps = {
  addAttribute,
  setNameRelationship,
  setNameEntity,
  select,
  modifyConnection,
  deselect,
  deleteEntityChild,
  addEntity,
  setTypeRelationship,
  deleteChildren,
  deleteRelationship,
  addConnection,
  repositionComponents,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelationshipProperties);
