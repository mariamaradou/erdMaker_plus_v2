import React from "react";
import { connect } from "react-redux";
import {
  addAttribute,
  setNameAttribute,
  setTypeAttribute,
  updateAttributeComposite,
  updatePositionChildren,
  deleteChildren,
  deleteAttribute,
  updateAttributeCrows,
  select,
  deselect,
  repositionComponents,
} from "../../actions/actions";

import { getRandomInt } from "../../global/utils";
import { nameSize, stageWidth, stageHeight, spawnRadius } from "../../global/constants";

class AttributeProperties extends React.Component {
  componentDidMount() {
    this.nameInput.focus();
    document.getElementsByClassName('sidepanel')[0].style.display='block'
  }

  componentWillUnmount(){ 
    document.getElementsByClassName('stage')[0].focus();

  document.getElementsByClassName('react-contextmenu')[0].style.display='block'}
  
  getStage = () => this.stage;
  handleFocus = (e) => e.target.select();

  findAttributeIndex = (attribute) => attribute.id === this.props.selector.current.id;

  findParentIndex = (parent) => parent.id === this.props.selector.current.parentId;
  
  nameValueChange = (e) =>
    this.props.setNameAttribute({
      id: this.props.selector.current.id,
      name: e.target.value,
    });

  typeValueChange = (e) => {
   
   
   
    if (e.target.value === "composite") this.props.deleteChildren({ id: this.props.selector.current.id });
    this.props.setTypeAttribute({
      id: this.props.selector.current.id,
      type: e.target.value,
      checked: e.target.checked
    
    });
  }; 
 
  handleAddAttributeToParent = (parent) => {
    const radius = spawnRadius;
    var randomAngle = getRandomInt(0, 360);
    var xOffset = radius * Math.cos(randomAngle);
    var yOffset = radius * Math.sin(randomAngle);
    var x;
    var y;
    switch (parent.type) {
      case "entity":
        x = this.props.components.entities[parent.index].x + xOffset;
        y = this.props.components.entities[parent.index].y + yOffset;
        break;
      case "relationship":
        x = this.props.components.relationships[parent.index].x + xOffset;
        y = this.props.components.relationships[parent.index].y + yOffset;
        break;
      case "attribute":
        x = this.props.components.attributes[parent.index].x + xOffset;
        y = this.props.components.attributes[parent.index].y + yOffset;
        break;
      default:
        x = stageWidth / 2;
        y = stageHeight / 2;
    }
    this.props.addAttribute({
      id: this.props.selector.current.parentId,
      x: x,
      y: y,
     
    });
    this.props.repositionComponents();
    this.props.select({
      type: "attribute",
      id: this.props.components.count + 1,
      parentId: this.props.selector.current.parentId,
    });
    this.nameInput.focus();
  };

  // sthn periptwsh pou exw syntheto gnwrisma (COMPOSITE ATTRIBUTE)

  handleAddAttribute = (attributeIndex) => {
    // Randomly position the attribute around the attribute
    const radius = spawnRadius;
    var randomAngle = getRandomInt(0, 360);
    var xOffset = radius * Math.cos(randomAngle);
    var yOffset = radius * Math.sin(randomAngle);
    
    

    this.props.updateAttributeComposite({
      id: this.props.selector.current.id,
      parentId: this.props.components.attributes[attributeIndex].parentId,
     attrNum:this.props.components.attributes[attributeIndex].attrNum
    
   })

   
    this.props.addAttribute({
      id: this.props.selector.current.id,
      x: this.props.components.attributes[attributeIndex].x + xOffset,
      y: this.props.components.attributes[attributeIndex].y + yOffset,
      parentAttrId:  this.props.components.attributes[attributeIndex].id,
      
      grandparentAttrId:  this.props.components.attributes[attributeIndex].parentId
    });
   this.props.updatePositionChildren({
      id:this.props.components.attributes[attributeIndex].parentId,
      dx: null,
      dy: null,
    });
  
    
    this.props.repositionComponents();
    this.props.select({
      type: "attribute",
      id: this.props.components.count + 1,
      parentId: this.props.selector.current.id,
    });
    this.nameInput.focus();
  };

