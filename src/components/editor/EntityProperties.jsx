import React from "react";
import { connect } from "react-redux";
import {
  setNameEntity,
  addAttribute,
  addExtension,
  deleteChildren,
  deleteEntity,
  deleteConnection,
  select,
  deselect,
  setTypeEntity,
  repositionComponents,
} from "../../actions/actions";
import { getRandomInt } from "../../global/utils";
import { nameSize, spawnRadius } from "../../global/constants";






class EntityProperties extends React.Component {

  
  componentDidMount() {
   this.nameInput.focus();
    document.getElementsByClassName('sidepanel')[0].style.display='block'
    var entityIndex = this.props.components.entities.findIndex(this.findEntityIndex);

       document.getElementsByClassName('sidepanel')[0].style.top= this.props.components.entities[entityIndex].y +'px';
     
   
    
    
  }

  
 componentWillUnmount(){ 
  document.getElementsByClassName('stage')[0].focus();
 
 console.log('unmount')
  document.getElementsByClassName('react-contextmenu')[0].style.display='block'
}
  
  
  handleFocus = (e) => e.target.select();

  findEntityIndex = (entity) => entity.id === this.props.selector.current.id;

  nameValueChange = (e) =>
    this.props.setNameEntity({
      id: this.props.selector.current.id,
      name: e.target.value,
    });

  typeValueChange = (e) =>
    this.props.setTypeEntity({
      id: this.props.selector.current.id,
      type: e.target.value,
    });

  handleAddAttribute = (entityIndex) => {
       // Randomly position the attribute around the entity
    
    const radius = spawnRadius;
    var randomAngle = getRandomInt(0, 360);
    var xOffset = radius * Math.cos(randomAngle);
    var yOffset = radius * Math.sin(randomAngle);
    this.props.addAttribute({
      id: this.props.selector.current.id,
      parentEntity:null,
    
      x: this.props.components.entities[entityIndex].x + xOffset,
      y: this.props.components.entities[entityIndex].y + yOffset,
    });
 
    this.props.repositionComponents();
    this.props.select({
      type: "attribute",
      id: this.props.components.count + 1,
      parentId: this.props.selector.current.id,
    });
    
  };

  handleAddExtension = (entityIndex) => {
    // Randomly position the extension around the entity
    const radius = spawnRadius;
    
    var randomAngle = getRandomInt(0, 360);
    

    var xOffset = radius * Math.cos(randomAngle);
    var yOffset = radius * Math.sin(randomAngle);
   
 
  
    this.props.addExtension({
      id: this.props.selector.current.id,
      korthX:this.props.components.entities[entityIndex].x ,  //for korth notation
      korthY:this.props.components.entities[entityIndex].y + 40 + this.props.components.entities[entityIndex].attributesNum * 39,
      x: this.props.components.entities[entityIndex].x + xOffset,
      y: this.props.components.entities[entityIndex].y + yOffset,
    });
    this.props.repositionComponents();
    this.props.select({
      type: "extension",
      id: this.props.components.count + 1,
      parentId: this.props.selector.current.id,
    });
  };

  render() {
    var entityIndex = this.props.components.entities.findIndex(this.findEntityIndex);
    
    return (
      <div className="sidepanel-content">
       {/*} <h3>Entity</h3>*/}
        <label>
         {/*Name:{" "}*/}
          <input
           /* className="big-editor-input" */
           //new
           style={{outline: 'none',border:'none',margin: 3, width:'220px', paddingLeft: '6px',fontSize:'17px', fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
           //
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
            value={this.props.components.entities[entityIndex].name}
            onChange={this.nameValueChange}
            //prosthesa to kleidi delete wste otan to pataw na diagrafetai h ontotita
            onKeyDown={ (event) => {if (event.key==='Delete') {
              this.props.deleteConnection({
                id: null,
                parentId: null,
                connectId: this.props.selector.current.id,
              });
              this.props.deleteChildren({ id: this.props.selector.current.id });
              this.props.deleteEntity({ id: this.props.selector.current.id });
              this.props.deselect();
            }
            else if (event.key==='Escape' || event.key==='Enter'){ this.props.deselect(); }
          }}
          
            
          />
        </label>
        <hr />
        {/*<h3>Type</h3>*/}
        <table style={{ fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }} >
          <tbody>
            <tr>
              <td  className='buttonmenu' >
               
                  <input
                 
                    type="radio"
                    name="type"
                    value="regular"
                    checked={this.props.components.entities[entityIndex].type === "regular"}
                    onChange={this.typeValueChange}
                  />
                  Regular
              
              </td>
            </tr>
            <tr>
              <td  className='buttonmenu'>
                
                  <input 
                    type="radio"
                    name="type"
                    
                    value="weak"
                    checked={this.props.components.entities[entityIndex].type === "weak"}
                    onChange={this.typeValueChange}
                  />
                  Weak
              
              </td>
            </tr>
            <tr>
              <td   className='buttonmenu'>
              
                  <input
                    type="radio"
                    name="type"
                    value="associative"
                    checked={this.props.components.entities[entityIndex].type === "associative"}
                    onChange={this.typeValueChange}
                  />
                  Associative
                
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div className="buttons-list" >
          <button
           /* className="properties-neutral-button" */
           className='buttonmenu'
            type="button"
            style={{cursor:'pointer', border:'none',outline:'none',fontSize:17, backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
            onClick={() => this.handleAddAttribute(entityIndex)}
            
          >
            Add Attribute
          </button>
        
            <button
        
        className='buttonmenu'
          type="button"
          disabled={this.props.components.entities[entityIndex].connectionCount>7 ? true: false}
          style={{cursor:'pointer',border:'none',outline:'none',fontSize:17, backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
          onClick={() => this.handleAddExtension(entityIndex)}
        >
          Add Extension
          </button>
          <button
           className='buttonmenu'
           /* className="properties-delete-button"*/
           style={{cursor:'pointer',border:'none',outline:'none', fontSize:17,backgroundColor: '#f2f2f2', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}
            type="button"
            onClick={() => {
              this.props.deleteConnection({
                id: null,
                parentId: null,
                connectId: this.props.selector.current.id,
              });
              this.props.deleteChildren({ id: this.props.selector.current.id });
              this.props.deleteEntity({ id: this.props.selector.current.id });
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
  setNameEntity,
  addAttribute,
  addExtension,
  deleteChildren,
  deleteEntity,
  deleteConnection,
  select,
 
  deselect,
  setTypeEntity,
  repositionComponents,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntityProperties);