  render() {
    var parent = { index: null, type: "" };
    var uniqueLabel = "Unique";

    if ((parent.index = this.props.components.entities.findIndex(this.findParentIndex)) !== -1) {
      parent.type = "entity";
      if (this.props.components.entities[parent.index].type === "weak") uniqueLabel = "Partially Unique";
    } else if ((parent.index = this.props.components.relationships.findIndex(this.findParentIndex)) !== -1)
      parent.type = "relationship";
    else if ((parent.index = this.props.components.attributes.findIndex(this.findParentIndex)) !== -1)
      parent.type = "attribute";

    var attributeIndex = this.props.components.attributes.findIndex(this.findAttributeIndex);

    // addAttributeButton is enabled only for composite attributes
    var addAttributeButton = this.props.components.attributes[attributeIndex].type.composite ? (
      <button
      /*  className="properties-neutral-button" */
        type="button"
        style={{cursor:'pointer', border:'none',outline:'none',fontSize:17, backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
        onClick={() => this.handleAddAttribute(attributeIndex)}
      >
        New Attribute
      </button>
    ) : null;

    return (
     
      <div className="sidepanel-content" > 
      {/*  <h3>Attribute</h3> */}
        <label>
        {/* Name:{" "} */}
          <input
          /*  className="big-editor-input" */
          style={{outline: 'none',border:'none',margin: 3}}
          placeholder="Set entity name"
            type="text"
            autoComplete="off"
            name="name"
            id="name"
            ref={(input) => {
              this.nameInput = input;
            }}
            onFocus={this.handleFocus}
            maxLength={nameSize}
            value={this.props.components.attributes[attributeIndex].name}
            onChange={this.nameValueChange}
            ////prosthesa to kleidi delete wste otan to pataw na diagrafetai to attribute
            onKeyDown={ (event) => {if (event.keyCode===46) {
              this.props.deleteChildren({ id: this.props.selector.current.id });
              this.props.deleteAttribute({
                id: this.props.selector.current.id,
                
              });
              this.props.deselect();
            }
            else if (event.keyCode===27){this.props.deselect(); this.getStage();}
          }}
          />
        </label>
        <hr />
       {/* <h3>Type</h3> */}
        <table style={{ fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }}>
          <tbody>
            <tr>
              <td className='buttonmenu'>
                <label style={{cursor:'pointer'}}>
                  <input
                    type="checkbox"
                    name="type"
                    value="unique"
                   /* disabled={ !this.props.components.attributes[attributeIndex].type.unique?
                      this.props.components.attributes.some(attribute =>attribute.parentId===this.props.selector.current.parentId && 
                        attribute.type.unique===true)?
                      true: false:false}*/
                    checked={this.props.components.attributes[attributeIndex].type.unique}
                    onChange={this.typeValueChange}
                  />
                  {uniqueLabel}
                </label>
              </td>
            </tr>
            <tr>
              <td className='buttonmenu'>
                <label  style={{cursor:'pointer'}}>
                  <input
                    type="checkbox"
                    name="type"
                    
                    value="multivalued"
                    checked={this.props.components.attributes[attributeIndex].type.multivalued}
                    onChange={this.typeValueChange}
                  />
                  Multivalued
                </label>
              </td>
            </tr>
            <tr>
              <td className='buttonmenu'>
                <label style={{cursor:'pointer'}}>
                  <input
                    type="checkbox"
                    name="type"
                    value="optional"
                  /*  disabled = {this.props.components.attributes[attributeIndex].type.unique ? true: false}*/
                    checked={this.props.components.attributes[attributeIndex].type.optional}
                    onChange={this.typeValueChange}
                  />
                  Optional
                </label>
              </td>
            </tr>
            <tr>
              <td className='buttonmenu'>
                <label style={{cursor:'pointer'}}>
                  <input
                    type="checkbox"
                    name="type"
                    disabled={ this.props.components.entities.some(entity => entity.id === this.props.components.attributes[attributeIndex].parentId)  || this.props.components.relationships.some(relationship => relationship.id === this.props.components.attributes[attributeIndex].parentId)?false: true}
                    value="composite"
                    checked={this.props.components.attributes[attributeIndex].type.composite}
                    onChange={this.typeValueChange}
                  />
                  Composite
                </label>
              </td>
            </tr>
            <tr>
              <td className='buttonmenu'>
                <label style={{cursor:'pointer'}}>
                  <input
                    type="checkbox"
                    name="type"
                    className='buttonmenu'
                    value="derived"
                    style={{cursor:'pointer', border:'none',outline:'none',fontSize:17, backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
                    checked={this.props.components.attributes[attributeIndex].type.derived}
                    onChange={this.typeValueChange}
                  />
                  Derived
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div className="buttons-list">
          <button
          className='buttonmenu'
           style={{cursor:'pointer', border:'none',outline:'none',fontSize:17, backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
           /* className="properties-neutral-button"*/
            type="button"
            onClick={() => this.handleAddAttributeToParent(parent)}
          >
            Add Attribute to Parent
          </button>
          {addAttributeButton}
          <button
          /*  className="properties-delete-button"*/
            type="button"
            className='buttonmenu'
            style={{cursor:'pointer', border:'none',outline:'none',fontSize:17, backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
            onClick={() => {
              
              this.props.deleteAttribute({
                id: this.props.selector.current.id,
                parentId: this.props.components.attributes[attributeIndex].parentId,
                attrNum: this.props.components.attributes[attributeIndex].attrNum,
               
              });

              this.props.deleteChildren({ id: this.props.selector.current.id });
           
             if(this.props.components.notation==="Crow's foot Notation" || this.props.components.notation==="Bachman Notation" ||this.props.components.notation==="Barker Notation" || (this.props.components.notation=== "Korth, Silberschatz & Sudarshan" && this.props.components.entities.find((entity)=>entity.id=== this.props.components.attributes[attributeIndex].parentEntity)) ){
              this.props.updateAttributeCrows({
                idRight:this.props.components.attributes[attributeIndex].id,
                id:  this.props.components.attributes[attributeIndex].parentId,
                grandParent:this.props.components.attributes[attributeIndex].parentEntity,
                dx: null,
                dy: null,
              });}

              
             
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

const mapStateToProps = (state) => ({
  components: state.components.present,
  selector: state.selector,
});

const mapDispatchToProps = {
  addAttribute,
  setNameAttribute,
  setTypeAttribute,
  updateAttributeComposite,
  updatePositionChildren,
  updateAttributeCrows,
  deleteChildren,
  deleteAttribute,
  select,
  deselect,
  repositionComponents,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeProperties);
